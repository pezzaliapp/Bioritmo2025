// Registrazione del Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(() => console.log("Service Worker Registered"))
        .catch(err => console.error("Service Worker Registration Failed:", err));
}

// Event listener per il calcolo
document.getElementById('calculate-btn').addEventListener('click', calculateBiorhythm);

function calculateBiorhythm() {
    const birthdateInput = document.getElementById('birthdate');
    const targetDateInput = document.getElementById('target-date');

    // Controlla che la data di nascita sia stata inserita
    if (!birthdateInput.value) {
        alert("Please enter your birth date.");
        return;
    }

    // Converte le date inserite in oggetti Date
    const birthdate = new Date(birthdateInput.value);
    const targetDate = targetDateInput.value ? new Date(targetDateInput.value) : new Date();

    // Controlla che la data di nascita non sia successiva alla data target
    if (birthdate > targetDate) {
        alert("Birth date cannot be after the target date.");
        return;
    }

    // Calcola i giorni vissuti
    const daysLived = Math.floor((targetDate - birthdate) / (1000 * 60 * 60 * 24));

    // Calcola i valori dei bioritmi
    const physical = Math.sin((2 * Math.PI * daysLived) / 23);
    const emotional = Math.sin((2 * Math.PI * daysLived) / 28);
    const intellectual = Math.sin((2 * Math.PI * daysLived) / 33);

    // Mostra i risultati
    const resultsDiv = document.getElementById('output');
    resultsDiv.innerHTML = `
        <h2>Biorhythm Results</h2>
        <p><strong>Physical:</strong> ${(physical * 100).toFixed(2)}%</p>
        <p><strong>Emotional:</strong> ${(emotional * 100).toFixed(2)}%</p>
        <p><strong>Intellectual:</strong> ${(intellectual * 100).toFixed(2)}%</p>
    `;
}
