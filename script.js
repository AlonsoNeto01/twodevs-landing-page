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

  /* --- Generate floating particles --- */
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.style.left = Math.random() * 100 + '%';
      p.style.top  = Math.random() * 100 + '%';
      p.style.animationDuration = (4 + Math.random() * 6) + 's';
      p.style.animationDelay   = (Math.random() * 5) + 's';
      p.style.width  = (2 + Math.random() * 3) + 'px';
      p.style.height = p.style.width;
      particlesContainer.appendChild(p);
    }
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

  /* --- Tech Metrics Live Update Simulation --- */
  const ttfbEl = document.querySelector('#metric-ttfb .value');
  const lhEl = document.querySelector('#metric-lh .value');
  const psEl = document.querySelector('#metric-ps .value');

  if (ttfbEl && lhEl && psEl) {
    // Simulating an API call to a /meta endpoint
    const fetchLiveMetrics = () => {
      // Fake network latency
      setTimeout(() => {
        // Generating plausible high-performance metrics
        const baseTtfb = 110 + Math.floor(Math.random() * 30); // 110ms to 140ms
        
        ttfbEl.textContent = baseTtfb;
        lhEl.textContent = '98';
        psEl.textContent = '97';

        // Minor fluctuations every few seconds to look "live"
        setInterval(() => {
          const fluctuate = Math.floor(Math.random() * 15) - 5; // -5 to +10
          ttfbEl.textContent = baseTtfb + fluctuate;
        }, 3500);

      }, 800);
    };

    // Initial fetch
    fetchLiveMetrics();
  }

});
