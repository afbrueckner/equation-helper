function checkStep1() {
    const input = document.getElementById('step1-input').value;
    const feedback = document.getElementById('step1-feedback');
    if (parseInt(input) === 15) {
        feedback.textContent = 'Correct! 20 - 5 = 15, so 3x = 15.';
        feedback.style.color = 'green';
        document.getElementById('step2').style.display = 'block';
    } else {
        feedback.textContent = 'Hint: Subtract 5 from 20. Try again!';
        feedback.style.color = 'red';
    }
}

function checkStep2() {
    const input = document.getElementById('step2-input').value;
    const feedback = document.getElementById('step2-feedback');
    if (parseInt(input) === 5) {
        feedback.textContent = 'Great job! 15 ÷ 3 = 5, so x = 5.';
        feedback.style.color = 'green';
        document.getElementById('next-practice').style.display = 'block';
    } else {
        feedback.textContent = 'Hint: Divide 15 by 3. Try again!';
        feedback.style.color = 'red';
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
