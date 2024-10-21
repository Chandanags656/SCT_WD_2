let minutes = 0, seconds = 0, milliseconds = 0, interval;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function startStop() {
    if (isRunning) {
        clearInterval(interval);
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = '#28a745';
    } else {
        interval = setInterval(startTimer, 10);
        startStopBtn.textContent = 'Pause';
        startStopBtn.style.backgroundColor = '#ffc107';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(interval);
    isRunning = false;
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#28a745';
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    lapsList.innerHTML = ''; 
}

function lap() {
    if (isRunning) {
        const lapTime = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "✖";
        deleteBtn.style.border = "none";
        deleteBtn.style.background = "transparent";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.style.color = "#dc3545";
        deleteBtn.addEventListener('click', () => {
            lapsList.removeChild(lapItem);
        });
        
        lapItem.appendChild(deleteBtn);
        lapsList.appendChild(lapItem);
    }
}

function startTimer() {
    milliseconds++;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    updateDisplay();
}

function updateDisplay() {
    minutesDisplay.textContent = pad(minutes);
    secondsDisplay.textContent = pad(seconds);
    millisecondsDisplay.textContent = pad(milliseconds);
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}
