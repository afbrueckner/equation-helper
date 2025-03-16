let oneStepCorrect = 0;
let twoStepCorrect = 0;
let multiStepCorrect = 0;
let mixedCorrect = 0;
let streak = 0;
const streakThreshold = 5;

const oneStepProblems = [
    { eq: "x+4=10", answer: "x=6", hint: "Subtract 4 from both sides." },
    { eq: "x-3=7", answer: "x=10", hint: "Add 3 to both sides." },
    { eq: "2x=8", answer: "x=4", hint: "Divide both sides by 2." },
    { eq: "x+5=12", answer: "x=7", hint: "Subtract 5 from both sides." },
    { eq: "x-6=4", answer: "x=10", hint: "Add 6 to both sides." },
    { eq: "3x=15", answer: "x=5", hint: "Divide both sides by 3." },
    { eq: "x+2=9", answer: "x=7", hint: "Subtract 2 from both sides." },
    { eq: "x-8=2", answer: "x=10", hint: "Add 8 to both sides." },
    { eq: "4x=12", answer: "x=3", hint: "Divide both sides by 4." },
    { eq: "x+7=13", answer: "x=6", hint: "Subtract 7 from both sides." }
];

const twoStepProblems = [
    { eq: "2x+4=10", step1: "2x=6", step2: "x=3", hint1: "Subtract 4 from both sides.", hint2: "Divide both sides by 2." },
    { eq: "3x-4=8", step1: "3x=12", step2: "x=4", hint1: "Add 4 to both sides.", hint2: "Divide both sides by 3." },
    { eq: "5x+2=17", step1: "5x=15", step2: "x=3", hint1: "Subtract 2 from both sides.", hint2: "Divide both sides by 5." },
    { eq: "4x-6=10", step1: "4x=16", step2: "x=4", hint1: "Add 6 to both sides.", hint2: "Divide both sides by 4." },
    { eq: "2x+5=11", step1: "2x=6", step2: "x=3", hint1: "Subtract 5 from both sides.", hint2: "Divide both sides by 2." },
    { eq: "3x-7=5", step1: "3x=12", step2: "x=4", hint1: "Add 7 to both sides.", hint2: "Divide both sides by 3." },
    { eq: "6x+3=15", step1: "6x=12", step2: "x=2", hint1: "Subtract 3 from both sides.", hint2: "Divide both sides by 6." },
    { eq: "5x-8=7", step1: "5x=15", step2: "x=3", hint1: "Add 8 to both sides.", hint2: "Divide both sides by 5." },
    { eq: "4x+1=13", step1: "4x=12", step2: "x=3", hint1: "Subtract 1 from both sides.", hint2: "Divide both sides by 4." },
    { eq: "2x-3=7", step1: "2x=10", step2: "x=5", hint1: "Add 3 to both sides.", hint2: "Divide both sides by 2." }
];

const multiStepProblems = [
    { eq: "2x+3=5x-6", step1: "3=3x-6", step2: "9=3x", step3: "x=3", hint1: "Subtract 2x from both sides.", hint2: "Add 6 to both sides.", hint3: "Divide both sides by 3." },
    { eq: "4x-5=2x+7", step1: "2x-5=7", step2: "2x=12", step3: "x=6", hint1: "Subtract 2x from both sides.", hint2: "Add 5 to both sides.", hint3: "Divide both sides by 2." },
    { eq: "3x+4=6x-2", step1: "4=3x-2", step2: "6=3x", step3: "x=2", hint1: "Subtract 3x from both sides.", hint2: "Add 2 to both sides.", hint3: "Divide both sides by 3." },
    { eq: "5x-1=2x+8", step1: "3x-1=8", step2: "3x=9", step3: "x=3", hint1: "Subtract 2x from both sides.", hint2: "Add 1 to both sides.", hint3: "Divide both sides by 3." },
    { eq: "7x+2=4x+11", step1: "3x+2=11", step2: "3x=9", step3: "x=3", hint1: "Subtract 4x from both sides.", hint2: "Subtract 2 from both sides.", hint3: "Divide both sides by 3." },
    { eq: "2x-6=5x-15", step1: "-6=3x-15", step2: "9=3x", step3: "x=3", hint1: "Subtract 2x from both sides.", hint2: "Add 15 to both sides.", hint3: "Divide both sides by 3." },
    { eq: "6x+1=3x+10", step1: "3x+1=10", step2: "3x=9", step3: "x=3", hint1: "Subtract 3x from both sides.", hint2: "Subtract 1 from both sides.", hint3: "Divide both sides by 3." },
    { eq: "4x-3=7x-12", step1: "-3=3x-12", step2: "9=3x", step3: "x=3", hint1: "Subtract 4x from both sides.", hint2: "Add 12 to both sides.", hint3: "Divide both sides by 3." },
    { eq: "5x+4=2x+13", step1: "3x+4=13", step2: "3x=9", step3: "x=3", hint1: "Subtract 2x from both sides.", hint2: "Subtract 4 from both sides.", hint3: "Divide both sides by 3." },
    { eq: "3x-8=6x-14", step1: "-8=3x-14", step2: "6=3x", step3: "x=2", hint1: "Subtract 3x from both sides.", hint2: "Add 14 to both sides.", hint3: "Divide both sides by 3." }
];

