let currentLevel = 1;
let oneStepCorrect = 0;
let twoStepCorrect = 0;
let multiStepCorrect = 0;
let mixedCorrect = 0;
let streak = 0;
const streakThreshold = 5;
let activeStage = 'one-step';
let currentUser = null;

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
            { eq: "4x-3=7x+9", step1: "3x+9=-3", step2: "3x=-12", step3: "x=-4", hint1: "Subtract 4x from both sides.", hint2: "Subtract 9 from both sides.", hint3: "Divide both sides by 3." },
            { eq: "5x+1=2x-8", step1: "3x+1=-8", step2: "3x=-9", step3: "x=-3", hint1: "Subtract 2x from both sides.", hint2: "Subtract 1 from both sides.", hint3: "Divide both sides by 3." },
            { eq: "6x-4=3x-10", step1: "3x-4=-10", step2: "3x=-6", step3: "x=-2", hint1: "Subtract 3x from both sides.", hint2: "Add 4 to both sides.", hint3: "Divide both sides by 3." },
            { eq: "7x-2=4x-11", step1: "3x-2=-11", step2: "3x=-9", step3: "x=-3", hint1: "Subtract 4x from both sides.", hint2: "Add 2 to both sides.", hint3: "Divide both sides by 3." },
            { eq: "5x-6=2x-15", step1: "3x-6=-15", step2: "3x=-9", step3: "x=-3", hint1: "Subtract 2x from both sides.", hint2: "Add 6 to both sides.", hint3: "Divide both sides by 3." },
            { eq: "2x+5=5x-4", step1: "5=3x-4", step2: "9=3x", step3: "x=3", hint1: "Subtract 2x from both sides.", hint2: "Add 4 to both sides.", hint3: "Divide both sides by 3." },
            { eq: "3x+4=6x-5", step1: "4=3x-5", step2: "9=3x", step3: "x=3", hint1: "Subtract 3x from both sides.", hint2: "Add 5 to both sides.", hint3: "Divide both sides by 3." },
            { eq: "4x+2=7x-7", step1: "2=3x-7", step2: "9=3x", step3: "x=3", hint1: "Subtract 4x from both sides.", hint2: "Add 7 to both sides.", hint3: "Divide both sides by 3." }
        ]
    }},
    { name: "3 (Fractions with Positive Answers)", problems: {
        oneStep: [
            { eq: "2/3x=4", answer: "x=6", hint: "Multiply by 3 and divide by 2." },
            { eq: "3/5x=6", answer: "x=10", hint: "Multiply by 5 and divide by 3." },
            { eq: "1/2x=3", answer: "x=6", hint: "Multiply by 2." },
            { eq: "4/3x=8", answer: "x=6", hint: "Multiply by 3 and divide by 4." },
            { eq: "2/5x=4", answer: "x=10", hint: "Multiply by 5 and divide by 2." },
            { eq: "3/4x=6", answer: "x=8", hint: "Multiply by 4 and divide by 3." },
            { eq: "1/3x=2", answer: "x=6", hint: "Multiply by 3." },
            { eq: "5/2x=10", answer: "x=4", hint: "Multiply by 2 and divide by 5." },
            { eq: "2/7x=4", answer: "x=14", hint: "Multiply by 7 and divide by 2." },
            { eq: "3/2x=6", answer: "x=4", hint: "Multiply by 2 and divide by 3." }
        ],
        twoStep: [
            { eq: "2/3x+2=6", step1: "2/3x=4", step2: "x=6", hint1: "Subtract 2 from both sides.", hint2: "Multiply by 3 and divide by 2." },
            { eq: "3/5x-1=5", step1: "3/5x=6", step2: "x=10", hint1: "Add 1 to both sides.", hint2: "Multiply by 5 and divide by 3." },
            { eq: "1/2x+1=4", step1: "1/2x=3", step2: "x=6", hint1: "Subtract 1 from both sides.", hint2: "Multiply by 2." },
            { eq: "4/3x-2=6", step1: "4/3x=8", step2: "x=6", hint1: "Add 2 to both sides.", hint2: "Multiply by 3 and divide by 4." },
            { eq: "2/5x+2=6", step1: "2/5x=4", step2: "x=10", hint1: "Subtract 2 from both sides.", hint2: "Multiply by 5 and divide by 2." },
            { eq: "3/4x-3=3", step1: "3/4x=6", step2: "x=8", hint1: "Add 3 to both sides.", hint2: "Multiply by 4 and divide by 3." },
            { eq: "1/3x+1=3", step1: "1/3x=2", step2: "x=6", hint1: "Subtract 1 from both sides.", hint2: "Multiply by 3." },
            { eq: "5/2x-5=5", step1: "5/2x=10", step2: "x=4", hint1: "Add 5 to both sides.", hint2: "Multiply by 2 and divide by 5." },
            { eq: "2/7x+2=6", step1: "2/7x=4", step2: "x=14", hint1: "Subtract 2 from both sides.", hint2: "Multiply by 7 and divide by 2." },
            { eq: "3/2x-3=3", step1: "3/2x=6", step2: "x=4", hint1: "Add 3 to both sides.", hint2: "Multiply by 2 and divide by 3." }
        ],
        multiStep: [
            { eq: "2/3x+1=1/3x+2", step1: "2/3x-1/3x=2-1", step2: "1/3x=1", step3: "x=3", hint1: "Subtract 1/3x and 1 from both sides.", hint2: "Simplify: 2/3x-1/3x=1/3x, then multiply by 3." },
            { eq: "3/5x-1=2/5x+2", step1: "3/5x-2/5x=2+1", step2: "1/5x=3", step3: "x=15", hint1: "Subtract 2/5x and add 1 to both sides.", hint2: "Simplify: 3/5x-2/5x=1/5x, then multiply by 5." },
            { eq: "4/3x+2=1/3x+6", step1: "4/3x-1/3x=6-2", step2: "3/3x=4", step3: "x=4", hint1: "Subtract 1/3x and 2 from both sides.", hint2: "Simplify: 4/3x-1/3x=3/3x, then multiply by 3 and divide by 3." },
            { eq: "2/7x-1=1/7x+1", step1: "2/7x-1/7x=1+1", step2: "1/7x=2", step3: "x=14", hint1: "Subtract 1/7x and add 1 to both sides.", hint2: "Simplify: 2/7x-1/7x=1/7x, then multiply by 7." },
            { eq: "3/2x+2=1/2x+4", step1: "3/2x-1/2x=4-2", step2: "2/2x=2", step3: "x=2", hint1: "Subtract 1/2x and 2 from both sides.", hint2: "Simplify: 3/2x-1/2x=2/2x, then multiply by 2 and divide by 2." },
            { eq: "2/5x-2=1/5x-1", step1: "2/5x-1/5x=-1+2", step2: "1/5x=1", step3: "x=5", hint1: "Subtract 1/5x and add 2 to both sides.", hint2: "Simplify: 2/5x-1/5x=1/5x, then multiply by 5." },
            { eq: "5/4x+1=3/4x+2", step1: "5/4x-3/4x=2-1", step2: "2/4x=1", step3: "x=2", hint1: "Subtract 3/4x and 1 from both sides.", hint2: "Simplify: 5/4x-3/4x=2/4x, then multiply by 4 and divide by 2." },
            { eq: "3/7x-1=2/7x+1", step1: "3/7x-2/7x=1+1", step2: "1/7x=2", step3: "x=14", hint1: "Subtract 2/7x and add 1 to both sides.", hint2: "Simplify: 3/7x-2/7x=1/7x, then multiply by 7." },
            { eq: "4/5x+2=3/5x+4", step1: "4/5x-3/5x=4-2", step2: "1/5x=2", step3: "x=10", hint1: "Subtract 3/5x and 2 from both sides.", hint2: "Simplify: 4/5x-3/5x=1/5x, then multiply by 5." },
            { eq: "5/3x-2=2/3x+4", step1: "5/3x-2/3x=4+2", step2: "3/3x=6", step3: "x=6", hint1: "Subtract 2/3x and add 2 to both sides.", hint2: "Simplify: 5/3x-2/3x=3/3x, then multiply by 3 and divide by 3." }
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

function updateProgress() {
    document.getElementById('level-select').value = currentLevel;
    document.getElementById('one-step-progress').textContent = `${oneStepCorrect}/${streakThreshold}`;
    document.getElementById('two-step-progress').textContent = oneStepCorrect >= streakThreshold ? `${twoStepCorrect}/${streakThreshold}` : 'Locked';
    document.getElementById('multi-step-progress').textContent = twoStepCorrect >= streakThreshold ? `${multiStepCorrect}/${streakThreshold}` : 'Locked';
    document.getElementById('mixed-progress').textContent = multiStepCorrect >= streakThreshold ? `${mixedCorrect}/${streakThreshold}` : 'Locked';
    document.getElementById('streak').textContent = `${streak}/${streakThreshold}`;
    document.getElementById('current-user').textContent = currentUser ? `User: ${currentUser}` : 'No user selected';
    setActiveStage();
    saveUserProgress(); // Auto-save after progress updates
}

function setActiveStage() {
    document.getElementById('one-step').classList.remove('active');
    document.getElementById('two-step').classList.remove('active');
    document.getElementById('multi-step').classList.remove('active');
    document.getElementById('mixed').classList.remove('active');
    document.getElementById(activeStage).classList.add('active');
}

function resetGame() {
    currentLevel = 1;
    oneStepCorrect = 0;
    twoStepCorrect = 0;
    multiStepCorrect = 0;
    mixedCorrect = 0;
    streak = 0;
    activeStage = 'one-step';
    loadOneStepProblem();
    loadTwoStepProblem();
    loadMultiStepProblem();
    loadMixedProblem();
    updateProgress();
}

function changeLevel() {
    currentLevel = parseInt(document.getElementById('level-select').value);
    activeStage = 'one-step';
    loadOneStepProblem();
    loadTwoStepProblem();
    loadMultiStepProblem();
    loadMixedProblem();
    updateProgress();
}

function saveUserProgress() {
    if (!currentUser) return;
    const progress = { currentLevel, oneStepCorrect, twoStepCorrect, multiStepCorrect, mixedCorrect, streak, activeStage };
    localStorage.setItem(`equationHelper_${currentUser}`, JSON.stringify(progress));
    console.log(`Saved progress for ${currentUser}`);
}

function loadUserProgress() {
    if (!currentUser) return;
    const savedProgress = localStorage.getItem(`equationHelper_${currentUser}`);
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentLevel = progress.currentLevel;
        oneStepCorrect = progress.oneStepCorrect;
        twoStepCorrect = progress.twoStepCorrect;
        multiStepCorrect = progress.multiStepCorrect;
        mixedCorrect = progress.mixedCorrect;
        streak = progress.streak;
        activeStage = progress.activeStage;
        loadOneStepProblem();
        loadTwoStepProblem();
        loadMultiStepProblem();
        loadMixedProblem();
        updateProgress();
        console.log(`Loaded progress for ${currentUser}`);
    } else {
        resetGame(); // New user starts fresh
    }
}

function promptForUsername() {
    let username = localStorage.getItem('lastUser');
    if (!username) {
        username = prompt('Enter your username:');
        if (username) {
            currentUser = username.trim();
            localStorage.setItem('lastUser', currentUser);
            loadUserProgress();
        } else {
            alert('Please enter a valid username to start.');
            promptForUsername();
        }
    } else {
        currentUser = username;
        loadUserProgress();
    }
}

function switchUser() {
    localStorage.removeItem('lastUser');
    currentUser = null;
    promptForUsername();
}

function loadOneStepProblem() {
    currentOneStep = levels[currentLevel - 1].problems.oneStep[Math.floor(Math.random() * 10)];
    const eqElement = document.getElementById('one-step-eq');
    const hintElement = document.getElementById('one-step-hint');
    if (eqElement && hintElement) {
        eqElement.textContent = currentOneStep.eq;
        hintElement.textContent = currentOneStep.hint;
        document.querySelector('#one-step .left-side').textContent = currentOneStep.eq.split('=')[0];
        document.querySelector('#one-step .right-side').textContent = currentOneStep.eq.split('=')[1];
        document.getElementById('one-step-input').value = '';
        console.log('One-step loaded:', currentOneStep.eq);
    } else {
        console.error('One-step elements missing');
    }
}

function checkOneStep() {
    const input = document.getElementById('one-step-input').value.trim().toLowerCase();
    const feedback = document.getElementById('one-step-feedback');
    const validAnswers = [currentOneStep.answer.toLowerCase(), currentOneStep.answer.split('=')[1] + '=x'];
    if (validAnswers.includes(input)) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        streak++;
        oneStepCorrect++;
        if (streak >= streakThreshold) {
            activeStage = 'two-step';
            streak = 0;
        }
        setTimeout(() => {
            feedback.textContent = '';
            document.getElementById('one-step-input').value = '';
            loadOneStepProblem();
            updateProgress();
        }, 1000);
    } else {
        feedback.textContent = `Incorrect. For ${currentOneStep.eq}, ${currentOneStep.hint} = ${currentOneStep.answer}`;
        feedback.style.color = 'red';
        streak = 0;
        updateProgress();
    }
}

function loadTwoStepProblem() {
    currentTwoStep = levels[currentLevel - 1].problems.twoStep[Math.floor(Math.random() * 10)];
    const eqElement = document.getElementById('two-step-eq');
    const eq2Element = document.getElementById('two-step-eq2');
    const hint1Element = document.getElementById('two-step-hint1');
    const hint2Element = document.getElementById('two-step-hint2');
    if (eqElement && eq2Element && hint1Element && hint2Element) {
        eqElement.textContent = currentTwoStep.eq;
        eq2Element.textContent = currentTwoStep.step1;
        hint1Element.textContent = currentTwoStep.hint1;
        hint2Element.textContent = currentTwoStep.hint2;
        document.querySelector('#two-step .left-side').textContent = currentTwoStep.eq.split('=')[0];
        document.querySelector('#two-step .right-side').textContent = currentTwoStep.eq.split('=')[1];
        document.getElementById('two-step-input1').value = '';
        document.getElementById('two-step-input2').value = '';
        document.getElementById('two-step-feedback1').textContent = '';
        document.getElementById('two-step-feedback2').textContent = '';
        document.getElementById('two-step-step2').style.display = 'none';
        console.log('Two-step loaded:', currentTwoStep.eq);
    } else {
        console.error('Two-step elements missing');
    }
}

function checkTwoStep1() {
    const input = document.getElementById('two-step-input1').value.trim().toLowerCase();
    const feedback = document.getElementById('two-step-feedback1');
    console.log('Step 1 input:', input, 'Expected:', currentTwoStep.step1);
    const validStep1 = [currentTwoStep.step1.toLowerCase(), currentTwoStep.step1.split('=')[1] + '=' + currentTwoStep.step1.split('=')[0]];
    if (validStep1.includes(input)) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        document.getElementById('two-step-step2').style.display = 'block';
    } else {
        feedback.textContent = `Incorrect. For ${currentTwoStep.eq}, ${currentTwoStep.hint1} Expected: ${currentTwoStep.step1}`;
        feedback.style.color = 'red';
    }
}

