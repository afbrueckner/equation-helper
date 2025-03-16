let oneStepCorrect = 0;
let twoStepCorrect = 0;
let multiStepCorrect = 0;
const masteryThreshold = 3;

const oneStepProblems = [
    { eq: "x + 4 = 10", answer: "x=6", hint: "Subtract 4 from both sides." },
    { eq: "x - 3 = 7", answer: "x=10", hint: "Add 3 to both sides." },
    { eq: "2x = 8", answer: "x=4", hint: "Divide both sides by 2." }
];
const twoStepProblems = [
    { eq: "2x + 4 = 10", step1: "2x=6", step2: "x=3", hint1: "Subtract 4 from both sides.", hint2: "Divide both sides by 2." },
    { eq: "3x - 4 = 8", step1: "3x=12", step2: "x=4", hint1: "Add 4 to both sides.", hint2: "Divide both sides by 3." }
];
const multiStepProblems = [
    { eq: "2x + 3 = 5x - 6", step1: "3=3x-6", step2: "9=3x", step3: "x=3" }
];

let currentOneStep = 0;
let currentTwoStep = 0;
let currentMultiStep = 0;

// Progress Tracker
function updateProgress() {
    document.getElementById('one-step-progress').textContent = `${oneStepCorrect}/${masteryThreshold}`;
    document.getElementById('two-step-progress').textContent = oneStepCorrect >= masteryThreshold ? `${twoStepCorrect}/${masteryThreshold}` : 'Locked';
    document.getElementById('multi-step-progress').textContent = twoStepCorrect >= masteryThreshold ? `${multiStepCorrect}/${masteryThreshold}` : 'Locked';
}

// One-Step Logic
function loadOneStepProblem() {
    const problem = oneStepProblems[currentOneStep];
    document.getElementById('one-step-eq').textContent = problem.eq;
    document.getElementById('one-step-hint').textContent = problem.hint;
    document.querySelector('#one-step .left-side').textContent = problem.eq.split('=')[0].trim();
    document.querySelector('#one-step .right-side').textContent = problem.eq.split('=')[1].trim();
}

function checkOneStep() {
    const input = document.getElementById('one-step-input').value.trim();
    const feedback = document.getElementById('one-step-feedback');
    const problem = oneStepProblems[currentOneStep];
    if (input === problem.answer) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        oneStepCorrect++;
        setTimeout(() => {
            feedback.textContent = '';
            document.getElementById('one-step-input').value = '';
            currentOneStep = (currentOneStep + 1) % oneStepProblems.length;
            loadOneStepProblem();
            if (oneStepCorrect >= masteryThreshold) {
                document.getElementById('one-step').classList.remove('active');
                document.getElementById('two-step').classList.add('active');
            }
            updateProgress();
        }, 1000);
    } else {
        feedback.textContent = 'Try again! (e.g., x=6)';
        feedback.style.color = 'red';
        oneStepCorrect = 0;
        updateProgress();
    }
}

// Two-Step Logic
function loadTwoStepProblem() {
    const problem = twoStepProblems[currentTwoStep];
    document.getElementById('two-step-eq').textContent = problem.eq;
    document.getElementById('two-step-eq2').textContent = problem.step1;
    document.getElementById('two-step-hint1').textContent = problem.hint1;
    document.getElementById('two-step-hint2').textContent = problem.hint2;
    document.querySelector('#two-step .left-side').textContent = problem.eq.split('=')[0].trim();
    document.querySelector('#two-step .right-side').textContent = problem.eq.split('=')[1].trim();
}

function checkTwoStep1() {
    const input = document.getElementById('two-step-input1').value.trim();
    const feedback = document.getElementById('two-step-feedback1');
    const problem = twoStepProblems[currentTwoStep];
    if (input === problem.step1) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        document.getElementById('two-step-step2').style.display = 'block';
    } else {
        feedback.textContent = `Hint: Should be "${problem.step1}"`;
        feedback.style.color = 'red';
    }
}

function checkTwoStep2() {
    const input = document.getElementById('two-step-input2').value.trim();
    const feedback = document.getElementById('two-step-feedback2');
    const problem = twoStepProblems[currentTwoStep];
    if (input === problem.step2) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        twoStepCorrect++;
        setTimeout(() => {
            feedback.textContent = '';
            document.getElementById('two-step-input1').value = '';
            document.getElementById('two-step-input2').value = '';
            document.getElementById('two-step-step2').style.display = 'none';
            currentTwoStep = (currentTwoStep + 1) % twoStepProblems.length;
            loadTwoStepProblem();
            if (twoStepCorrect >= masteryThreshold) {
                document.getElementById('two-step').classList.remove('active');
                document.getElementById('multi-step').classList.add('active');
            }
            updateProgress();
        }, 1000);
    } else {
        feedback.textContent = `Hint: Should be "${problem.step2}"`;
        feedback.style.color = 'red';
        twoStepCorrect = 0;
        updateProgress();
    }
}

// Multi-Step Logic
function loadMultiStepProblem() {
    const problem = multiStepProblems[currentMultiStep];
    document.getElementById('multi-step-eq').textContent = problem.eq;
    document.getElementById('multi-step-eq2').textContent = problem.step1;
    document.getElementById('multi-step-eq3').textContent = problem.step2;
    document.querySelector('#multi-step .left-side').textContent = problem.eq.split('=')[0].trim();
    document.querySelector('#multi-step .right-side').textContent = problem.eq.split('=')[1].trim();
}

function checkMultiStep1() {
    const input = document.getElementById('multi-step-input1').value.trim();
    const feedback = document.getElementById('multi-step-feedback1');
    const problem = multiStepProblems[currentMultiStep];
    if (input === problem.step1) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        document.getElementById('multi-step-step2').style.display = 'block';
    } else {
        feedback.textContent = `Hint: Should be "${problem.step1}"`;
        feedback.style.color = 'red';
    }
}

function checkMultiStep2() {
    const input = document.getElementById('multi-step-input2').value.trim();
    const feedback = document.getElementById('multi-step-feedback2');
    const problem = multiStepProblems[currentMultiStep];
    if (input === problem.step2) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        document.getElementById('multi-step-step3').style.display = 'block';
    } else {
        feedback.textContent = `Hint: Should be "${problem.step2}"`;
        feedback.style.color = 'red';
    }
}

function checkMultiStep3() {
    const input = document.getElementById('multi-step-input3').value.trim();
    const feedback = document.getElementById('multi-step-feedback3');
    const problem = multiStepProblems[currentMultiStep];
    if (input === problem.step3) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        multiStepCorrect++;
        setTimeout(() => {
            feedback.textContent = '';
            document.getElementById('multi-step-input1').value = '';
            document.getElementById('multi-step-input2').value = '';
            document.getElementById('multi-step-input3').value = '';
            document.getElementById('multi-step-step2').style.display = 'none';
            document.getElementById('multi-step-step3').style.display = 'none';
            currentMultiStep = (currentMultiStep + 1) % multiStepProblems.length;
            loadMultiStepProblem();
            updateProgress();
        }, 1000);
    } else {
        feedback.textContent = `Hint: Should be "${problem.step3}"`;
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
