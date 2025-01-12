// Registrazione del Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(() => console.log("Service Worker Registered"))
        .catch(err => console.error("Service Worker Registration Failed:", err));
}

// Event listener per i pulsanti
document.getElementById('calculate-btn').addEventListener('click', calculateBiorhythm);
document.getElementById('download-pdf').addEventListener('click', downloadPDF);

let biorhythmResults = {}; // Variabile globale per salvare i risultati

function calculateBiorhythm() {
    const birthdateInput = document.getElementById('birthdate');
    const targetDateInput = document.getElementById('target-date');

    if (!birthdateInput.value) {
        alert("Please enter your birth date.");
        return;
    }

    const birthdate = new Date(birthdateInput.value);
    const targetDate = targetDateInput.value ? new Date(targetDateInput.value) : new Date();

    if (birthdate > targetDate) {
        alert("Birth date cannot be after the target date.");
        return;
    }

    const daysLived = Math.floor((targetDate - birthdate) / (1000 * 60 * 60 * 24));
    const physical = Math.sin((2 * Math.PI * daysLived) / 23);
    const emotional = Math.sin((2 * Math.PI * daysLived) / 28);
    const intellectual = Math.sin((2 * Math.PI * daysLived) / 33);

    biorhythmResults = {
        birthdate: birthdate.toDateString(),
        targetDate: targetDate.toDateString(),
        physical: (physical * 100).toFixed(2),
        emotional: (emotional * 100).toFixed(2),
        intellectual: (intellectual * 100).toFixed(2),
    };

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
    let analysis = `On ${results.targetDate}, `;
    analysis += `your physical cycle is ${results.physical}%, `;
    analysis += `emotional cycle is ${results.emotional}%, `;
    analysis += `and intellectual cycle is ${results.intellectual}%.`;
    return analysis;
}

function downloadPDF() {
    const pdf = new jsPDF();
    pdf.text("Biorhythm Results", 10, 10);
    pdf.text(`Birth Date: ${biorhythmResults.birthdate}`, 10, 20);
    pdf.text(`Target Date: ${biorhythmResults.targetDate}`, 10, 30);
    pdf.text(`Physical: ${biorhythmResults.physical}%`, 10, 40);
    pdf.text(`Emotional: ${biorhythmResults.emotional}%`, 10, 50);
    pdf.text(`Intellectual: ${biorhythmResults.intellectual}%`, 10, 60);
    pdf.save("biorhythm.pdf");
}
