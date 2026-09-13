// ===== MENÚ MÓVIL =====
const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        document.getElementById('mainNav').classList.toggle('open');
    });
}

// Cerrar menú al hacer clic en un enlace (para móvil)
document.querySelectorAll('.nav-principal a').forEach(link => {
    link.addEventListener('click', function() {
        const nav = document.getElementById('mainNav');
        if (nav) nav.classList.remove('open');
    });
});

// ===== SWIPER HERO =====
if (document.querySelector('.mySwiperHero')) {
    const heroSwiper = new Swiper('.mySwiperHero', {
        loop: true,
        autoplay: { delay: 5000 },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true }
    });
}

// ===== SWIPER TRAYECTORIA =====
if (document.querySelector('.mySwiperHistorias')) {
    const historiasSwiper = new Swiper('.mySwiperHistorias', {
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        },
        pagination: {
            el: '.swiper-pagination-historias',
            clickable: true
        },
        autoplay: { delay: 5000 },
        loop: true
    });
}

// ===== CONTADORES ANIMADOS (solo para index) =====
const counters = document.querySelectorAll('.numero[data-target]');
if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                let current = 0;
                const step = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        clearInterval(timer);
                        el.textContent = target;
                    } else {
                        el.textContent = Math.floor(current);
                    }
                }, 30);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}
