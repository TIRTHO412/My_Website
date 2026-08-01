/* ===================================================================
   CHANDRA PAINTS - JAVASCRIPT CONTROLLER (COMPLETE PRODUCTION READY)
   =================================================================== */

const CONFIG = {
    whatsappNumber: "919932151277"
};

document.addEventListener('DOMContentLoaded', () => {
    initThreeJsHero();
    initMobileNav();
    initLightboxModal();
    initWhatsAppForm();
    initHeaderScroll();
    setCurrentYear();
    initProductsSection();
    initStatsCounter();
    initDirectionsBtn();
});

/* 1. Three.js 3D Interactive Hero Canvas */
function initThreeJsHero() {
    const container = document.getElementById('three-canvas-container');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const colors = [0xe11d48, 0xf59e0b, 0x2563eb, 0x059669, 0x06b6d4, 0xec4899];
    const spheresGroup = new THREE.Group();
    scene.add(spheresGroup);

    const sphereCount = 28;
    const spheresData = [];
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    for (let i = 0; i < sphereCount; i++) {
        const color = colors[i % colors.length];
        const material = new THREE.MeshPhongMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.15,
            shininess: 90,
            transparent: true,
            opacity: 0.85
        });

        const sphere = new THREE.Mesh(geometry, material);
        const scale = 0.4 + Math.random() * 1.2;
        sphere.scale.set(scale, scale, scale);

        const x = (Math.random() - 0.5) * 26;
        const y = (Math.random() - 0.5) * 16;
        const z = (Math.random() - 0.5) * 14;
        sphere.position.set(x, y, z);

        spheresGroup.add(sphere);

        spheresData.push({
            mesh: sphere,
            initialY: y,
            speed: 0.005 + Math.random() * 0.015,
            floatOffset: Math.random() * Math.PI * 2,
            rotSpeedX: (Math.random() - 0.5) * 0.02,
            rotSpeedY: (Math.random() - 0.5) * 0.02
        });
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 1.5, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff6b00, 1.2, 50);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - windowHalfX) * 0.0015;
        mouseY = (e.clientY - windowHalfY) * 0.0015;
    }, false);

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        spheresGroup.rotation.y = targetX * 0.8;
        spheresGroup.rotation.x = targetY * 0.8;

        spheresData.forEach(item => {
            item.mesh.position.y = item.initialY + Math.sin(elapsedTime * item.speed * 20 + item.floatOffset) * 0.6;
            item.mesh.rotation.x += item.rotSpeedX;
            item.mesh.rotation.y += item.rotSpeedY;
        });

        renderer.render(scene, camera);
    }
    animate();
}

/* 2. Mobile Nav Toggle */
function initMobileNav() {
    if (window.Navigation) {
        window.Navigation.init();
    }
}

/* 3. Lightbox Modal */
function initLightboxModal() {
    const modal = document.getElementById('lightboxModal');
    const overlay = document.getElementById('lightboxOverlay');
    const closeBtn = document.getElementById('lightboxClose');
    const imgElem = document.getElementById('lightboxImg');
    const titleElem = document.getElementById('lightboxTitle');
    const descElem = document.getElementById('lightboxDesc');
    const waBtn = document.getElementById('lightboxWaBtn');
    if (!modal) return;

    document.querySelectorAll('.btn-lightbox-trigger, .shade-card-img, .btn-zoom').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const card = trigger.closest('.shade-card');
            if (!card) return;

            const img = card.querySelector('.shade-card-img');
            const brand = card.getAttribute('data-brand') || "Paint Shade Card";
            const cardTitle = card.querySelector('h3') ? card.querySelector('h3').innerText : brand;
            const cardDesc = card.querySelector('p') ? card.querySelector('p').innerText : "";
            const imgSrc = img ? img.getAttribute('src') : "";

            imgElem.src = imgSrc;
            imgElem.alt = cardTitle;
            titleElem.innerText = cardTitle;
            descElem.innerText = cardDesc;

            const waMsg = encodeURIComponent(`Hi Chandra Paints, I am interested in the ${cardTitle} (${brand}) shade card.`);
            waBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${waMsg}`;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
}

/* 4. WhatsApp Inquiry Form */
function initWhatsAppForm() {
    const form = document.getElementById('whatsappForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('custName').value.trim();
        const phone = document.getElementById('custPhone').value.trim();
        const brand = document.getElementById('brandSelect').value;
        const message = document.getElementById('custMessage').value.trim();

        let text = `*NEW INQUIRY - CHANDRA PAINTS WEBSITE*\n\n`;
        text += `👤 *Customer Name:* ${name}\n`;
        text += `📞 *Phone Number:* ${phone}\n`;
        text += `🎨 *Brand Required:* ${brand}\n`;
        text += `💬 *Message / Shade Code:* ${message}\n\n`;
        text += `📍 *Store Location:* Amta Sahapara`;

        window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    });
}

/* 5. Header Scroll Shadow */
function initHeaderScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function setCurrentYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.innerText = new Date().getFullYear();
}

/* 6. Products Controller */
function initProductsSection() {
    if (window.ProductsController) window.ProductsController.init();
}

/* 7. Stats Counter Animation */
function initStatsCounter() {
    const statsGrid = document.getElementById('statsGrid');
    if (!statsGrid) return;

    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                document.querySelectorAll('.counter-number').forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target') || '0', 10);
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const duration = 2000;
                    const steps = 100;
                    const increment = target / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.innerText = Math.floor(current).toLocaleString() + suffix;
                    }, duration / steps);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsGrid);
}

/* 8. Google Maps Directions Button */
function initDirectionsBtn() {
    const btn = document.getElementById('getDirectionsBtn');
    if (btn) {
        btn.addEventListener('click', () => {
            window.open('https://maps.google.com/?q=Chandra+Paints', '_blank', 'noopener,noreferrer');
        });
    }
}

/* ===================================================================
   APPENDED CODE: WHY CHOOSE US INTERSECTION OBSERVER
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const whyCards = document.querySelectorAll('.why-us-reveal');
    if (!whyCards.length) return;

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const whyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 120);
                whyObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    whyCards.forEach(card => whyObserver.observe(card));
});
