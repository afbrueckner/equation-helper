let currentLevel = 1;
let oneStepCorrect = 0;
let twoStepCorrect = 0;
let multiStepCorrect = 0;
let mixedCorrect = 0;
let streak = 0;
const streakThreshold = 5;

const levels = [
    { name: "1 (Positive Answers)", problems: {
        oneStep: [
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
        ],
        twoStep: [
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
        ],
        multiStep: [
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
        ]
    }},
    { name: "2 (Negative Answers)", problems: {
        oneStep: [
            { eq: "x+7=4", answer: "x=-3", hint: "Subtract 7 from both sides." },
            { eq: "x-2=-5", answer: "x=-3", hint: "Add 2 to both sides." },
            { eq: "3x=-9", answer: "x=-3", hint: "Divide both sides by 3." },
            { eq: "x+10=6", answer: "x=-4", hint: "Subtract 10 from both sides." },
            { eq: "x-5=-8", answer: "x=-3", hint: "Add 5 to both sides." },
            { eq: "2x=-10", answer: "x=-5", hint: "Divide both sides by 2." },
            { eq: "x+3=-1", answer: "x=-4", hint: "Subtract 3 from both sides." },
            { eq: "x-4=-7", answer: "x=-3", hint: "Add 4 to both sides." },
            { eq: "4x=-12", answer: "x=-3", hint: "Divide both sides by 4." },
            { eq: "x+8=5", answer: "x=-3", hint: "Subtract 8 from both sides." }
        ],
        twoStep: [
            { eq: "2x+5=-1", step1: "2x=-6", step2: "x=-3", hint1: "Subtract 5 from both sides.", hint2: "Divide both sides by 2." },
            { eq: "3x-4=-10", step1: "3x=-6", step2: "x=-2", hint1: "Add 4 to both sides.", hint2: "Divide both sides by 3." },
            { eq: "5x+7=-8", step1: "5x=-15", step2: "x=-3", hint1: "Subtract 7 from both sides.", hint2: "Divide both sides by 5." },
            { eq: "4x-3=-15", step1: "4x=-12", step2: "x=-3", hint1: "Add 3 to both sides.", hint2: "Divide both sides by 4." },
            { eq: "2x+8=2", step1: "2x=-6", step2: "x=-3", hint1: "Subtract 8 from both sides.", hint2: "Divide both sides by 2." },
            { eq: "3x-5=-11", step1: "3x=-6", step2: "x=-2", hint1: "Add 5 to both sides.", hint2: "Divide both sides by 3." },
            { eq: "6x+4=-8", step1: "6x=-12", step2: "x=-2", hint1: "Subtract 4 from both sides.", hint2: "Divide both sides by 6." },
            { eq: "5x-2=-17", step1: "5x=-15", step2: "x=-3", hint1: "Add 2 to both sides.", hint2: "Divide both sides by 5." },
            { eq: "4x+6=-6", step1: "4x=-12", step2: "x=-3", hint1: "Subtract 6 from both sides.", hint2: "Divide both sides by 4." },
            { eq: "2x-7=-11", step1: "2x=-4", step2: "x=-2", hint1: "Add 7 to both sides.", hint2: "Divide both sides by 2." }
        ],
        multiStep: [
            { eq: "3x+2=x-6", step1: "2x+2=-6", step2: "2x=-8", step3: "x=-4", hint1: "Subtract x from both sides.", hint2: "Subtract 2 from both sides.", hint3: "Divide both sides by 2." },
            { eq: "4x-3=7x+9", step1: "-3=3x+9", step2: "-12=3x", step3: "x=-4", hint1: "Subtract 4x from both sides.", hint2: "Subtract 9 from both sides.", hint3: "Divide both sides by 3." },
            { eq: "5x+1=2x-8", step1: "3x+1=-8", step2: "3x=-9", step3: "x=-3", hint1: "Subtract 2x from both sides.", hint2: "Subtract 1 from both sides.", hint3: "Divide both sides by 3." },
            { eq: "6x-4=3x-10", step1: "3x-4=-10", step2: "3x=-6", step3: "x=-2", hint1: "Subtract 3x from both sides.", hint2: "Add 4 to both sides.", hint3: "Divide both sides by 3." },
            { eq: "7x-2=4x-11", step1: "3x-2=-11", step2: "3x=-9", step3: "x=-3", hint1: "Subtract 4x from both sides.", hint2: "Add 2 to both sides.", hint3: "Divide both sides by 3." },
            { eq: "5x-6=2x-15", step1: "3x-6=-15", step2: "3x=-9", step3: "x=-3", hint1: "Subtract 2x from both sides.", hint2: "Add 6 to both sides.", hint3: "Divide both sides by 3." },
            { eq: "2x+5=4x-1", step1: "5=2x-1", step2: "6=2x", step3: "x=3", hint1: "Subtract 2x from both sides.", hint2: "Add 1 to both sides.", hint3: "Divide both sides by 2." }, // Positive; replace
            { eq: "3x+4=6x-2", step1: "4=3x-2", step2: "6=3x", step3: "x=2", hint1: "Subtract 3x from both sides.", hint2: "Add 2 to both sides.", hint3: "Divide both sides by 3." }, // Positive; replace
            { eq: "4x+1=7x-5", step1: "1=3x-5", step2: "6=3x", step3: "x=2", hint1: "Subtract 4x from both sides.", hint2: "Add 5 to both sides.", hint3: "Divide both sides by 3." } // Positive; replace
        ]
    }},
    { name: "3 (Fractions with Positive Answers)", problems: {
        oneStep: [
            { eq: "1/2x=1", answer: "x=2", hint: "Multiply both sides by 2." },
            { eq: "1/3x=2", answer: "x=6", hint: "Multiply both sides by 3." },
            { eq: "1/4x=3", answer: "x=12", hint: "Multiply both sides by 4." },
            { eq: "1/5x=1", answer: "x=5", hint: "Multiply both sides by 5." },
            { eq: "1/6x=2", answer: "x=12", hint: "Multiply both sides by 6." },
            { eq: "1/2x=3", answer: "x=6", hint: "Multiply both sides by 2." },
            { eq: "1/3x=1", answer: "x=3", hint: "Multiply both sides by 3." },
            { eq: "1/4x=2", answer: "x=8", hint: "Multiply both sides by 4." },
            { eq: "1/5x=2", answer: "x=10", hint: "Multiply both sides by 5." },
            { eq: "1/6x=1", answer: "x=6", hint: "Multiply both sides by 6." }
        ],
        twoStep: [
            { eq: "1/2x+1=2", step1: "1/2x=1", step2: "x=2", hint1: "Subtract 1 from both sides.", hint2: "Multiply both sides by 2." },
            { eq: "1/3x-2=1", step1: "1/3x=3", step2: "x=9", hint1: "Add 2 to both sides.", hint2: "Multiply both sides by 3." },
            { eq: "1/4x+3=5", step1: "1/4x=2", step2: "x=8", hint1: "Subtract 3 from both sides.", hint2: "Multiply both sides by 4." },
            { eq: "1/5x-1=1", step1: "1/5x=2", step2: "x=10", hint1: "Add 1 to both sides.", hint2: "Multiply both sides by 5." },
            { eq: "1/6x+2=3", step1: "1/6x=1", step2: "x=6", hint1: "Subtract 2 from both sides.", hint2: "Multiply both sides by 6." },
            { eq: "1/2x-1=2", step1: "1/2x=3", step2: "x=6", hint1: "Add 1 to both sides.", hint2: "Multiply both sides by 2." },
            { eq: "1/3x+1=3", step1: "1/3x=2", step2: "x=6", hint1: "Subtract 1 from both sides.", hint2: "Multiply both sides by 3." },
            { eq: "1/4x-2=1", step1: "1/4x=3", step2: "x=12", hint1: "Add 2 to both sides.", hint2: "Multiply both sides by 4." },
            { eq: "1/5x+1=3", step1: "1/5x=2", step2: "x=10", hint1: "Subtract 1 from both sides.", hint2: "Multiply both sides by 5." },
            { eq: "1/6x-1=1", step1: "1/6x=2", step2: "x=12", hint1: "Add 1 to both sides.", hint2: "Multiply both sides by 6." }
        ],
        multiStep: [
            { eq: "1/2x+1=1/3x+2", step1: "1/2x-1/3x=2-1", step2: "1/6x=1", step3: "x=6", hint1: "Subtract 1/3x and 1 from both sides.", hint2: "Simplify: 1/2x-1/3x=1/6x, then multiply both sides by 6." },
            { eq: "1/3x-2=1/4x+1", step1: "1/3x-1/4x=1+2", step2: "1/12x=3", step3: "x=36", hint1: "Subtract 1/4x and add 2 to both sides.", hint2: "Simplify: 1/3x-1/4x=1/12x, then multiply both sides by 12." },
            { eq: "1/4x+3=1/5x+2", step1: "1/4x-1/5x=2-3", step2: "1/20x=-1", step3: "x=-20", hint1: "Subtract 1/5x and 3 from both sides.", hint2: "Simplify: 1/4x-1/5x=1/20x, then multiply both sides by 20." }, // Negative; replace
            { eq: "1/5x-1=1/6x+1", step1: "1/5x-1/6x=1+1", step2: "1/30x=2", step3: "x=60", hint1: "Subtract 1/6x and add 1 to both sides.", hint2: "Simplify: 1/5x-1/6x=1/30x, then multiply both sides by 30." },
            { eq: "1/6x+2=1/2x-1", step1: "1/6x-1/2x=-1-2", step2: "-1/3x=-3", step3: "x=9", hint1: "Subtract 1/2x and 2 from both sides.", hint2: "Simplify: 1/6x-1/2x=-1/3x, then multiply both sides by -3." },
            { eq: "1/2x-1=1/4x+2", step1: "1/2x-1/4x=2+1", step2: "1/4x=3", step3: "x=12", hint1: "Subtract 1/4x and add 1 to both sides.", hint2: "Simplify: 1/2x-1/4x=1/4x, then multiply both sides by 4." },
            { eq: "1/3x+1=1/5x+3", step1: "1/3x-1/5x=3-1", step2: "2/15x=2", step3: "x=15", hint1: "Subtract 1/5x and 1 from both sides.", hint2: "Simplify: 1/3x-1/5x=2/15x, then multiply both sides by 15/2." },
            { eq: "1/4x-2=1/6x+1", step1: "1/4x-1/6x=1+2", step2: "1/12x=3", step3: "x=36", hint1: "Subtract 1/6x and add 2 to both sides.", hint2: "Simplify: 1/4x-1/6x=1/12x, then multiply both sides by 12." },
            { eq: "1/5x+2=1/3x-1", step1: "1/5x-1/3x=-1-2", step2: "-2/15x=-3", step3: "x=45/2", hint1: "Subtract 1/3x and 2 from both sides.", hint2: "Simplify: 1/5x-1/3x=-2/15x, then multiply both sides by -15/2." },
            { eq: "1/6x-1=1/2x-4", step1: "1/6x-1/2x=-4+1", step2: "-1/3x=-3", step3: "x=9", hint1: "Subtract 1/2x and add 1 to both sides.", hint2: "Simplify: 1/6x-1/2x=-1/3x, then multiply both sides by -3." }
        ]
    }},
    { name: "4 (Mixed)", problems: {} }
];

