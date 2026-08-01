/* ===================================================================
   CHANDRA PAINTS - GOOGLE MAP & LOCATION CONTROLLER
   =================================================================== */

const MapController = {
    init: function() {
        const directionsBtn = document.getElementById('getDirectionsBtn');
        
        if (directionsBtn) {
            directionsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Open exact Google Maps query for Chandra Paints in a new tab
                window.open('https://maps.google.com/?q=Chandra+Paints', '_blank', 'noopener,noreferrer');
            });
        }
    }
};

window.MapController = MapController;
