let startTime, timerInterval;
let totalDuration = 0;
let pausedTime = 0;
let isPaused = false;

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
    const durationInput = document.getElementById('timer-duration').value;
    if (!isPaused) {
        totalDuration = parseInt(durationInput, 10);
    }

    if (isNaN(totalDuration) || totalDuration <= 0) {
        alert('Please enter a valid duration in seconds.');
        return;
    }

    if (!isPaused) {
        startTime = Date.now();
    } else {
        startTime = Date.now() - pausedTime;
        isPaused = false;
    }

    document.getElementById('start-timer').disabled = true;
    document.getElementById('pause-timer').disabled = false;
    document.getElementById('reset-timer').disabled = false;

    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const remainingTime = totalDuration - elapsedTime;

        document.getElementById('elapsed-time').textContent = formatTime(elapsedTime);
        document.getElementById('remaining-time').textContent = formatTime(Math.max(remainingTime, 0));

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            document.getElementById('remaining-time').textContent = '00:00:00';
            document.getElementById('remaining-time').classList.add('done');
            alert('Time is up!');
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    pausedTime = Date.now() - startTime;
    isPaused = true;
    document.getElementById('start-timer').disabled = false;
    document.getElementById('pause-timer').disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('elapsed-time').textContent = '00:00:00';
    document.getElementById('remaining-time').textContent = '00:00:00';
    document.getElementById('timer-duration').value = '';
    document.getElementById('start-timer').disabled = false;
    document.getElementById('pause-timer').disabled = true;
    document.getElementById('reset-timer').disabled = true;
    pausedTime = 0;
    isPaused = false;
}

document.getElementById('start-timer').addEventListener('click', startTimer);
document.getElementById('pause-timer').addEventListener('click', pauseTimer);
document.getElementById('reset-timer').addEventListener('click', resetTimer);