levels[3].problems.oneStep = [...levels[0].problems.oneStep, ...levels[1].problems.oneStep, ...levels[2].problems.oneStep];
levels[3].problems.twoStep = [...levels[0].problems.twoStep, ...levels[1].problems.twoStep, ...levels[2].problems.twoStep];
levels[3].problems.multiStep = [...levels[0].problems.multiStep, ...levels[1].problems.multiStep, ...levels[2].problems.multiStep];
const mixedProblems = [
    ...levels[3].problems.oneStep.map(p => ({ eq: p.eq, answer: p.answer })),
    ...levels[3].problems.twoStep.map(p => ({ eq: p.eq, answer: p.step2 })),
    ...levels[3].problems.multiStep.map(p => ({ eq: p.eq, answer: p.step3 }))
];

let currentOneStep, currentTwoStep, currentMultiStep, currentMixed;

// Progress Tracker
function updateProgress() {
    document.getElementById('level-select').value = currentLevel;
    document.getElementById('one-step-progress').textContent = `${oneStepCorrect}/${streakThreshold}`;
    document.getElementById('two-step-progress').textContent = oneStepCorrect >= streakThreshold ? `${twoStepCorrect}/${streakThreshold}` : 'Locked';
    document.getElementById('multi-step-progress').textContent = twoStepCorrect >= streakThreshold ? `${multiStepCorrect}/${streakThreshold}` : 'Locked';
    document.getElementById('mixed-progress').textContent = multiStepCorrect >= streakThreshold ? `${mixedCorrect}/${streakThreshold}` : 'Locked';
    document.getElementById('streak').textContent = `${streak}/${streakThreshold}`;
}

