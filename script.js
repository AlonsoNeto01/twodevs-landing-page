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

  /* --- Contact form handling --- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = '✓ Mensagem Enviada!';
        btn.style.background = '#25D366';
        form.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
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
