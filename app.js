document.getElementById('download-pdf').addEventListener('click', downloadPDF);

function downloadPDF() {
    try {
        // Recupera il canvas del grafico
        const canvas = document.getElementById('biorhythm-chart');
        
        // Verifica se il canvas esiste
        if (!canvas) {
            throw new Error("Il grafico non è stato generato. Calcola prima il bioritmo.");
        }
        
        // Converte il canvas in un'immagine
        const imgData = canvas.toDataURL('image/png');
        
        // Crea un nuovo documento PDF
        const pdf = new jsPDF();
        pdf.text("Biorhythm Results", 10, 10); // Titolo nel PDF
        pdf.addImage(imgData, 'PNG', 10, 20, 180, 90); // Aggiunge il grafico al PDF
        
        // Salva il PDF con il nome specificato
        pdf.save('biorhythm.pdf');
    } catch (err) {
        // Mostra un errore in console e un alert all'utente
        console.error("Errore durante la generazione del PDF:", err);
        alert("Si è verificato un errore durante la generazione del PDF. Assicurati che il grafico sia stato generato.");
    }
}