function resetGame() {
    currentLevel = 1;
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

function changeLevel() {
    currentLevel = parseInt(document.getElementById('level-select').value);
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
    loadTwoStepProblem();
    loadMultiStepProblem();
    loadMixedProblem();
    updateProgress();
}

// One-Step Logic
function loadOneStepProblem() {
    currentOneStep = levels[currentLevel - 1].problems.oneStep[Math.floor(Math.random() * 10)];
    document.getElementById('one-step-eq').textContent = currentOneStep.eq;
    document.getElementById('one-step-hint').textContent = currentOneStep.hint;
    document.querySelector('#one-step .left-side').textContent = currentOneStep.eq.split('=')[0];
    document.querySelector('#one-step .right-side').textContent = currentOneStep.eq.split('=')[1];
}

function checkOneStep() {
    const input = document.getElementById('one-step-input').value.trim();
    const feedback = document.getElementById('one-step-feedback');
    const validAnswers = [currentOneStep.answer, currentOneStep.answer.split('=')[1] + '=x'];
    if (validAnswers.includes(input)) {
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
        const [left, right] = currentOneStep.eq.split('=');
        const op = currentOneStep.hint.includes('Subtract') ? '-' : currentOneStep.hint.includes('Add') ? '+' : currentOneStep.hint.includes('Multiply') ? '*' : '/';
        const num = currentOneStep.hint.match(/\d+\/\d+|\d+/) ? currentOneStep.hint.match(/\d+\/\d+|\d+/)[0] : '';
        feedback.textContent = `Incorrect. You entered '${input}'. For ${left}=${right}, ${currentOneStep.hint.toLowerCase()} (${op === '*' || op === '/' ? right + op + num : num + op + right}) = ${currentOneStep.answer} or ${validAnswers[1]}.`;
        feedback.style.color = 'red';
        streak = 0;
        updateProgress();
    }
}

// Two-Step Logic
function loadTwoStepProblem() {
    currentTwoStep = levels[currentLevel - 1].problems.twoStep[Math.floor(Math.random() * 10)];
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
    const validStep1 = [currentTwoStep.step1, currentTwoStep.step1.split('=')[1] + '=' + currentTwoStep.step1.split('=')[0]];
    if (validStep1.includes(input)) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        document.getElementById('two-step-step2').style.display = 'block';
    } else {
        const [left, right] = currentTwoStep.eq.split('=');
        const op = currentTwoStep.hint1.includes('Subtract') ? '-' : '+';
        const num = currentTwoStep.hint1.match(/\d+\/\d+|\d+/) ? currentTwoStep.hint1.match(/\d+\/\d+|\d+/)[0] : '';
        feedback.textContent = `Incorrect. You entered '${input}'. For ${left}=${right}, ${currentTwoStep.hint1.toLowerCase()} (${num + op + right}) = ${currentTwoStep.step1} or ${validStep1[1]}.`;
        feedback.style.color = 'red';
    }
}

