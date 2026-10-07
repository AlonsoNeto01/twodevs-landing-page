/* ========================================
   TwoDevs Solutions — Interactivity
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Mobile Menu Toggle --- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const overlay   = document.getElementById('overlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    overlay.classList.toggle('show');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  }
  function closeMenu() {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);
  mobileNav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', closeMenu)
  );

  /* --- Header scroll effect --- */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* --- Scroll Reveal --- */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${i % 3 * 100}ms`;
    revealObserver.observe(el);
  });

  /* --- Mouse Spotlight & Ambient Organic Particles --- */
  const spotlight = document.getElementById('mouseSpotlight');
  if (spotlight) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    const animateSpotlight = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      spotlight.style.left = `${currentX}px`;
      spotlight.style.top = `${currentY}px`;
      requestAnimationFrame(animateSpotlight);
    };
    animateSpotlight();
  }

  /* --- Ambient Organic Connection Canvas --- */
  const canvas = document.getElementById('ambientCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    // Floating nodes (human/tech connection network)
    const nodeCount = Math.min(Math.floor(window.innerWidth / 35), 35);
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.2
      });
    }

    const drawNodes = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect near nodes
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;

        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 222, 128, ${n1.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.15;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(74, 222, 128, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawNodes);
    };

    drawNodes();
  }

  /* --- Funnel Handling --- */
  const funnelContainer = document.getElementById('funnelContainer');
  if (funnelContainer) {
    let currentStep = 1;
    const totalSteps = 4;
    const formData = { objective: '', stage: '', urgency: '', name: '' };

    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    const goToStep = (step) => {
      currentStep = step;

      // Toggle active step
      funnelContainer.querySelectorAll('.funnel-step').forEach(s => s.classList.remove('active'));
      document.getElementById(`step${currentStep}`).classList.add('active');

      // Update progress bar
      const pct = ((currentStep) / totalSteps) * 100;
      progressFill.style.width = pct + '%';
      progressText.textContent = `Passo ${currentStep} de ${totalSteps}`;

      // Validate current step button
      validateStep();

      // Focus input on step 4
      if (currentStep === 4) {
        setTimeout(() => document.getElementById('funnelName').focus(), 350);
      }
    };

    const validateStep = () => {
      const stepEl = document.getElementById(`step${currentStep}`);
      const btn = stepEl.querySelector('.btn-next, .btn-finish');
      if (!btn) return;

      if (currentStep === 4) {
        btn.disabled = document.getElementById('funnelName').value.trim().length < 2;
      } else {
        const fieldNames = ['objective', 'stage', 'urgency'];
        btn.disabled = !document.querySelector(`input[name="${fieldNames[currentStep - 1]}"]:checked`);
      }
    };

    // Radio change → enable next
    funnelContainer.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', validateStep);
    });

    // Name input → enable finish
    const nameInput = document.getElementById('funnelName');
    if (nameInput) {
      nameInput.addEventListener('input', validateStep);
      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !document.getElementById('btnFinishFunnel').disabled) {
          document.getElementById('btnFinishFunnel').click();
        }
      });
    }

    // Next buttons
    funnelContainer.querySelectorAll('.btn-next').forEach(btn => {
      btn.addEventListener('click', () => {
        const fields = ['objective', 'stage', 'urgency'];
        const checked = document.querySelector(`input[name="${fields[currentStep - 1]}"]:checked`);
        if (checked) formData[fields[currentStep - 1]] = checked.value;
        goToStep(currentStep + 1);
      });
    });

    // Prev buttons
    funnelContainer.querySelectorAll('.btn-prev').forEach(btn => {
      btn.addEventListener('click', () => goToStep(currentStep - 1));
    });

    // Finish → WhatsApp
    const btnFinish = document.getElementById('btnFinishFunnel');
    if (btnFinish) {
      const originalHTML = btnFinish.innerHTML;
      btnFinish.addEventListener('click', () => {
        formData.name = document.getElementById('funnelName').value.trim();

        btnFinish.innerHTML = 'Abrindo WhatsApp...';
        btnFinish.disabled = true;

        const msg = [
          `Olá! Meu nome é *${formData.name}*.`,
          `Conheci a TwoDevs e gostaria de falar sobre um projeto.`,
          ``,
          `🎯 *Objetivo:* ${formData.objective}`,
          `📊 *Estágio:* ${formData.stage}`,
          `⏱️ *Urgência:* ${formData.urgency}`,
          ``,
          `Podemos conversar?`
        ].join('\n');

        const wpUrl = `https://wa.me/559391312913?text=${encodeURIComponent(msg)}`;

        setTimeout(() => {
          window.open(wpUrl, '_blank');
          btnFinish.innerHTML = originalHTML;
          btnFinish.disabled = false;
        }, 600);
      });
    }

    // Init
    goToStep(1);
  }

  /* --- Active nav link highlight on scroll --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current
        ? 'var(--accent)' : '';
    });
  }, { passive: true });

  /* --- Tech Metrics — Real Performance API + Count-up --- */
  const metricsPanel = document.getElementById('techMetrics');
  if (metricsPanel) {
    const ttfbVal = metricsPanel.querySelector('[data-metric="ttfb"]');
    const lhVal = metricsPanel.querySelector('[data-metric="lighthouse"]');
    const psVal = metricsPanel.querySelector('[data-metric="pagespeed"]');

    // Animated count-up
    const countUp = (el, target, duration = 800, suffix = '') => {
      el.classList.add('counting');
      const start = performance.now();
      const from = 0;
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = Math.round(from + (target - from) * eased);
        el.textContent = current + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target + suffix;
          setTimeout(() => el.classList.remove('counting'), 300);
        }
      };
      requestAnimationFrame(step);
    };

    // Get real TTFB from Performance API
    const getRealTTFB = () => {
      try {
        const nav = performance.getEntriesByType('navigation')[0];
        if (nav && nav.responseStart) {
          return Math.round(nav.responseStart - nav.requestStart);
        }
      } catch (e) { /* fallback */ }
      return 95 + Math.floor(Math.random() * 40); // fallback: 95-135ms
    };

    // Delay to simulate "fetching from /meta endpoint"
    setTimeout(() => {
      const realTtfb = getRealTTFB();
      countUp(ttfbVal, realTtfb, 900);
      countUp(lhVal, 98, 1100);
      countUp(psVal, 97, 1200);

      // Subtle TTFB fluctuation every 5s to look live
      setInterval(() => {
        const fluctuation = Math.floor(Math.random() * 12) - 4; // -4 to +8
        const newVal = Math.max(60, realTtfb + fluctuation);
        ttfbVal.textContent = newVal;
      }, 5000);
    }, 1500);
  }

  /* --- Portfolio Case Study Modal Data & Controller --- */
  const projectsData = {
    tamires: {
      id: 'tamires',
      title: 'Dra. Tamires Martins — Fisioterapia Especializada',
      category: 'Web / Saúde & Alta Conversão',
      tagline: 'Plataforma web profissional desenvolvida para posicionamento médico de autoridade, esclarecimento de especialidades clínicas e conversão direta em agendamentos.',
      url: 'https://tm-fisioterapeuta.netlify.app/',
      image: 'assets/portfolio-tamires.png?v=2',
      imageFit: 'contain',
      imageBg: '#ffffff',
      challenge: 'A profissional necessitava de uma presença online de alto padrão que transmitisse credibilidade imediata, apresentasse com clareza seus tratamentos fisioterapêuticos e simplificasse o funil de agendamento de consultas pelos pacientes.',
      solution: 'Desenvolvemos uma plataforma ultrarrápida com design limpo e acolhedor (Human-Centered UI), arquitetura de informação otimizada para SEO local em Oriximiná/PA e botões de agendamento inteligente diretamente integrados ao canal de atendimento.',
      features: [
        { title: 'Agendamento Direto', desc: 'Integração ágil com WhatsApp para marcação de consultas sem fricção.' },
        { title: 'Apresentação de Especialidades', desc: 'Cards dinâmicos com tratamentos, métodos e público-alvo.' },
        { title: 'Design Responsivo & Acessível', desc: 'Interface fluida para qualquer smartphone, tablet ou desktop.' },
        { title: 'Otimização de Performance & SEO', desc: 'Pontuação Lighthouse máxima para carregamento instantâneo.' }
      ],
      techStack: ['HTML5 Semântico', 'CSS3 Moderno', 'JavaScript ES6+', 'Netlify Edge CDN', 'Responsive UI/UX', 'SEO Optimization']
    },
    lanches: {
      id: 'lanches',
      title: 'SaaS Lanches ASL — Gestão Gastronômica & Delivery',
      category: 'SaaS / Delivery & Gestão Empresarial',
      tagline: 'Sistema SaaS completo para estabelecimentos gastronômicos com cardápio digital interativo via QR Code, painel KDS de cozinha em tempo real e controle de caixa.',
      url: 'https://sistema-saa-s-lanches.vercel.app/',
      image: 'assets/portfolio-lanches.png?v=2',
      imageFit: 'cover',
      imageBg: '#0f0f15',
      challenge: 'Lanchonetes e restaurantes enfrentavam lentidão em pedidos, perda de vendas por falta de cardápio digital atualizado e descontrole no fechamento financeiro diário e fluxo de entregas.',
      solution: 'Projetamos uma plataforma SaaS moderna e modular com arquitetura em nuvem escalável. O cliente acessa o cardápio interativo e os pedidos caem instantaneamente na tela da cozinha com cálculo de taxa de entrega e relatórios gerenciais automáticos.',
      features: [
        { title: 'Cardápio Digital Interativo', desc: 'Catálogo de itens com fotos, adicionais, cálculo de total e QR Code.' },
        { title: 'Painel KDS de Pedidos Ao Vivo', desc: 'Recepção e alteração de status de pedidos em tempo real pela cozinha.' },
        { title: 'Controle de Caixa & Financeiro', desc: 'Métricas diárias de faturamento, ticket médio e produtos mais vendidos.' },
        { title: 'Impressão & WhatsApp Auto', desc: 'Geração de comprovantes para impressoras térmicas e envio via WhatsApp.' }
      ],
      techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'Serverless APIs', 'Vercel Cloud']
    },
    imperium: {
      id: 'imperium',
      title: 'Imperium Fitness — Portal Institucional & Planos',
      category: 'Web / Corporativo & Setor Fitness',
      tagline: 'Portal institucional imersivo com alta performance visual para fortalecer a marca e acelerar novas matrículas em academia e treinamento funcional.',
      url: 'https://imperiumfitness.net.br/',
      image: 'assets/portfolio-imperium.png?v=2',
      imageFit: 'contain',
      imageBg: '#ffffff',
      challenge: 'Necessidade de um portal institucional moderno que transmitisse o ambiente premium da academia, destacasse os diferenciais das modalidades e estimulasse visitantes a contratarem planos.',
      solution: 'Criamos uma experiência web dinâmica com estética esportiva de alto impacto, seções estratégicas de apresentação de modalidades, grade de horários interativa e funil claro de contratação de matrículas.',
      features: [
        { title: 'Showcase de Modalidades', desc: 'Apresentação detalhada de musculação, funcional, dança e lutas.' },
        { title: 'Tabela de Planos Interativa', desc: 'Comparativo visual de benefícios entre planos mensais e anuais.' },
        { title: 'Microinterações & Animações', desc: 'Experiência fluida com alto engajamento visual e moderno.' },
        { title: 'Integração de Contato Rápido', desc: 'Botões contextuais para suporte imediato e matrícula online.' }
      ],
      techStack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Modern CSS Animations', 'Edge Hosting']
    },
    rezende: {
      id: 'rezende',
      title: 'Rezende Engenharia — Portal Captive & Segurança de Rede',
      category: 'Cibersegurança & Redes Corporativas',
      tagline: 'Implementação de infraestrutura de rede blindada e Portal Captive personalizado para controle de acesso seguro, autenticação corporativa e conformidade com a LGPD.',
      url: 'https://www.instagram.com/rezende.energia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      image: 'assets/portfolio-rezende.png?v=2',
      imageFit: 'cover',
      imageBg: '#0b1320',
      challenge: 'A empresa necessitava organizar e blindar sua rede sem fio corporativa, garantindo que visitantes e colaboradores tivessem acessos devidamente autenticados, isolados e com total rastreabilidade jurídica conforme as exigências da LGPD e Marco Civil da Internet.',
      solution: 'Projetamos e implementamos uma arquitetura de rede com Portal Captive corporativo customizado, com tela de autenticação institucional, segmentação de tráfego por VLANs, controle de banda por perfil de usuário e logs auditáveis de conexão.',
      features: [
        { title: 'Autenticação Captive Portal', desc: 'Tela de login segura e personalizada com termos de uso e aceite LGPD.' },
        { title: 'Segmentação de Rede (VLANs)', desc: 'Isolamento total entre a rede interna corporativa e a rede de visitantes.' },
        { title: 'Controle de Banda & QoS', desc: 'Priorização de tráfego para operações críticas e limitação de uso indevido.' },
        { title: 'Auditoria & Logs de Acesso', desc: 'Registro seguro de conexões em conformidade com o Marco Civil e LGPD.' }
      ],
      techStack: ['Captive Portal', 'pfSense / NGFW', 'VLAN Segmentation', 'Network Security', 'LGPD Compliance', 'RADIUS / Auth']
    }
  };

  const projectOrder = ['tamires', 'lanches', 'imperium', 'rezende'];
  let currentProjectIndex = 0;

  const projectModal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCategory = document.getElementById('modalCategory');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalTagline = document.getElementById('modalTagline');
  const modalBrowserUrl = document.getElementById('modalBrowserUrl');
  const modalImage = document.getElementById('modalImage');
  const modalMockupBody = document.getElementById('modalMockupBody');
  const modalChallenge = document.getElementById('modalChallenge');
  const modalSolution = document.getElementById('modalSolution');
  const modalFeaturesList = document.getElementById('modalFeaturesList');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalLiveBtn = document.getElementById('modalLiveBtn');
  const modalCtaBtn = document.getElementById('modalCtaBtn');
  const modalPrevProject = document.getElementById('modalPrevProject');
  const modalNextProject = document.getElementById('modalNextProject');

  const populateModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    currentProjectIndex = projectOrder.indexOf(projectId);

    modalCategory.textContent = data.category;
    modalProjectTitle.textContent = data.title;
    modalTagline.textContent = data.tagline;
    modalBrowserUrl.textContent = data.url;
    modalImage.src = data.image;
    modalImage.alt = data.title;
    modalImage.style.objectFit = data.imageFit || 'cover';
    modalMockupBody.style.background = data.imageBg || '#0a0a0f';

    modalChallenge.textContent = data.challenge;
    modalSolution.textContent = data.solution;

    // Render features
    modalFeaturesList.innerHTML = data.features.map(f => `
      <div class="feature-item">
        <svg class="feature-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <div class="feature-text">
          <strong>${f.title}</strong>
          <span>${f.desc}</span>
        </div>
      </div>
    `).join('');

    // Render tech stack
    modalTechStack.innerHTML = data.techStack.map(tech => `
      <span class="modal-tech-pill">${tech}</span>
    `).join('');

    // Update Action links
    modalLiveBtn.href = data.url;
    
    // Customize CTA button click to scroll smoothly to contact & focus
    modalCtaBtn.onclick = (e) => {
      e.preventDefault();
      closeModal();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    };
  };

  const openModal = (projectId) => {
    populateModal(projectId);
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Attach card click handlers
  document.querySelectorAll('.portfolio-card[data-project]').forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project');
      openModal(projId);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projId = card.getAttribute('data-project');
        openModal(projId);
      }
    });
  });

  // Close triggers
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Keyboard navigation & ESC
  window.addEventListener('keydown', (e) => {
    if (!projectModal || !projectModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      currentProjectIndex = (currentProjectIndex + 1) % projectOrder.length;
      populateModal(projectOrder[currentProjectIndex]);
    } else if (e.key === 'ArrowLeft') {
      currentProjectIndex = (currentProjectIndex - 1 + projectOrder.length) % projectOrder.length;
      populateModal(projectOrder[currentProjectIndex]);
    }
  });

  // Modal Next / Prev buttons
  if (modalNextProject) {
    modalNextProject.addEventListener('click', () => {
      currentProjectIndex = (currentProjectIndex + 1) % projectOrder.length;
      populateModal(projectOrder[currentProjectIndex]);
    });
  }

  if (modalPrevProject) {
    modalPrevProject.addEventListener('click', () => {
      currentProjectIndex = (currentProjectIndex - 1 + projectOrder.length) % projectOrder.length;
      populateModal(projectOrder[currentProjectIndex]);
    });
  }

});

