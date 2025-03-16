function checkStep1() {
    const input = document.getElementById('step1-input').value;
    const feedback = document.getElementById('step1-feedback');
    if (parseInt(input) === 15) {
        feedback.textContent = 'Correct! 20 - 5 = 15, so 3x = 15.';
        feedback.style.color = 'green';
        document.getElementById('plus-five').classList.add('crossed-out');
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
        document.getElementById('number-line-result').style.display = 'block';
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

function checkPracticeStep1() {
    const input = document.getElementById('practice-step1-input').value;
    const feedback = document.getElementById('practice-step1-feedback');
    if (parseInt(input) === 11) {
        feedback.textContent = 'Correct! 8 + 3 = 11, so x = 11.';
        feedback.style.color = 'green';
        document.getElementById('practice-step2').style.display = 'block';
    } else {
        feedback.textContent = 'Hint: Add 3 to 8. Try again!';
        feedback.style.color = 'red';
    }
}

function checkPracticeStep2() {
    const input = document.getElementById('practice-step2-input').value;
    const feedback = document.getElementById('practice-step2-feedback');
    if (parseInt(input) === 11) {
        feedback.textContent = 'Great job! x = 11 is correct.';
        feedback.style.color = 'green';
        document.getElementById('next-challenge').style.display = 'block';
    } else {
        feedback.textContent = 'Hint: Check the last step. What’s x?';
        feedback.style.color = 'red';
    }
}

function goToChallenge() {
    document.getElementById('practice').classList.remove('active');
    document.getElementById('challenge').classList.add('active');
}

function checkChallengeStep1() {
    const input = document.getElementById('challenge-step1-input').value;
    const feedback = document.getElementById('challenge-step1-feedback');
    if (parseInt(input) === 4) {
        feedback.textContent = 'Correct! 16 ÷ 4 = 4, so x = 4.';
        feedback.style.color = 'green';
        document.getElementById('challenge-step2').style.display = 'block';
    } else {
        feedback.textContent = 'Hint: Divide 16 by 4. Try again!';
        feedback.style.color = 'red';
    }
}

function checkChallengeStep2() {
    const input = document.getElementById('challenge-step2-input').value;
    const feedback = document.getElementById('challenge-step2-feedback');
    if (parseInt(input) === 4) {
        feedback.textContent = 'Awesome! x = 4 is correct.';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = 'Hint: Check the last step. What’s x?';
        feedback.style.color = 'red';
    }
}