function checkTwoStep2() {
    const input = document.getElementById('two-step-input2').value.trim().toLowerCase();
    const feedback = document.getElementById('two-step-feedback2');
    console.log('Step 2 input:', input, 'Expected:', currentTwoStep.step2);
    const validStep2 = [currentTwoStep.step2.toLowerCase(), currentTwoStep.step2.split('=')[1] + '=x'];
    if (validStep2.includes(input)) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        streak++;
        twoStepCorrect++;
        if (streak >= streakThreshold) {
            activeStage = 'multi-step';
            streak = 0;
        }
        setTimeout(() => {
            feedback.textContent = '';
            loadTwoStepProblem();
            updateProgress();
        }, 1000);
    } else {
        feedback.textContent = `Incorrect. For ${currentTwoStep.step1}, ${currentTwoStep.hint2} Expected: ${currentTwoStep.step2}`;
        feedback.style.color = 'red';
        streak = 0;
        updateProgress();
    }
}

function loadMultiStepProblem() {
    currentMultiStep = levels[currentLevel - 1].problems.multiStep[Math.floor(Math.random() * 10)];
    const eqElement = document.getElementById('multi-step-eq');
    const eq2Element = document.getElementById('multi-step-eq2');
    const eq3Element = document.getElementById('multi-step-eq3');
    const hint1Element = document.getElementById('multi-step-hint1');
    const hint2Element = document.getElementById('multi-step-hint2');
    const hint3Element = document.getElementById('multi-step-hint3');
    if (eqElement && eq2Element && eq3Element && hint1Element && hint2Element && hint3Element) {
        eqElement.textContent = currentMultiStep.eq;
        eq2Element.textContent = currentMultiStep.step1;
        eq3Element.textContent = currentMultiStep.step2;
        hint1Element.textContent = currentMultiStep.hint1;
        hint2Element.textContent = currentMultiStep.hint2;
        hint3Element.textContent = currentMultiStep.hint3;
        document.querySelector('#multi-step .left-side').textContent = currentMultiStep.eq.split('=')[0];
        document.querySelector('#multi-step .right-side').textContent = currentMultiStep.eq.split('=')[1];
        document.getElementById('multi-step-input1').value = '';
        document.getElementById('multi-step-input2').value = '';
        document.getElementById('multi-step-input3').value = '';
        console.log('Multi-step loaded:', currentMultiStep.eq);
    } else {
        console.error('Multi-step elements missing');
    }
}

