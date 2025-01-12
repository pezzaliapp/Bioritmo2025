// Registrazione del Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(() => console.log("Service Worker Registered"))
        .catch(err => console.error("Service Worker Registration Failed:", err));
}

// Calcolo del bioritmo
document.getElementById('calculate-btn').addEventListener('click', calculateBiorhythm);
document.getElementById('download-pdf').addEventListener('click', downloadPDF);

function calculateBiorhythm() {
    const birthdateInput = document.getElementById('birthdate');
    const targetDateInput = document.getElementById('target-date');

    // Controlla se la data di nascita è stata inserita
    if (!birthdateInput.value) {
        alert("Please enter your birth date.");
        return;
    }

    const birthdate = new Date(birthdateInput.value);
    const targetDate = targetDateInput.value ? new Date(targetDateInput.value) : new Date();

    // Controlla che la data di nascita non sia successiva alla data target
    if (birthdate > targetDate) {
        alert("Birth date cannot be after the target date.");
        return;
    }

    const daysLived = Math.floor((targetDate - birthdate) / (1000 * 60 * 60 * 24));

    // Calcolo dei valori del bioritmo
    const physical = Math.sin((2 * Math.PI * daysLived) / 23);
    const emotional = Math.sin((2 * Math.PI * daysLived) / 28);
    const intellectual = Math.sin((2 * Math.PI * daysLived) / 33);

    displayChart(daysLived, physical, emotional, intellectual);
}

function displayChart(daysLived, physical, emotional, intellectual) {
    const ctx = document.getElementById('biorhythm-chart').getContext('2d');

    // Rimuove eventuali grafici precedenti
    if (Chart.getChart(ctx)) {
        Chart.getChart(ctx).destroy();
    }

    // Genera le etichette per il grafico (30 giorni attorno alla data target)
    const labels = Array.from({ length: 30 }, (_, i) => `Day ${i - 15}`);
    const physicalData = labels.map((_, i) =>
        Math.sin((2 * Math.PI * (daysLived + i - 15)) / 23)
    );
    const emotionalData = labels.map((_, i) =>
        Math.sin((2 * Math.PI * (daysLived + i - 15)) / 28)
    );
    const intellectualData = labels.map((_, i) =>
        Math.sin((2 * Math.PI * (daysLived + i - 15)) / 33)
    );

    // Genera il grafico con Chart.js
    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Physical',
                    data: physicalData,
                    borderColor: 'red',
                    fill: false
                },
                {
                    label: 'Emotional',
                    data: emotionalData,
                    borderColor: 'blue',
                    fill: false
                },
                {
                    label: 'Intellectual',
                    data: intellectualData,
                    borderColor: 'green',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

function downloadPDF() {
    try {
        // Recupera il canvas
        const canvas = document.getElementById('biorhythm-chart');

        // Verifica che il grafico esista
        if (!canvas) {
            throw new Error("Canvas non trovato. Assicurati di aver calcolato il bioritmo.");
        }

        // Converte il canvas in immagine
        const imgData = canvas.toDataURL('image/png');
        if (!imgData || imgData === "data:,") {
            throw new Error("Il grafico non è stato generato correttamente.");
        }

        // Crea un nuovo documento PDF
        const pdf = new jsPDF();
        pdf.text("Biorhythm Results", 10, 10); // Aggiunge un titolo al PDF
        pdf.addImage(imgData, 'PNG', 10, 20, 180, 90); // Aggiunge il grafico al PDF
        
        // Salva il PDF
        pdf.save('biorhythm.pdf');
    } catch (err) {
        console.error("Errore durante la generazione del PDF:", err);
        alert("An error occurred while generating the PDF. Please try again.");
    }
}
