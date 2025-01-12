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

    const resultsDiv = document.getElementById('output');
    resultsDiv.innerHTML = `
        <h2>Biorhythm Results</h2>
        <p><strong>Physical:</strong> ${(physical * 100).toFixed(2)}%</p>
        <p><strong>Emotional:</strong> ${(emotional * 100).toFixed(2)}%</p>
        <p><strong>Intellectual:</strong> ${(intellectual * 100).toFixed(2)}%</p>
    `;
}
