function showStep(action) {
    if (action === 'subtract') {
        document.getElementById('step-result').style.display = 'block';
    }
}

function goToPractice() {
    document.getElementById('lesson').classList.remove('active');
    document.getElementById('practice').classList.add('active');
}

function checkPractice() {
    const input = document.getElementById('practice-input').value;
    const feedback = document.getElementById('practice-feedback');
    if (parseInt(input) === 11) {
        feedback.textContent = 'Great job! x = 11 is correct.';
        feedback.style.color = 'green';
        document.getElementById('next-challenge').style.display = 'block';
    } else {
        feedback.textContent = 'Hint: Add 3 to both sides. Try again!';
        feedback.style.color = 'red';
    }
}

function goToChallenge() {
    document.getElementById('practice').classList.remove('active');
    document.getElementById('challenge').classList.add('active');
}

function checkChallenge() {
    const input = document.getElementById('challenge-input').value;
    const feedback = document.getElementById('challenge-feedback');
    if (parseInt(input) === 4) {
        feedback.textContent = 'Awesome! x = 4 is correct.';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = 'Hint: Divide both sides by 4. Try again!';
        feedback.style.color = 'red';
    }
}
