/* ===================================================================
   CHANDRA PAINTS - MAIN APPLICATION ENTRY POINT
   =================================================================== */

const App = {
    whatsappNumber: "919932151277",

    init: function() {
        // Initialize All Modular Components
        if (window.Navigation) window.Navigation.init();
        if (window.ScrollController) window.ScrollController.init();
        if (window.AnimationController) window.AnimationController.init();
        if (window.ThreeScene) window.ThreeScene.init();
        if (window.ProductsController) window.ProductsController.init();
        if (window.CalculatorController) window.CalculatorController.init();
        if (window.MapController) window.MapController.init();
        if (window.Utils) window.Utils.updateCopyrightYear();

        // Initialize Local Handlers
        this.initLightbox();
        this.initWhatsAppForm();
    },

    /* Lightbox Modal Handler */
    initLightbox: function() {
        const modal = document.getElementById('lightboxModal');
        const overlay = document.getElementById('lightboxOverlay');
        const closeBtn = document.getElementById('lightboxClose');
        const imgElem = document.getElementById('lightboxImg');
        const titleElem = document.getElementById('lightboxTitle');
        const descElem = document.getElementById('lightboxDesc');
        const waBtn = document.getElementById('lightboxWaBtn');

        if (!modal) return;

        const triggers = document.querySelectorAll('.btn-lightbox-trigger, .shade-card-img, .btn-zoom');
        
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
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

                const waMsg = `Hi Chandra Paints, I am interested in the ${cardTitle} (${brand}) shade card.`;
                waBtn.href = window.Utils.createWaUrl(this.whatsappNumber, waMsg);

                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    },

    /* Direct-to-WhatsApp Contact Form Submission */
    initWhatsAppForm: function() {
        const form = document.getElementById('whatsappForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('custName').value.trim();
            const phone = document.getElementById('custPhone').value.trim();
            const brand = document.getElementById('brandSelect').value;
            const message = document.getElementById('custMessage').value.trim();

            let formattedText = `*NEW INQUIRY - CHANDRA PAINTS WEBSITE*\n\n`;
            formattedText += `👤 *Customer Name:* ${name}\n`;
            formattedText += `📞 *Phone Number:* ${phone}\n`;
            formattedText += `🎨 *Brand Required:* ${brand}\n`;
            formattedText += `💬 *Message / Shade Code:* ${message}\n\n`;
            formattedText += `📍 *Store Location:* Amta Sahapara`;

            const whatsappUrl = window.Utils.createWaUrl(this.whatsappNumber, formattedText);
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