function checkTwoStep2() {
    const input = document.getElementById('two-step-input2').value.trim();
    const feedback = document.getElementById('two-step-feedback2');
    const validStep2 = [currentTwoStep.step2, currentTwoStep.step2.split('=')[1] + '=x'];
    if (validStep2.includes(input)) {
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
        const [left] = currentTwoStep.step1.split('=');
        const num = currentTwoStep.hint2.match(/\d+/) ? currentTwoStep.hint2.match(/\d+/)[0] : '';
        feedback.textContent = `Incorrect. You entered '${input}'. For ${currentTwoStep.step1}, ${currentTwoStep.hint2.toLowerCase()} (${left}*${num}) = ${currentTwoStep.step2} or ${validStep2[1]}.`;
        feedback.style.color = 'red';
        streak = 0;
        updateProgress();
    }
}

// Multi-Step Logic
function loadMultiStepProblem() {
    currentMultiStep = levels[currentLevel - 1].problems.multiStep[Math.floor(Math.random() * 10)];
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
    const validStep1 = [currentMultiStep.step1, currentMultiStep.step1.split('=')[1] + '=' + currentMultiStep.step1.split('=')[0]];
    if (validStep1.includes(input)) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        document.getElementById('multi-step-step2').style.display = 'block';
    } else {
        const [left, right] = currentMultiStep.eq.split('=');
        const term = currentMultiStep.hint1.match(/\d+\/\d+x|\d+x/) ? currentMultiStep.hint1.match(/\d+\/\d+x|\d+x/)[0] : '';
        feedback.textContent = `Incorrect. You entered '${input}'. For ${left}=${right}, ${currentMultiStep.hint1.toLowerCase()} = ${currentMultiStep.step1} or ${validStep1[1]}.`;
        feedback.style.color = 'red';
    }
}

