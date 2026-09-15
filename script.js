/* ============================================================
   KEY WORKSPACE — Interacciones
   Versión: 2.0
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     1. MENÚ MÓVIL
     ============================================================ */

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Cerrar al hacer clic en un enlace
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ============================================================
     2. AÑO ACTUAL EN EL FOOTER
     ============================================================ */

  const yearTargets = document.querySelectorAll('[data-year]');
  if (yearTargets.length) {
    const y = new Date().getFullYear();
    yearTargets.forEach(el => { el.textContent = y; });
  }

  /* ============================================================
     3. REVEAL ON SCROLL
     ============================================================ */

  if ('IntersectionObserver' in window) {
    const revealSelector = [
      '.area-card',
      '.project-card',
      '.project-detail',
      '.model-item',
      '.timeline-list li',
      '.featured-card',
      '.oportunidad-card',
      '.clarity-card',
      '.stat-block',
      '.idea-card',
      '.pair',
      '.step'
    ].join(', ');

    const reveals = document.querySelectorAll(revealSelector);

    if (reveals.length) {
      reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition =
          'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), ' +
          'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      });

      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      reveals.forEach(el => io.observe(el));
    }
  }

  /* ============================================================
     4. SMOOTH SCROLL PARA ANCLAS INTERNAS
     ============================================================ */

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerOffset = 90;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Actualizar el hash sin saltar
      history.pushState(null, '', href);
    });
  });

  /* ============================================================
     5. DETECCIÓN DE PREFERENCIA DE MOVIMIENTO REDUCIDO
     ============================================================ */

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    document.documentElement.style.scrollBehavior = 'auto';
  }

  /* ============================================================
     6. BOTONES DE COPIA (por si se usan fuera de postular/reclamar)
     ============================================================ */

  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      const original = btn.innerHTML;

      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = '¡Copiado!';
      } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = '¡Copiado!';
      }

      setTimeout(() => {
        btn.innerHTML = original;
      }, 1800);
    });
  });

  /* ============================================================
     7. FOCUS VISIBLE (accesibilidad)
     ============================================================ */

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('is-keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('is-keyboard-nav');
  });

})();
