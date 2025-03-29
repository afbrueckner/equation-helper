let currentLevel = 1;
let oneStepCorrect = 0;
let twoStepCorrect = 0;
let multiStepCorrect = 0;
let mixedCorrect = 0;
let streak = 0;
const streakThreshold = 5;
let activeStage = 'one-step';
let currentUser = null;
let levels = []; // Loaded from problems.json
let mixedProblems = []; // Computed after loading levels

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
    saveUserProgress();
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

function clearAllData() {
    if (confirm("Are you sure you want to wipe all progress? This can’t be undone!")) {
        localStorage.clear();
        alert("All progress has been wiped!");
        resetGame();
        currentUser = null;
        promptForUsername();
    }
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
    updateUserList();
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
    } else {
        resetGame();
    }
}

function promptForUsername() {
    let username = localStorage.getItem('lastUser');
    if (!username) {
        username = prompt('Enter your username:');
        if (username) {
            currentUser = username.trim();
            localStorage.setItem('lastUser', currentUser);
            saveUserProgress();
            loadUserProgress();
        } else {
            alert('Please enter a valid username to start.');
            promptForUsername();
        }
    } else {
        currentUser = username;
        loadUserProgress();
    }
    updateUserList();
}

function updateUserList() {
    const userSelect = document.getElementById('user-select');
    userSelect.innerHTML = '<option value="">Select User</option>';
    const users = Object.keys(localStorage).filter(key => key.startsWith('equationHelper_')).map(key => key.replace('equationHelper_', ''));
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user;
        option.textContent = user;
        if (user === currentUser) option.selected = true;
        userSelect.appendChild(option);
    });
    const newUserOption = document.createElement('option');
    newUserOption.value = 'new';
    newUserOption.textContent = 'New User';
    userSelect.appendChild(newUserOption);
}

function switchUser() {
    const userSelect = document.getElementById('user-select');
    const selectedUser = userSelect.value;
    if (selectedUser === 'new') {
        const newUser = prompt('Enter new username:');
        if (newUser) {
            currentUser = newUser.trim();
            localStorage.setItem('lastUser', currentUser);
            resetGame();
            saveUserProgress();
        }
    } else if (selectedUser && selectedUser !== currentUser) {
        currentUser = selectedUser;
        localStorage.setItem('lastUser', currentUser);
        loadUserProgress();
    }
}

function loadOneStepProblem() {
    currentOneStep = levels[currentLevel - 1].problems.oneStep[Math.floor(Math.random() * levels[currentLevel - 1].problems.oneStep.length)];
    const eqElement = document.getElementById('one-step-eq');
    const hintElement = document.getElementById('one-step-hint');
    if (eqElement && hintElement) {
        eqElement.textContent = currentOneStep.eq;
        hintElement.textContent = currentOneStep.hint;
        document.querySelector('#one-step .left-side').textContent = currentOneStep.eq.split('=')[0];
        document.querySelector('#one-step .right-side').textContent = currentOneStep.eq.split('=')[1];
        document.getElementById('one-step-input').value = '';
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
    currentTwoStep = levels[currentLevel - 1].problems.twoStep[Math.floor(Math.random() * levels[currentLevel - 1].problems.twoStep.length)];
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
    }
}

function checkTwoStep1() {
    const input = document.getElementById('two-step-input1').value.trim().toLowerCase();
    const feedback = document.getElementById('two-step-feedback1');
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
    currentMultiStep = levels[currentLevel - 1].problems.multiStep[Math.floor(Math.random() * levels[currentLevel - 1].problems.multiStep.length)];
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

async function loadProblems() {
    try {
        const response = await fetch('problems.json');
        if (!response.ok) throw new Error('Failed to load problems.json');
        levels = await response.json();
        // Populate Level 4 (Mixed) problems
        levels[3].problems.oneStep = [...levels[0].problems.oneStep, ...levels[1].problems.oneStep, ...levels[2].problems.oneStep];
        levels[3].problems.twoStep = [...levels[0].problems.twoStep, ...levels[1].problems.twoStep, ...levels[2].problems.twoStep];
        levels[3].problems.multiStep = [...levels[0].problems.multiStep, ...levels[1].problems.multiStep, ...levels[2].problems.multiStep];
        mixedProblems = [
            ...levels[3].problems.oneStep.map(p => ({ eq: p.eq, answer: p.answer })),
            ...levels[3].problems.twoStep.map(p => ({ eq: p.eq, answer: p.step2 })),
            ...levels[3].problems.multiStep.map(p => ({ eq: p.eq, answer: p.step3 }))
        ];
    } catch (error) {
        console.error('Error loading problems:', error);
        alert('Couldn’t load problems. Please check your connection or file.');
        throw error; // Stop initialization if loading fails
    }
}

async function initialize() {
    console.log('Initializing game...');
    try {
        await loadProblems(); // Wait for problems to load
        promptForUsername();
        loadOneStepProblem();
        loadTwoStepProblem();
        loadMultiStepProblem();
        loadMixedProblem();
        updateProgress();
    } catch (error) {
        console.error('Initialization failed:', error);
    }
}

let activeInput = null;

function showKeyboard(input) {
    activeInput = input;
    const keyboard = document.getElementById('custom-keyboard');
    keyboard.style.display = 'flex';
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
    document.getElementById('user-select').addEventListener('change', switchUser);
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
