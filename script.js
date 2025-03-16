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
    { eq: "2x + 5 = 11", step1: 6, step2: 3, hint1: "Subtract 5 from both sides.", eq2: "2x = 6", hint2: "Divide both sides by 2." },
    { eq: "3x - 4 = 8", step1: 12, step2: 4, hint1: "Add 4 to both sides.", eq2: "3x = 12", hint2: "Divide both sides by 3." }
];
const multiStepProblems = [
    { eq: "2x + 3 = 5x - 6", step1: 3, step2: 9, step3: 3 }
];

let currentOneStep = 0;
let currentTwoStep = 0;
let currentMultiStep = 0;

let oneStepSketch, twoStepSketch, multiStepSketch;

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
    const input = parseInt(document.getElementById('one-step-input').value);
    const feedback = document.getElementById('one-step-feedback');
    const problem = oneStepProblems[currentOneStep];
    if (input === problem.answer) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        oneStepCorrect++;
        oneStepSketch.solution = problem.answer;
        oneStepSketch.showSolution = true;
        setTimeout(() => {
            feedback.textContent = '';
            document.getElementById('one-step-input').value = '';
            oneStepSketch.showSolution = false;
            currentOneStep = (currentOneStep + 1) % oneStepProblems.length;
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

// Two-Step Logic
function loadTwoStepProblem() {
    const problem = twoStepProblems[currentTwoStep];
    document.getElementById('two-step-eq').textContent = problem.eq;
    document.getElementById('two-step-eq2').textContent = problem.eq2;
    document.getElementById('two-step-hint1').textContent = problem.hint1;
    const hint2Element = document.getElementById('two-step-hint2');
    if (hint2Element) {
        hint2Element.textContent = problem.hint2; // Set dynamic Step 2 hint
    } else {
        console.error("Element 'two-step-hint2' not found!");
    }
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
        feedback.textContent = 'Hint: Check your addition or subtraction.';
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
        twoStepSketch.solution = problem.step2;
        twoStepSketch.showSolution = true;
        setTimeout(() => {
            feedback.textContent = '';
            document.getElementById('two-step-input1').value = '';
            document.getElementById('two-step-input2').value = '';
            document.getElementById('two-step-step2').style.display = 'none';
            twoStepSketch.showSolution = false;
            currentTwoStep = (currentTwoStep + 1) % twoStepProblems.length;
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

// Multi-Step Logic
function loadMultiStepProblem() {
    const problem = multiStepProblems[currentMultiStep];
    document.getElementById('multi-step-eq').textContent = problem.eq;
    document.getElementById('multi-step-eq2').textContent = "3 = 3x - 6";
    document.getElementById('multi-step-eq3').textContent = "9 = 3x";
    document.querySelector('#multi-step .left-side').textContent = problem.eq.split('=')[0].trim();
    document.querySelector('#multi-step .right-side').textContent = problem.eq.split('=')[1].trim();
}

function checkMultiStep1() {
    const input = parseInt(document.getElementById('multi-step-input1').value);
    const feedback = document.getElementById('multi-step-feedback1');
    const problem = multiStepProblems[currentMultiStep];
    if (input === problem.step1) {
        feedback.textContent = 'Correct! Now 3 = 3x - 6';
        feedback.style.color = 'green';
        document.getElementById('multi-step-step2').style.display = 'block';
    } else {
        feedback.textContent = 'Hint: Subtract 2x from both sides to get 3 = 3x - 6.';
        feedback.style.color = 'red';
    }
}

function checkMultiStep2() {
    const input = parseInt(document.getElementById('multi-step-input2').value);
    const feedback = document.getElementById('multi-step-feedback2');
    const problem = multiStepProblems[currentMultiStep];
    if (input === problem.step2) {
        feedback.textContent = 'Correct! Now 9 = 3x';
        feedback.style.color = 'green';
        document.getElementById('multi-step-step3').style.display = 'block';
    } else {
        feedback.textContent = 'Hint: Add 6 to both sides to get 9 = 3x.';
        feedback.style.color = 'red';
    }
}

function checkMultiStep3() {
    const input = parseInt(document.getElementById('multi-step-input3').value);
    const feedback = document.getElementById('multi-step-feedback3');
    const problem = multiStepProblems[currentMultiStep];
    if (input === problem.step3) {
        feedback.textContent = 'Correct! x = 3';
        feedback.style.color = 'green';
        multiStepCorrect++;
        multiStepSketch.solution = problem.step3;
        multiStepSketch.showSolution = true;
        setTimeout(() => {
            feedback.textContent = '';
            document.getElementById('multi-step-input1').value = '';
            document.getElementById('multi-step-input2').value = '';
            document.getElementById('multi-step-input3').value = '';
            document.getElementById('multi-step-step2').style.display = 'none';
            document.getElementById('multi-step-step3').style.display = 'none';
            multiStepSketch.showSolution = false;
            currentMultiStep = (currentMultiStep + 1) % multiStepProblems.length;
            loadMultiStepProblem();
            updateProgress();
        }, 1000);
    } else {
        feedback.textContent = 'Hint: Divide both sides by 3 to get x = 3.';
        feedback.style.color = 'red';
        multiStepCorrect = 0;
        updateProgress();
    }
}

// p5.js Number Line Sketches
oneStepSketch = new p5(function(sketch) {
    sketch.solution = 0;
    sketch.showSolution = false;
    sketch.setup = function() {
        let canvas = sketch.createCanvas(400, 50);
        canvas.parent('one-step-canvas');
    };
    sketch.draw = function() {
        sketch.background(220);
        sketch.line(50, 25, 350, 25);
        for (let i = 0; i <= 10; i++) {
            let x = sketch.map(i, 0, 10, 50, 350);
            sketch.line(x, 20, x, 30);
            sketch.text(i, x - 5, 40);
        }
        if (sketch.showSolution) {
            let x = sketch.map(sketch.solution, 0, 10, 50, 350);
            sketch.fill(255, 0, 0);
            sketch.ellipse(x, 25, 10, 10);
        }
    };
});

twoStepSketch = new p5(function(sketch) {
    sketch.solution = 0;
    sketch.showSolution = false;
    sketch.setup = function() {
        let canvas = sketch.createCanvas(400, 50);
        canvas.parent('two-step-canvas');
    };
    sketch.draw = function() {
        sketch.background(220);
        sketch.line(50, 25, 350, 25);
        for (let i = 0; i <= 10; i++) {
            let x = sketch.map(i, 0, 10, 50, 350);
            sketch.line(x, 20, x, 30);
            sketch.text(i, x - 5, 40);
        }
        if (sketch.showSolution) {
            let x = sketch.map(sketch.solution, 0, 10, 50, 350);
            sketch.fill(255, 0, 0);
            sketch.ellipse(x, 25, 10, 10);
        }
    };
});

multiStepSketch = new p5(function(sketch) {
    sketch.solution = 0;
    sketch.showSolution = false;
    sketch.setup = function() {
        let canvas = sketch.createCanvas(400, 50);
        canvas.parent('multi-step-canvas');
    };
    sketch.draw = function() {
        sketch.background(220);
        sketch.line(50, 25, 350, 25);
        for (let i = 0; i <= 10; i++) {
            let x = sketch.map(i, 0, 10, 50, 350);
            sketch.line(x, 20, x, 30);
            sketch.text(i, x - 5, 40);
        }
        if (sketch.showSolution) {
            let x = sketch.map(sketch.solution, 0, 10, 50, 350);
            sketch.fill(255, 0, 0);
            sketch.ellipse(x, 25, 10, 10);
        }
    };
});

// Initialize
loadOneStepProblem();
loadTwoStepProblem();
loadMultiStepProblem();
updateProgress();