const mixedProblems = [...oneStepProblems, ...twoStepProblems.map(p => ({ eq: p.eq, answer: p.step2 })), ...multiStepProblems.map(p => ({ eq: p.eq, answer: p.step3 }))];

let currentOneStep, currentTwoStep, currentMultiStep, currentMixed;

// Progress Tracker
function updateProgress() {
    document.getElementById('one-step-progress').textContent = `${oneStepCorrect}/${streakThreshold}`;
    document.getElementById('two-step-progress').textContent = oneStepCorrect >= streakThreshold ? `${twoStepCorrect}/${streakThreshold}` : 'Locked';
    document.getElementById('multi-step-progress').textContent = twoStepCorrect >= streakThreshold ? `${multiStepCorrect}/${streakThreshold}` : 'Locked';
    document.getElementById('mixed-progress').textContent = multiStepCorrect >= streakThreshold ? `${mixedCorrect}/${streakThreshold}` : 'Locked';
    document.getElementById('streak').textContent = `${streak}/${streakThreshold}`;
}

function resetGame() {
    oneStepCorrect = 0;
    twoStepCorrect = 0;
    multiStepCorrect = 0;
    mixedCorrect = 0;
    streak = 0;
    document.getElementById('one-step').classList.add('active');
    document.getElementById('two-step').classList.remove('active');
    document.getElementById('multi-step').classList.remove('active');
    document.getElementById('mixed').classList.remove('active');
    loadOneStepProblem();
    updateProgress();
}

// One-Step Logic
function loadOneStepProblem() {
    currentOneStep = oneStepProblems[Math.floor(Math.random() * oneStepProblems.length)];
    document.getElementById('one-step-eq').textContent = currentOneStep.eq;
    document.getElementById('one-step-hint').textContent = currentOneStep.hint;
    document.querySelector('#one-step .left-side').textContent = currentOneStep.eq.split('=')[0];
    document.querySelector('#one-step .right-side').textContent = currentOneStep.eq.split('=')[1];
}

function checkOneStep() {
    const input = document.getElementById('one-step-input').value.trim();
    const feedback = document.getElementById('one-step-feedback');
    if (input === currentOneStep.answer) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        streak++;
        oneStepCorrect++;
        if (streak >= streakThreshold) {
            document.getElementById('one-step').classList.remove('active');
            document.getElementById('two-step').classList.add('active');
            streak = 0;
        }
        setTimeout(() => {
            feedback.textContent = '';
            document.getElementById('one-step-input').value = '';
            loadOneStepProblem();
            updateProgress();
        }, 1000);
    } else {
        feedback.textContent = `Try again! (e.g., ${currentOneStep.answer})`;
        feedback.style.color = 'red';
        streak = 0;
        updateProgress();
    }
}

// Two-Step Logic
function loadTwoStepProblem() {
    currentTwoStep = twoStepProblems[Math.floor(Math.random() * twoStepProblems.length)];
    document.getElementById('two-step-eq').textContent = currentTwoStep.eq;
    document.getElementById('two-step-eq2').textContent = currentTwoStep.step1;
    document.getElementById('two-step-hint1').textContent = currentTwoStep.hint1;
    document.getElementById('two-step-hint2').textContent = currentTwoStep.hint2;
    document.querySelector('#two-step .left-side').textContent = currentTwoStep.eq.split('=')[0];
    document.querySelector('#two-step .right-side').textContent = currentTwoStep.eq.split('=')[1];
}

function checkTwoStep1() {
    const input = document.getElementById('two-step-input1').value.trim();
    const feedback = document.getElementById('two-step-feedback1');
    if (input === currentTwoStep.step1) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        document.getElementById('two-step-step2').style.display = 'block';
    } else {
        feedback.textContent = `Hint: Should be "${currentTwoStep.step1}"`;
        feedback.style.color = 'red';
    }
}

