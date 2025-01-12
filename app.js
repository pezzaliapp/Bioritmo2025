// Registrazione del Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(() => console.log("Service Worker Registered"))
        .catch(err => console.error("Service Worker Registration Failed:", err));
}

// Calcolo del bioritmo
document.getElementById('calculate-btn').addEventListener('click', calculateBiorhythm);
document.getElementById('download-pdf').addEventListener('click', downloadPDF);

let biorhythmResults = {}; // Salva i risultati per generare il PDF

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

    // Salva i risultati per il PDF
    biorhythmResults = {
        birthdate: birthdate.toDateString(),
        targetDate: targetDate.toDateString(),
        physical: (physical * 100).toFixed(2),
        emotional: (emotional * 100).toFixed(2),
        intellectual: (intellectual * 100).toFixed(2),
    };

    // Mostra i risultati nella pagina
    const resultsDiv = document.getElementById('output');
    resultsDiv.innerHTML = `
        <h2>Biorhythm Results</h2>
        <p><strong>Birth Date:</strong> ${biorhythmResults.birthdate}</p>
        <p><strong>Target Date:</strong> ${biorhythmResults.targetDate}</p>
        <p><strong>Physical:</strong> ${biorhythmResults.physical}%</p>
        <p><strong>Emotional:</strong> ${biorhythmResults.emotional}%</p>
        <p><strong>Intellectual:</strong> ${biorhythmResults.intellectual}%</p>
        <h3>Analysis:</h3>
        <p>${generateAnalysis(biorhythmResults)}</p>
    `;
}

function generateAnalysis(results) {
    let analysis = `On the target date (${results.targetDate}), `;
    analysis += `your physical cycle is at ${results.physical}%, `;
    analysis += `your emotional cycle is at ${results.emotional}%, `;
    analysis += `and your intellectual cycle is at ${results.intellectual}%. `;

    if (results.physical > 80) {
        analysis += "You are physically very energetic and ready for challenges.";
    } else if (results.physical < 20) {
        analysis += "You might feel physically tired or less motivated today.";
    }

    if (results.emotional > 80) {
        analysis += " Emotionally, you are very positive and in a great mood.";
    } else if (results.emotional < 20) {
        analysis += " You might feel emotionally sensitive or withdrawn.";

    if (results.intellectual > 80) {
        analysis += " Intellectually, your mind is sharp and ready for problem-solving.";
    } else if (results.intellectual < 20) {
        analysis += " You might find it harder to focus or process complex ideas.";
    }

    return analysis;
}

function downloadPDF() {
    try {
        const pdf = new jsPDF();
        pdf.text("Biorhythm Results", 10, 10);
        pdf.text(`Birth Date: ${biorhythmResults.birthdate}`, 10, 20);
        pdf.text(`Target Date: ${biorhythmResults.targetDate}`, 10, 30);
        pdf.text(`Physical: ${biorhythmResults.physical}%`, 10, 40);
        pdf.text(`Emotional: ${biorhythmResults.emotional}%`, 10, 50);
        pdf.text(`Intellectual: ${biorhythmResults.intellectual}%`, 10, 60);
        pdf.text("Analysis:", 10, 70);
        pdf.text(generateAnalysis(biorhythmResults), 10, 80, { maxWidth: 180 });
        pdf.save('biorhythm.pdf');
        console.log("PDF generato con successo.");
    } catch (err) {
        console.error("Errore durante la generazione del PDF:", err);
        alert("An error occurred while generating the PDF. Please try again.");
    }
}
