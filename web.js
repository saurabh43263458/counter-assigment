// script.js
let count = 0;
const history = [0];
let currentStep = 0;

const counterDisplay = document.getElementById('counter');
const progressBar = document.getElementById('progress-bar');
const undoBtn = document.getElementById('undo-btn');
const redoBtn = document.getElementById('redo-btn');

document.getElementById('add-btn').addEventListener('click', () => updateCount(1));
document.getElementById('subtract-btn').addEventListener('click', () => updateCount(-1));
undoBtn.addEventListener('click', undo);
redoBtn.addEventListener('click', redo);

function updateCount(value) {
  const newCount = Math.min(Math.max(count + value, 0), 150);
  if (newCount !== count) {
    count = newCount;
    history.splice(currentStep + 1);
    history.push(count);
    currentStep++;
    updateDisplay();
  }
}

function updateDisplay() {
  counterDisplay.textContent = count;
  progressBar.style.width = `${(count / 150) * 100}%`;
  undoBtn.disabled = currentStep === 0;
  redoBtn.disabled = currentStep === history.length - 1;
}

function undo() {
  if (currentStep > 0) {
    currentStep--;
    count = history[currentStep];
    updateDisplay();
  }
}

function redo() {
  if (currentStep < history.length - 1) {
    currentStep++;
    count = history[currentStep];
    updateDisplay();
  }
}
