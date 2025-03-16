let oneStepCorrect = 0;
let twoStepCorrect = 0;
let multiStepCorrect = 0;
const masteryThreshold = 3;

const oneStepProblems = [
    { eq: "x + 4 = 10", answer: 6, hint: "Subtract 4 from both sides." },
    { eq: "x - 3 = 7", answer: 10, hint: "Add 3 to both sides." },
    { eq: "2x = 8", answer: 4, hint: "Divide both sides by 2." }
];
const twoStepProblems = [
    { eq: "2x + 5 = 11", step1: 6, step2: 3, hint1: "Subtract 5 from both sides." },
    { eq: "3x - 4 = 8", step1: 12, step2: 4, hint1: "Add 4 to both sides." }
];
const multiStepProblems = [
    { eq: "2x + 3 = 5x - 6", step1: -9, step2: 3, step3: 1 }
];

let currentOneStep = 0;
let currentTwoStep = 0;
let currentMultiStep = 0;

function updateProgress() {
    document.getElementById('one-step-progress').textContent = `${oneStepCorrect}/${masteryThreshold}`;
    document.getElementById('two-step-progress').textContent = oneStepCorrect >= masteryThreshold ? `${twoStepCorrect}/${masteryThreshold}` : 'Locked';
    document.getElementById('multi-step-progress').textContent = twoStepCorrect >= masteryThreshold ? `${multiStepCorrect}/${masteryThreshold}` : 'Locked';
}

function loadOneStepProblem() {
    const problem = oneStepProblems[currentOneStep];
    document.getElementById('one-step-eq').textContent = problem.eq;
    document.getElementById('one-step-hint').textContent = problem.hint;
    document.querySelector('#one-step .left-side').textContent = problem.eq.split('=')[0].trim();
    document.querySelector('#one-step .right-side').textContent = problem.eq.split('=')[1].trim();
}

function checkOneStep() {
    const input = parseInt(document.getElementById('one-step-input').value);
    const feedback = document.getElementById('one-step-feedback');
    const problem = oneStepProblems[currentOneStep];
    if (input === problem.answer) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        oneStepCorrect++;
        currentOneStep = (currentOneStep + 1) % oneStepProblems.length;
        setTimeout(() => {
            feedback.textContent = '';
            document.getElementById('one-step-input').value = '';
            loadOneStepProblem();
            if (oneStepCorrect >= masteryThreshold) {
                document.getElementById('one-step').classList.remove('active');
                document.getElementById('two-step').classList.add('active');
            }
            updateProgress();
        }, 1000);
    } else {
        feedback.textContent = 'Try again!';
        feedback.style.color = 'red';
        oneStepCorrect = 0;
        updateProgress();
    }
}

function loadTwoStepProblem() {
    const problem = twoStepProblems[currentTwoStep];
    document.getElementById('two-step-eq').textContent = problem.eq;
    document.getElementById('two-step-hint1').textContent = problem.hint1;
    document.querySelector('#two-step .left-side').textContent = problem.eq.split('=')[0].trim();
    document.querySelector('#two-step .right-side').textContent = problem.eq.split('=')[1].trim();
}

function checkTwoStep1() {
    const input = parseInt(document.getElementById('two-step-input1').value);
    const feedback = document.getElementById('two-step-feedback1');
    const problem = twoStepProblems[currentTwoStep];
    if (input === problem.step1) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        document.getElementById('two-step-step2').style.display = 'block';
    } else {
        feedback.textContent = 'Hint: Check your subtraction or addition.';
        feedback.style.color = 'red';
    }
}

function checkTwoStep2() {
    const input = parseInt(document.getElementById('two-step-input2').value);
    const feedback = document.getElementById('two-step-feedback2');
    const problem = twoStepProblems[currentTwoStep];
    if (input === problem.step2) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        twoStepCorrect++;
        currentTwoStep = (currentTwoStep + 1) % twoStepProblems.length;
        setTimeout(() => {
            feedback.textContent = '';
            document.getElementById('two-step-input1').value = '';
            document.getElementById('two-step-input2').value = '';
            document.getElementById('two-step-step2').style.display = 'none';
            loadTwoStepProblem();
            if (twoStepCorrect >= masteryThreshold) {
                document.getElementById('two-step').classList.remove('active');
                document.getElementById('multi-step').classList.add('active');
            }
            updateProgress();
        }, 1000);
    } else {
        feedback.textContent = 'Hint: Check your division.';
        feedback.style.color = 'red';
        twoStepCorrect = 0;
        updateProgress();
    }
}

function loadMultiStepProblem() {
    const problem = multiStepProblems[currentMultiStep];
    document.getElementById('multi-step-eq').textContent = problem.eq;
    document.querySelector('#multi-step .left-side').textContent = problem.eq.split('=')[0].trim();
    document.querySelector('#multi-step .right-side').textContent = problem.eq.split('=')[1].trim();
}

function checkMultiStep1() {
    const input = parseInt(document.getElementById('multi-step-input1').value);
    const feedback = document.getElementById('multi-step-feedback1');
    const problem = multiStepProblems[currentMultiStep];
    if (input === problem.step1) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        document.getElementById('multi-step-step2').style.display = 'block';
    } else {
        feedback.textContent = 'Hint: Subtract 2x correctly.';
        feedback.style.color = 'red';
    }
}

function checkMultiStep2() {
    const input = parseInt(document.getElementById('multi-step-input2').value);
    const feedback = document.getElementById('multi-step-feedback2');
    const problem = multiStepProblems[currentMultiStep];
    if (input === problem.step2) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        document.getElementById('multi-step-step3').style.display = 'block';
    } else {
        feedback.textContent = 'Hint: Add 6 correctly.';
        feedback.style.color = 'red';
    }
}

function checkMultiStep3() {
    const input = parseInt(document.getElementById('multi-step-input3').value);
    const feedback = document.getElementById('multi-step-feedback3');
    const problem = multiStepProblems[currentMultiStep];
    if (input === problem.step3) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        multiStepCorrect++;
        currentMultiStep = (currentMultiStep + 1) % multiStepProblems.length;
        setTimeout(() => {
            feedback.textContent = '';
            document.getElementById('multi-step-input1').value = '';
            document.getElementById('multi-step-input2').value = '';
            document.getElementById('multi-step-input3').value = '';
            document.getElementById('multi-step-step2').style.display = 'none';
            document.getElementById('multi-step-step3').style.display = 'none';
            loadMultiStepProblem();
            updateProgress();
        }, 1000);
    } else {
        feedback.textContent = 'Hint: Divide by 3 correctly.';
        feedback.style.color = 'red';
        multiStepCorrect = 0;
        updateProgress();
    }
}

// Initialize
loadOneStepProblem();
loadTwoStepProblem();
loadMultiStepProblem();
updateProgress();
