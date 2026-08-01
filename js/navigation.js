/* ===================================================================
   CHANDRA PAINTS - NAVIGATION CONTROLLER
   =================================================================== */

const Navigation = {
    initialized: false,

    init: function() {
        if (this.initialized) return;

        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const toggleIcon = document.getElementById('toggleIcon');
        const navbar = document.getElementById('navbar');
        const navOverlay = document.getElementById('navOverlay');

        if (!mobileToggle || !navLinks) return;

        this.initialized = true;

        const openMenu = () => {
            navLinks.classList.add('active');
            mobileToggle.classList.add('open');
            if (navOverlay) navOverlay.classList.add('active');
            if (toggleIcon) toggleIcon.className = 'fa-solid fa-xmark';
            mobileToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('open');
            if (navOverlay) navOverlay.classList.remove('active');
            if (toggleIcon) toggleIcon.className = 'fa-solid fa-bars';
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        };

        this.openMenu = openMenu;
        this.closeMenu = closeMenu;

        // Hamburger click listener
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navLinks.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Navigation links click listener
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // 1. Close menu & restore body scrolling immediately
                closeMenu();

                // 2. Smooth navigation to target section
                if (href && href.startsWith('#')) {
                    const targetElem = document.querySelector(href);
                    if (targetElem) {
                        e.preventDefault();
                        const navbarHeight = navbar ? navbar.offsetHeight : 80;
                        const targetPosition = targetElem.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });

                        // Update active class
                        navLinks.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            });
        });

        // Close when clicking backdrop overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                closeMenu();
            });
        }

        // Close when clicking outside menu and toggle button
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active')) {
                if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                    closeMenu();
                }
            }
        });

        // Close on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close mobile menu if window resized above 1338px
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1338 && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        // Header Scroll Shadow
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    }
};

window.Navigation = Navigation;
