/* ============================================================
   KEY WORKSPACE — Interacciones
   ============================================================ */

(function () {
  'use strict';

  /* --- Menú móvil --- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Año actual en el footer --- */
  const yearTargets = document.querySelectorAll('[data-year]');
  if (yearTargets.length) {
    const y = new Date().getFullYear();
    yearTargets.forEach(el => { el.textContent = y; });
  }

  /* --- Reveal on scroll --- */
  if ('IntersectionObserver' in window) {
    const reveals = document.querySelectorAll('.area-card, .project-card, .model-item, .timeline-list li, .featured-card');
    if (reveals.length) {
      reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 0.6s var(--transition), transform 0.6s var(--transition)';
      });

      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      reveals.forEach(el => io.observe(el));
    }
  }
})();
