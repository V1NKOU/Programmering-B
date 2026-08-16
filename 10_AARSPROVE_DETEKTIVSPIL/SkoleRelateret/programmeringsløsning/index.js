var clickAmount = 0
var Gamestarted = false
var timeLeft
var timerInterval

function setup() {
    var startBtn = document.getElementById("startBtn")
    var clickBtn = document.getElementById("clickBtn")
    startBtn.addEventListener("click", () => {
        startBtn.style.display = "none"
        clickBtn.style.display = "flex"
        Gamestarted = true
        startTimer()
    })
    clickBtn.addEventListener("click", () => {
        if (Gamestarted == true) {
            clickAmount ++
            document.getElementById("clicks").textContent = `Score: ${clickAmount} klik`
        }
    })
}

function startTimer() {
    stopTimer()
    timeLeft = 10
    document.getElementById("timer").textContent = `Tid tilbage: ${timeLeft} sekunder`
    document.getElementById("title").style.display = "none"
    document.getElementById("description").style.display = "none"
    timerInterval = setInterval(() => {
        timeLeft--
        document.getElementById("timer").textContent = `Tid tilbage: ${timeLeft} sekunder`

        if (timeLeft == 0) {
            Gamestarted = false
            stopTimer()
            document.getElementById("clicks").style.display = "none"
            document.getElementById("timer").style.display = "none"
            document.getElementById("finalScore").style.display = "flex"
            document.getElementById("finalScore").textContent = `Godt gået! Du klikkede ${clickAmount} gange`
            clickBtn.style.display = "none"
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(timerInterval)
}