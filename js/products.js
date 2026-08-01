/* ===================================================================
   CHANDRA PAINTS - PRODUCTS CONTROLLER & 3D TILT EFFECT
   =================================================================== */

const ProductsController = {
    // Authorized Products Data (8 Official Products)
    productsData: [
        {
            id: 'asian-paints',
            name: 'Asian Paints',
            tagline: 'Royale Shine & Apex Ultima Exterior',
            description: 'Teflon surface protector luxury wall finishes, waterproofing Apex Ultima, and computerized custom shade swatches.',
            logo: 'assets/logos/asian-paints.png',
            url: 'https://www.asianpaints.com/',
            badgeClass: 'badge-asian'
        },
        {
            id: 'berger-paints',
            name: 'Berger Paints',
            tagline: 'Long life 15 & Silk Glamor Emulsions',
            description: 'India\'s leading luxury interior and WeatherCoat exterior defense paints with advanced computerized shade mixing technology.',
            logo: 'assets/logos/berger-paints.png',
            url: 'https://www.bergerpaints.com/',
            badgeClass: 'badge-berger'
        },
        {
            id: 'dulux-paints',
            name: 'Dulux Paints',
            tagline: 'Velvet Touch & Weathershield Powerflex',
            description: 'High-definition washability luxury interior paints and advanced weather-defense exterior coatings.',
            logo: 'assets/logos/dulux.png',
            url: 'https://www.dulux.in/',
            badgeClass: 'badge-dulux'
        },
        {
            id: 'nerolac-paints',
            name: 'Nerolac paints',
            tagline: 'Beauty Gold & Excel Mica Marble Finish',
            description: 'Low-VOC eco-friendly paints, ultra-durable exterior wall protection, and high-definition computerized shade dispenses.',
            logo: 'assets/logos/nerolac.png',
            url: 'https://www.nerolac.com/',
            badgeClass: 'badge-nerolac'
        },
        {
            id: 'birla-white',
            name: 'Birla White Putty',
            tagline: 'Premium WallCare Putty & White Cement',
            description: 'Superior water-resistant white cement-based putty giving a silky smooth finish and extra durability for interior & exterior walls.',
            logo: 'assets/logos/birla-white.png',
            url: 'https://www.birlawhite.com/',
            badgeClass: 'badge-birla'
        },
        {
            id: 'johnson-paints',
            name: 'Johnson Paints Co.',
            tagline: 'Premium Architectural & Decorative Coatings',
            description: 'High-performance industrial and home decorative paints delivering long-lasting weather protection and smooth finishes.',
            logo: 'images/jp logo.png',
            url: 'https://johnsonpaints.co.in/cement-paints.php',
            badgeClass: 'badge-johnson'
        },
        {
            id: 'ganesh-paints',
            name: 'Ganesh Paints',
            tagline: 'PREMIUM RED OXIDE POWDER FOR CEMENT FLOORING',
            description: 'Engineered for superior cement flooring, our premium red oxide powder delivers rich colour, excellent mixing performance, strong adhesion, and a smooth, durable finish that lasts for years.',
            logo: 'images/ganeshpaints.png',
            url: 'https://ganeshpaints.com/',
            badgeClass: 'badge-ganesh'
        },
        {
            id: 'dr-fixit',
            name: 'Dr. Fixit',
            tagline: 'Waterproofing & Construction Chemicals',
            description: 'India\'s leading waterproofing expert providing complete leak-free protection for roofs, exterior walls, bathrooms, and concrete structures.',
            logo: 'images/dr.fixit logo.gif',
            url: 'https://www.drfixit.co.in/',
            badgeClass: 'badge-fixit'
        }
    ],

    init: function() {
        this.renderProducts();
        this.init3DTiltEffect();
        this.initClickHandlers();
    },

    // Render Product Cards dynamically into #productsGrid container
    renderProducts: function() {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        grid.innerHTML = this.productsData.map(prod => `
            <div class="product-card" data-url="${prod.url}">
                <div class="product-logo-wrap">
                    <img src="${prod.logo}" 
                         alt="${prod.name} Official Logo - Chandra Paints" 
                         class="product-logo" 
                         loading="lazy" 
                         decoding="async" 
                         style="object-fit: contain;">
                </div>
                <div class="product-card-body">
                    <span class="brand-tag">${prod.tagline}</span>
                    <h3 class="product-title">${prod.name}</h3>
                    <p class="product-desc">${prod.description}</p>
                    <div class="product-card-footer">
                        <a href="${prod.url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline btn-visit">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Official Website
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // 3D Hover Tilt Animation Effect
    init3DTiltEffect: function() {
        const cards = document.querySelectorAll('.product-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 12;
                const rotateY = (centerX - x) / 12;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
            });
        });
    },

    // Card & Button click handlers to open official website in NEW tab
    initClickHandlers: function() {
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const url = card.getAttribute('data-url');
                if (url) {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            });
        });
    }
};

window.ProductsController = ProductsController;
