/* ===================================================================
   CHANDRA PAINTS - PROFESSIONAL PAINTING COST CALCULATOR
   =================================================================== */

const CalculatorController = {
    lastState: null,

    init: function() {
        const btnCalc = document.getElementById('btnCalculateEstimate');
        const btnPdf = document.getElementById('btnDownloadPdf');
        const btnQuote = document.getElementById('btnGetFreeQuote');

        if (!btnCalc) return;

        // Auto calculate initial default estimate
        this.calculate();

        // Recalculate on form submission / click
        btnCalc.addEventListener('click', () => {
            this.calculate();
            this.animateResultCard();
        });

        // Download PDF button
        if (btnPdf) {
            btnPdf.addEventListener('click', () => {
                this.downloadPDF();
            });
        }

        // Get Free Quote on WhatsApp
        if (btnQuote) {
            btnQuote.addEventListener('click', () => {
                this.openWhatsAppQuote();
            });
        }

        // Live update on input changes
        const areaInput = document.getElementById('totalAreaInput');
        if (areaInput) {
            areaInput.addEventListener('input', () => this.calculate());
        }

        document.querySelectorAll('#paintingCalcForm input, #paintingCalcForm select').forEach(elem => {
            elem.addEventListener('change', () => this.calculate());
        });
    },

    calculate: function() {
        const projectType = document.querySelector('input[name="projectType"]:checked')?.value || 'Fresh Painting';
        const paintingArea = document.querySelector('input[name="paintingArea"]:checked')?.value || 'Interior';
        const totalAreaInput = document.getElementById('totalAreaInput');
        const totalArea = parseFloat(totalAreaInput?.value) || 1000;
        const wallPutty = document.querySelector('input[name="wallPutty"]:checked')?.value || 'Yes';
        const primer = document.querySelector('input[name="primer"]:checked')?.value || 'Yes';
        const coats = document.getElementById('coatsSelect')?.value || '2 Coats';
        const brand = document.getElementById('brandCalcSelect')?.value || 'Asian Paints';

        // Brand rate definitions (per liter / kg)
        const brandRates = {
            'Asian Paints': { paint: 380, putty: 45, primer: 160 },
            'Berger Paints': { paint: 360, putty: 42, primer: 150 },
            'Nerolac Paints': { paint: 350, putty: 40, primer: 145 },
            'Dulux Paints': { paint: 390, putty: 46, primer: 165 },
            'Birla White': { paint: 340, putty: 38, primer: 140 },
            'Johnson Paints': { paint: 330, putty: 38, primer: 135 },
            'Ganesh Paints': { paint: 310, putty: 35, primer: 125 },
            'Dr. Fixit': { paint: 420, putty: 55, primer: 180 }
        };

        const rates = brandRates[brand] || brandRates['Asian Paints'];

        // 1. Quantities calculation
        let coatMultiplier = 1.8; // 2 coats
        if (coats === '1 Coat') coatMultiplier = 1.0;
        if (coats === '3 Coats') coatMultiplier = 2.5;

        const paintQty = Math.ceil((totalArea / 120) * coatMultiplier * 10) / 10;
        const puttyQty = (wallPutty === 'Yes') ? Math.ceil(totalArea / 14) : 0;
        const primerQty = (primer === 'Yes') ? Math.ceil(totalArea / 140) : 0;

        // 2. Labour rate per sq ft
        let baseLabour = 12;
        if (paintingArea === 'Interior' && projectType === 'Fresh Painting') baseLabour = 14;
        if (paintingArea === 'Interior' && projectType === 'Repainting') baseLabour = 9;
        if (paintingArea === 'Exterior' && projectType === 'Fresh Painting') baseLabour = 16;
        if (paintingArea === 'Exterior' && projectType === 'Repainting') baseLabour = 11;

        if (wallPutty === 'Yes') baseLabour += 3;
        if (primer === 'Yes') baseLabour += 2;

        const labourCost = Math.round(totalArea * baseLabour);

        // 3. Material Cost
        const paintCost = paintQty * rates.paint;
        const puttyCost = puttyQty * rates.putty;
        const primerCost = primerQty * rates.primer;
        const materialCost = Math.round(paintCost + puttyCost + primerCost);

        // 4. Totals & GST
        const subtotal = labourCost + materialCost;
        const gst = Math.round(subtotal * 0.18);
        const grandTotal = subtotal + gst;

        // Store calculation state for PDF export & WhatsApp quote
        this.lastState = {
            projectType,
            paintingArea,
            totalArea,
            wallPutty,
            primer,
            coats,
            brand,
            paintQty,
            puttyQty,
            primerQty,
            labourCost,
            materialCost,
            gst,
            grandTotal,
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        };

        // Render output to UI
        const elPaint = document.getElementById('resPaintQty');
        const elPutty = document.getElementById('resPuttyQty');
        const elPrimer = document.getElementById('resPrimerQty');
        const elLabour = document.getElementById('resLabourCost');
        const elMaterial = document.getElementById('resMaterialCost');
        const elGst = document.getElementById('resGstCost');
        const elTotal = document.getElementById('resGrandTotal');

        if (elPaint) elPaint.textContent = `${paintQty} Liters`;
        if (elPutty) elPutty.textContent = `${puttyQty} Kg`;
        if (elPrimer) elPrimer.textContent = `${primerQty} Liters`;
        if (elLabour) elLabour.textContent = `₹${labourCost.toLocaleString('en-IN')}`;
        if (elMaterial) elMaterial.textContent = `₹${materialCost.toLocaleString('en-IN')}`;
        if (elGst) elGst.textContent = `₹${gst.toLocaleString('en-IN')}`;
        if (elTotal) elTotal.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
    },

    animateResultCard: function() {
        const card = document.getElementById('calcResultCard');
        if (!card) return;
        card.classList.remove('pulse-anim');
        void card.offsetWidth; // trigger reflow
        card.classList.add('pulse-anim');
    },

    openWhatsAppQuote: function() {
        if (!this.lastState) this.calculate();
        const s = this.lastState;

        const text = `Hello Chandra Paints! I generated a painting cost estimate on your website:%0A%0A` +
            `*Project:* ${s.projectType} (${s.paintingArea})%0A` +
            `*Area:* ${s.totalArea} Sq. Ft.%0A` +
            `*Brand:* ${s.brand}%0A` +
            `*Coats:* ${s.coats}%0A` +
            `*Paint Qty:* ${s.paintQty} Liters%0A` +
            `*Putty Qty:* ${s.puttyQty} Kg%0A` +
            `*Primer Qty:* ${s.primerQty} Liters%0A` +
            `*Material Cost:* ₹${s.materialCost.toLocaleString('en-IN')}%0A` +
            `*Labour Cost:* ₹${s.labourCost.toLocaleString('en-IN')}%0A` +
            `*Est. Grand Total:* ₹${s.grandTotal.toLocaleString('en-IN')}%0A%0A` +
            `Please share official shade swatches and best discount pricing for Amta Sahapara delivery.`;

        window.open(`https://wa.me/919932151277?text=${text}`, '_blank', 'noopener,noreferrer');
    },

    downloadPDF: function() {
        if (!this.lastState) this.calculate();
        const s = this.lastState;

        const printWindow = window.open('', '_blank');
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Chandra Paints - Professional Estimate</title>
                <style>
                    body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1e293b; padding: 40px; margin: 0; background: #fff; }
                    .header { border-bottom: 3px solid #06b6d4; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
                    .brand-name { font-size: 28px; font-weight: bold; color: #0f172a; }
                    .brand-sub { color: #06b6d4; font-size: 14px; margin-top: 4px; }
                    .doc-title { font-size: 20px; font-weight: bold; color: #ff6b00; text-align: right; }
                    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px; border: 1px solid #e2e8f0; }
                    .meta-item { font-size: 14px; }
                    .meta-item strong { color: #0f172a; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                    th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
                    th { background: #0f172a; color: #fff; font-weight: 600; }
                    .total-row { background: #f1f5f9; font-weight: bold; }
                    .grand-row { background: #06b6d4; color: #fff; font-size: 18px; font-weight: bold; }
                    .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div>
                        <div class="brand-name">Chandra Paints</div>
                        <div class="brand-sub">Amta Sahapara, Howrah, West Bengal | Ph: +91 9932151277</div>
                    </div>
                    <div>
                        <div class="doc-title">COST ESTIMATE</div>
                        <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Date: ${s.date}</div>
                    </div>
                </div>

                <div class="meta-grid">
                    <div class="meta-item"><strong>Selected Brand:</strong> ${s.brand}</div>
                    <div class="meta-item"><strong>Project Type:</strong> ${s.projectType} (${s.paintingArea})</div>
                    <div class="meta-item"><strong>Total Area:</strong> ${s.totalArea} Sq. Ft.</div>
                    <div class="meta-item"><strong>No. of Coats:</strong> ${s.coats}</div>
                    <div class="meta-item"><strong>Wall Putty:</strong> ${s.wallPutty}</div>
                    <div class="meta-item"><strong>Primer Coat:</strong> ${s.primer}</div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Item Description</th>
                            <th>Quantity</th>
                            <th style="text-align: right;">Estimated Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${s.brand} Emulsion Paint</td>
                            <td>${s.paintQty} Liters</td>
                            <td style="text-align: right;">Included in Material</td>
                        </tr>
                        <tr>
                            <td>Wall Putty Base Coat</td>
                            <td>${s.puttyQty} Kg</td>
                            <td style="text-align: right;">Included in Material</td>
                        </tr>
                        <tr>
                            <td>Undercoat Primer</td>
                            <td>${s.primerQty} Liters</td>
                            <td style="text-align: right;">Included in Material</td>
                        </tr>
                        <tr class="total-row">
                            <td colspan="2">Total Material Cost</td>
                            <td style="text-align: right;">₹${s.materialCost.toLocaleString('en-IN')}</td>
                        </tr>
                        <tr class="total-row">
                            <td colspan="2">Professional Skilled Labour Charges</td>
                            <td style="text-align: right;">₹${s.labourCost.toLocaleString('en-IN')}</td>
                        </tr>
                        <tr>
                            <td colspan="2">GST (18% Applicable)</td>
                            <td style="text-align: right;">₹${s.gst.toLocaleString('en-IN')}</td>
                        </tr>
                        <tr class="grand-row">
                            <td colspan="2">ESTIMATED GRAND TOTAL</td>
                            <td style="text-align: right;">₹${s.grandTotal.toLocaleString('en-IN')}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="footer">
                    * Computerized estimate based on standard coverage guidelines and market rates. Final quotes subject to site inspection.<br>
                    <strong>Chandra Paints &copy; ${new Date().getFullYear()} — Thank you for choosing us!</strong>
                </div>

                <script>
                    window.onload = function() {
                        window.print();
                    };
                </script>
            </body>
            </html>
        `;

        printWindow.document.write(html);
        printWindow.document.close();
    }
};

window.CalculatorController = CalculatorController;
