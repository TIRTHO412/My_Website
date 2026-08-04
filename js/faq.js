/* ===================================================================
   CHANDRA PAINTS - FAQ ACCORDION CONTROLLER
   =================================================================== */

const FaqController = {
    init: function() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;

        faqItems.forEach(item => {
            const btn = item.querySelector('.faq-question');
            if (!btn) return;

            btn.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                // Close all other items so ONLY one answer is open at a time
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherBtn = otherItem.querySelector('.faq-question');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                });

                // Toggle target item
                if (!isOpen) {
                    item.classList.add('active');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }
};

window.FaqController = FaqController;

document.addEventListener('DOMContentLoaded', () => {
    FaqController.init();
});