function checkMultiStep1() {
    const input = document.getElementById('multi-step-input1').value.trim().toLowerCase();
    const feedback = document.getElementById('multi-step-feedback1');
    const validStep1 = [currentMultiStep.step1.toLowerCase(), currentMultiStep.step1.split('=')[1] + '=' + currentMultiStep.step1.split('=')[0]];
    if (validStep1.includes(input)) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        document.getElementById('multi-step-step2').style.display = 'block';
    } else {
        feedback.textContent = `Incorrect. For ${currentMultiStep.eq}, ${currentMultiStep.hint1} Expected: ${currentMultiStep.step1}`;
        feedback.style.color = 'red';
    }
}

function checkMultiStep2() {
    const input = document.getElementById('multi-step-input2').value.trim().toLowerCase();
    const feedback = document.getElementById('multi-step-feedback2');
    const validStep2 = [currentMultiStep.step2.toLowerCase(), currentMultiStep.step2.split('=')[1] + '=' + currentMultiStep.step2.split('=')[0]];
    if (validStep2.includes(input)) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        document.getElementById('multi-step-step3').style.display = 'block';
    } else {
        feedback.textContent = `Incorrect. For ${currentMultiStep.step1}, ${currentMultiStep.hint2} Expected: ${currentMultiStep.step2}`;
        feedback.style.color = 'red';
    }
}

