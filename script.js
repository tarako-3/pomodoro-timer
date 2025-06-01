class PomodoroTimer {
    constructor() {
        this.isRunning = false;
        this.isBreak = false;
        this.interval = null;
        this.workTime = 25 * 60; // 25分
        this.breakTime = 5 * 60; // 5分
        this.remainingTime = this.workTime;
        
        this.timerDisplay = document.getElementById('timer-display');
        this.startBtn = document.getElementById('start-btn');
        this.stopBtn = document.getElementById('stop-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.workTimeInput = document.getElementById('work-time');
        this.breakTimeInput = document.getElementById('break-time');

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.workTimeInput.addEventListener('change', () => this.updateWorkTime());
        this.breakTimeInput.addEventListener('change', () => this.updateBreakTime());
    }

    updateWorkTime() {
        this.workTime = parseInt(this.workTimeInput.value) * 60;
        if (!this.isRunning) {
            this.remainingTime = this.workTime;
            this.updateDisplay();
        }
    }

    updateBreakTime() {
        this.breakTime = parseInt(this.breakTimeInput.value) * 60;
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.interval = setInterval(() => this.tick(), 1000);
        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;
        this.resetBtn.disabled = false;
    }

    stop() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        clearInterval(this.interval);
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
    }

    reset() {
        this.stop();
        this.remainingTime = this.isBreak ? this.breakTime : this.workTime;
        this.isBreak = false;
        this.updateDisplay();
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.resetBtn.disabled = true;
    }

    tick() {
        if (this.remainingTime <= 0) {
            this.isBreak = !this.isBreak;
            this.remainingTime = this.isBreak ? this.breakTime : this.workTime;
            this.playSound();
        } else {
            this.remainingTime--;
        }
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    playSound() {
        const audio = new Audio('https://notificationsounds.com/notification-sounds/door-bell-1-559/download/mp3');
        audio.play();
    }
}

// インスタンスの作成
const pomodoroTimer = new PomodoroTimer();