function checkTwoStep2() {
    const input = document.getElementById('two-step-input2').value.trim();
    const feedback = document.getElementById('two-step-feedback2');
    if (input === currentTwoStep.step2) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        streak++;
        twoStepCorrect++;
        if (streak >= streakThreshold) {
            document.getElementById('two-step').classList.remove('active');
            document.getElementById('multi-step').classList.add('active');
            streak = 0;
        }
        setTimeout(() => {
            feedback.textContent = '';
            document.getElementById('two-step-input1').value = '';
            document.getElementById('two-step-input2').value = '';
            document.getElementById('two-step-step2').style.display = 'none';
            loadTwoStepProblem();
            updateProgress();
        }, 1000);
    } else {
        feedback.textContent = `Hint: Should be "${currentTwoStep.step2}"`;
        feedback.style.color = 'red';
        streak = 0;
        updateProgress();
    }
}

// Multi-Step Logic
function loadMultiStepProblem() {
    currentMultiStep = multiStepProblems[Math.floor(Math.random() * multiStepProblems.length)];
    document.getElementById('multi-step-eq').textContent = currentMultiStep.eq;
    document.getElementById('multi-step-eq2').textContent = currentMultiStep.step1;
    document.getElementById('multi-step-eq3').textContent = currentMultiStep.step2;
    document.getElementById('multi-step-hint1').textContent = currentMultiStep.hint1;
    document.getElementById('multi-step-hint2').textContent = currentMultiStep.hint2;
    document.getElementById('multi-step-hint3').textContent = currentMultiStep.hint3;
    document.querySelector('#multi-step .left-side').textContent = currentMultiStep.eq.split('=')[0];
    document.querySelector('#multi-step .right-side').textContent = currentMultiStep.eq.split('=')[1];
}

function checkMultiStep1() {
    const input = document.getElementById('multi-step-input1').value.trim();
    const feedback = document.getElementById('multi-step-feedback1');
    if (input === currentMultiStep.step1) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        document.getElementById('multi-step-step2').style.display = 'block';
    } else {
        feedback.textContent = `Hint: Should be "${currentMultiStep.step1}"`;
        feedback.style.color = 'red';
    }
}

function checkMultiStep2() {
    const input = document.getElementById('multi-step-input2').value.trim();
    const feedback = document.getElementById('multi-step-feedback2');
    if (input === currentMultiStep.step2) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        document.getElementById('multi-step-step3').style.display = 'block';
    } else {
        feedback.textContent = `Hint: Should be "${currentMultiStep.step2}"`;
        feedback.style.color = 'red';
    }
}

function checkMultiStep3() {
    const input = document.getElementById('multi-step-input3').value.trim();
    const feedback = document.getElementById('multi-step-feedback3');
    if (input === currentMultiStep.step3) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        streak++;
        multiStepCorrect++;
        if (streak >= streakThreshold) {
            document.getElementById('multi-step').classList.remove('active');
            document.getElementById('mixed').classList.add('active');
            streak = 0;
        }
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
        feedback.textContent = `Hint: Should be "${currentMultiStep.step3}"`;
        feedback.style.color = 'red';
        streak = 0;
        updateProgress();
    }
}

// Mixed Logic (No Hints)
function loadMixedProblem() {
    currentMixed = mixedProblems[Math.floor(Math.random() * mixedProblems.length)];
    document.getElementById('mixed-eq').textContent = currentMixed.eq;
    document.querySelector('#mixed .left-side').textContent = currentMixed.eq.split('=')[0];
    document.querySelector('#mixed .right-side').textContent = currentMixed.eq.split('=')[1];
}

function checkMixed() {
    const input = document.getElementById('mixed-input').value.trim();
    const feedback = document.getElementById('mixed-feedback');
    if (input === currentMixed.answer) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        streak++;
        mixedCorrect++;
        if (streak >= streakThreshold) {
            feedback.textContent = 'You’ve mastered all levels! Reset to play again.';
            streak = 0;
        }
        setTimeout(() => {
            if (streak < streakThreshold) {
                feedback.textContent = '';
                document.getElementById('mixed-input').value = '';
                loadMixedProblem();
            }
            updateProgress();
        }, 1000);
    } else {
        feedback.textContent = `Try again! The answer should be "${currentMixed.answer}"`;
        feedback.style.color = 'red';
        streak = 0;
        updateProgress();
    }
}

// Initialize
loadOneStepProblem();
loadTwoStepProblem();
loadMultiStepProblem();
loadMixedProblem();
updateProgress();