function checkMultiStep3() {
    const input = document.getElementById('multi-step-input3').value.trim().toLowerCase();
    const feedback = document.getElementById('multi-step-feedback3');
    const validStep3 = [currentMultiStep.step3.toLowerCase(), currentMultiStep.step3.split('=')[1] + '=x'];
    if (validStep3.includes(input)) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        streak++;
        multiStepCorrect++;
        if (streak >= streakThreshold) {
            activeStage = 'mixed';
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
        feedback.textContent = `Incorrect. For ${currentMultiStep.step2}, ${currentMultiStep.hint3} Expected: ${currentMultiStep.step3}`;
        feedback.style.color = 'red';
        streak = 0;
        updateProgress();
    }
}

function loadMixedProblem() {
    currentMixed = mixedProblems[Math.floor(Math.random() * mixedProblems.length)];
    const eqElement = document.getElementById('mixed-eq');
    if (eqElement) {
        eqElement.textContent = currentMixed.eq;
        document.querySelector('#mixed .left-side').textContent = currentMixed.eq.split('=')[0];
        document.querySelector('#mixed .right-side').textContent = currentMixed.eq.split('=')[1];
        document.getElementById('mixed-input').value = '';
        console.log('Mixed loaded:', currentMixed.eq);
    } else {
        console.error('Mixed elements missing');
    }
}