function checkMultiStep2() {
    const input = document.getElementById('multi-step-input2').value.trim();
    const feedback = document.getElementById('multi-step-feedback2');
    const validStep2 = [currentMultiStep.step2, currentMultiStep.step2.split('=')[1] + '=' + currentMultiStep.step2.split('=')[0]];
    if (validStep2.includes(input)) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        document.getElementById('multi-step-step3').style.display = 'block';
    } else {
        const [left, right] = currentMultiStep.step1.split('=');
        const num = currentMultiStep.hint2.match(/\d+\/\d+|\d+/) ? currentMultiStep.hint2.match(/\d+\/\d+|\d+/)[0] : '';
        feedback.textContent = `Incorrect. You entered '${input}'. For ${currentMultiStep.step1}, ${currentMultiStep.hint2.toLowerCase()} = ${currentMultiStep.step2} or ${validStep2[1]}.`;
        feedback.style.color = 'red';
    }
}

function checkMultiStep3() {
    const input = document.getElementById('multi-step-input3').value.trim();
    const feedback = document.getElementById('multi-step-feedback3');
    const validStep3 = [currentMultiStep.step3, currentMultiStep.step3.split('=')[1] + '=x'];
    if (validStep3.includes(input)) {
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
        const [left] = currentMultiStep.step2.split('=');
        const num = currentMultiStep.hint3.match(/\d+\/\d+|\d+/) ? currentMultiStep.hint3.match(/\d+\/\d+|\d+/)[0] : '';
        feedback.textContent = `Incorrect. You entered '${input}'. For ${currentMultiStep.step2}, ${currentMultiStep.hint3.toLowerCase()} = ${currentMultiStep.step3} or ${validStep3[1]}.`;
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
    const validAnswers = [currentMixed.answer, currentMixed.answer.split('=')[1] + '=x'];
    if (validAnswers.includes(input)) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        streak++;
        mixedCorrect++;
        if (streak >= streakThreshold && currentLevel < 4) {
            currentLevel++;
            oneStepCorrect = 0;
            twoStepCorrect = 0;
            multiStepCorrect = 0;
            mixedCorrect = 0;
            streak = 0;
            document.getElementById('mixed').classList.remove('active');
            document.getElementById('one-step').classList.add('active');
        } else if (streak >= streakThreshold && currentLevel === 4) {
            feedback.textContent = 'You’ve mastered all levels! Reset to play again.';
            streak = 0;
        }
        setTimeout(() => {
            if (streak < streakThreshold || currentLevel < 4) {
                feedback.textContent = '';
                document.getElementById('mixed-input').value = '';
                loadMixedProblem();
            }
            updateProgress();
        }, 1000);
    } else {
        feedback.textContent = `Incorrect. You entered '${input}'. The correct answer is '${currentMixed.answer}' or '${validAnswers[1]}'.`;
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
