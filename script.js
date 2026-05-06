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
    const formData = {
      objective: '',
      stage: '',
      urgency: '',
      name: ''
    };

    const updateUI = () => {
      // Hide all steps
      document.querySelectorAll('.funnel-step').forEach(step => {
        step.classList.remove('active');
      });
      // Show current step
      document.getElementById(`step${currentStep}`).classList.add('active');

      // Update Progress
      const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
      document.querySelector('#progressBar::after') // Not directly updatable via style for pseudo, so we use a trick or direct style to a child.
      // Since it's a pseudo element in CSS, let's just create an inline style tag for the dynamic width or manipulate a real element.
      // Wait, let's select the pseudo-element's parent and set a CSS variable.
      document.getElementById('progressBar').style.setProperty('--progress', `${progressPercent}%`);
      document.getElementById('progressText').textContent = `Passo ${currentStep} de ${totalSteps}`;
      
      checkStepValidity();
    };

    // Inject CSS rule for progress bar dynamically
    const style = document.createElement('style');
    style.innerHTML = `.progress-bar::after { width: var(--progress, 25%); }`;
    document.head.appendChild(style);

    const checkStepValidity = () => {
      const stepEl = document.getElementById(`step${currentStep}`);
      const nextBtn = stepEl.querySelector('.btn-next, .btn-finish');
      if (!nextBtn) return;

      if (currentStep === 1) {
        nextBtn.disabled = !document.querySelector('input[name="objective"]:checked');
      } else if (currentStep === 2) {
        nextBtn.disabled = !document.querySelector('input[name="stage"]:checked');
      } else if (currentStep === 3) {
        nextBtn.disabled = !document.querySelector('input[name="urgency"]:checked');
      } else if (currentStep === 4) {
        const nameVal = document.getElementById('funnelName').value.trim();
        nextBtn.disabled = nameVal.length < 3;
      }
    };

    // Listeners for radio buttons to auto-advance or enable button
    document.querySelectorAll('.funnel-step input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', () => {
        checkStepValidity();
        // Optional: auto-advance on radio select
        // setTimeout(() => document.querySelector(`#step${currentStep} .btn-next`).click(), 300);
      });
    });

    // Listener for text input
    const nameInput = document.getElementById('funnelName');
    if (nameInput) {
      nameInput.addEventListener('input', checkStepValidity);
    }

    // Navigation buttons
    document.querySelectorAll('.btn-next').forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
          // Save data
          if (currentStep === 1) formData.objective = document.querySelector('input[name="objective"]:checked').value;
          if (currentStep === 2) formData.stage = document.querySelector('input[name="stage"]:checked').value;
          if (currentStep === 3) formData.urgency = document.querySelector('input[name="urgency"]:checked').value;
          
          currentStep++;
          updateUI();
        }
      });
    });

    document.querySelectorAll('.btn-prev').forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          updateUI();
        }
      });
    });

    // Finish funnel
    const btnFinish = document.getElementById('btnFinishFunnel');
    if (btnFinish) {
      btnFinish.addEventListener('click', () => {
        formData.name = document.getElementById('funnelName').value.trim();
        
        btnFinish.textContent = 'Redirecionando...';
        btnFinish.disabled = true;

        const text = `Olá! Meu nome é *${formData.name}*. Conheci a TwoDevs e gostaria de falar sobre um projeto.\n\n🎯 *Objetivo:* ${formData.objective}\n📊 *Estágio:* ${formData.stage}\n⏱️ *Urgência:* ${formData.urgency}\n\nPodemos conversar?`;
        
        const wpUrl = `https://wa.me/559391312913?text=${encodeURIComponent(text)}`;
        
        setTimeout(() => {
          window.open(wpUrl, '_blank');
          btnFinish.textContent = 'Falar com o Gestor';
          btnFinish.disabled = false;
          // reset form optionally
        }, 800);
      });
    }

    // Init UI
    updateUI();
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