function checkMixed() {
    const input = document.getElementById('mixed-input').value.trim().toLowerCase();
    const feedback = document.getElementById('mixed-feedback');
    const validAnswers = [currentMixed.answer.toLowerCase(), currentMixed.answer.split('=')[1] + '=x'];
    if (validAnswers.includes(input)) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        streak++;
        mixedCorrect++;
        if (streak >= streakThreshold && currentLevel < 4) {
            currentLevel++;
            activeStage = 'one-step';
            streak = 0;
        }
        setTimeout(() => {
            feedback.textContent = '';
            document.getElementById('mixed-input').value = '';
            loadMixedProblem();
            updateProgress();
        }, 1000);
    } else {
        feedback.textContent = `Incorrect. For ${currentMixed.eq}, Expected: ${currentMixed.answer}`;
        feedback.style.color = 'red';
        streak = 0;
        updateProgress();
    }
}

function initialize() {
    console.log('Initializing game...');
    promptForUsername();
    loadOneStepProblem();
    loadTwoStepProblem();
    loadMultiStepProblem();
    loadMixedProblem();
    updateProgress();
}

let activeInput = null;

function showKeyboard(input) {
    activeInput = input;
    document.getElementById('custom-keyboard').style.display = 'block';
}

function hideKeyboard() {
    document.getElementById('custom-keyboard').style.display = 'none';
    activeInput = null;
}

