/* ===================================================================
   CHANDRA PAINTS - INTERACTION ANIMATIONS & COUNTER ANIMATION
   =================================================================== */

const AnimationController = {
    init: function() {
        this.initScrollReveal();
        this.initCounterAnimation();
    },

    // Scroll Reveal Observer for Cards & Sections
    initScrollReveal: function() {
        const observerOptions = {
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.shade-card, .contact-glass-card, .feature-box, .product-card, .why-card, .stat-counter-card').forEach(el => {
            observer.observe(el);
        });
    },

    // Animated Statistics Counter (Counting from 0 to target when visible)
    initCounterAnimation: function() {
        const statsSection = document.getElementById('statsGrid');
        if (!statsSection) return;

        let hasAnimated = false;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    this.animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        counterObserver.observe(statsSection);
    },

    animateCounters: function() {
        const counters = document.querySelectorAll('.counter-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target') || '0', 10);
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000; // 2 Seconds
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;

            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.innerText = Math.floor(current).toLocaleString() + suffix;
            }, stepTime);
        });
    }
};

window.AnimationController = AnimationController;
