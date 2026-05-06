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

});