function handleKeyPress(value) {
    if (!activeInput) return;
    if (value === 'backspace') {
        activeInput.value = activeInput.value.slice(0, -1);
    } else if (value === 'enter') {
        hideKeyboard();
        if (activeStage === 'one-step') checkOneStep();
        else if (activeStage === 'two-step' && document.getElementById('two-step-step2').style.display === 'none') checkTwoStep1();
        else if (activeStage === 'two-step') checkTwoStep2();
        else if (activeStage === 'multi-step' && document.getElementById('multi-step-step2').style.display === 'none') checkMultiStep1();
        else if (activeStage === 'multi-step' && document.getElementById('multi-step-step3').style.display === 'none') checkMultiStep2();
        else if (activeStage === 'multi-step') checkMultiStep3();
        else if (activeStage === 'mixed') checkMixed();
    } else {
        activeInput.value += value;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initialize();
    document.getElementById('save-session').addEventListener('click', () => saveUserProgress());
    document.getElementById('load-session').addEventListener('click', () => loadUserProgress());
    document.getElementById('switch-user').addEventListener('click', switchUser);
    document.querySelectorAll('input[type="text"]').forEach(input => {
        input.addEventListener('click', () => showKeyboard(input));
    });
    document.addEventListener('click', (e) => {
        if (!document.getElementById('custom-keyboard').contains(e.target) && !e.target.matches('input[type="text"]')) {
            hideKeyboard();
        }
    });
    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('click', () => handleKeyPress(key.dataset.value));
    });
});
