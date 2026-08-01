/* ===================================================================
   CHANDRA PAINTS - UTILITIES & HELPERS
   =================================================================== */

const Utils = {
    // Select single element
    $: (selector) => document.querySelector(selector),
    
    // Select all elements
    $$: (selector) => document.querySelectorAll(selector),

    // Format WhatsApp message URL
    createWaUrl: (phone, text) => {
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        const encodedText = encodeURIComponent(text);
        return `https://wa.me/${cleanPhone}?text=${encodedText}`;
    },

    // Update Copyright Year dynamically
    updateCopyrightYear: (elemId = 'year') => {
        const elem = document.getElementById(elemId);
        if (elem) {
            elem.innerText = new Date().getFullYear();
        }
    }
};

window.Utils = Utils;
