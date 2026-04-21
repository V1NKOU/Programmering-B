// ============================================
// STATE
// ============================================
var currentPage = '#start'
var gameState = 0
var timerInterval = null
var seconds = 0
var currentSuspect = Math.floor(Math.random()*4)

// Firestore reference
var scoresRef = db.collection('highscores')

// ============================================
// SETUP — kaldes én gang af p5.js
// ============================================
function setup() {
    noCanvas()
    shiftPage('#start')
    loadHighScores()

    // ---- STARTSIDE ----
    select('#btn-start').mousePressed(() => {
        startGame()
    })


    




    // ---- RUM 2: Skyer ----
    // select('#room2 #cloud1').mousePressed(() => clickCloud('cloud1'))
    // select('#room2 #cloud2').mousePressed(() => clickCloud('cloud2'))
    // select('#room2 #cloud3').mousePressed(() => clickCloud('cloud3'))

    // select('#room2 #room2-submit').mousePressed(() => {
    //     checkRoom2Answer()
    // })

    // ---- SLUTSIDE ----
    select('#btn-save').mousePressed(() => {
        saveHighScore()
    })

    select('#btn-restart').mousePressed(() => {
        resetGame()
    })
}

// ============================================
// SHIFTPAGE — skifter mellem rum/sider
// ============================================
function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}

// ============================================
// TIMER — tæller 1 op hvert sekund
// ============================================
function startTimer() {
    seconds = 0
    timerInterval = setInterval(() => {
        seconds++
        select('#timer').html(seconds + ' sek')
    }, 1000)
}

function stopTimer() {
    clearInterval(timerInterval)
}

// ============================================
// START SPIL
// ============================================
function startGame() {
    gameState = 0
    cloudStep = 0
    startTimer()
    shiftPage('#main-room')
}

// ============================================
// RUM 1: MISTÆNKTE
// ============================================
/*function hoverSuspect(suspectNumber) {
    const suspectEl = document.getElementById("suspect" + suspectNumber)
    if (suspectEl.querySelector('.suspect-options')) return

    const suspectOptions = document.createElement("div")
    suspectOptions.classList.add("suspect-options")
    const interrogateBtn = document.createElement("div")
    interrogateBtn.textContent = "Forhør"
    interrogateBtn.classList.add("suspect-option")
    const accuseBtn = document.createElement("div")
    accuseBtn.textContent = "Anklag"
    accuseBtn.classList.add("suspect-option")
    suspectOptions.appendChild(interrogateBtn)
    suspectOptions.appendChild(accuseBtn)
    suspectEl.appendChild(suspectOptions)
    suspectEl.addEventListener('mouseleave', () => suspectOptions.remove(), { once: true })
}*/

    function confirmGuess(suspectNumber) {
        if(confirm("Er du sikker? Når du anklager personen kan du ikke gå tilbage. Sørg for at have fundet beviser først!")) {
            shiftPage("#end-screen")
            stopTimer()
            if(suspectNumber == currentSuspect) {
                document.getElementById("end-title").textContent = "Du fandt morderen!"
                document.getElementById("end-screen").style.backgroundImage = "url('assets/winscreen.jpg')"
            } else {
                document.getElementById("end-title").textContent = "Du gættede forkert."
                document.getElementById("end-screen").style.backgroundImage = "url('assets/fnafLose.jpg')"
                document.getElementById("save-score").style.display = "none"
            }
        }
    }

// ============================================
// RUM 2: GERNINGSSCENE
// ============================================



// ============================================
// HIGH SCORE (Firestore)
// ============================================
function loadHighScores() {
    scoresRef.orderBy('seconds', 'asc').limit(10).onSnapshot(snap => {
        select('#score-list').html('')
        snap.forEach(doc => {
            var d = doc.data()
            var li = createElement('li')
            li.child(createElement('span', d.name))
            li.child(createElement('span', d.seconds + ' sek'))
            select('#score-list').child(li)
        })
    })
}

function saveHighScore() {
    var name = select('#player-name').value().trim()
    if (name === '') {
        select('#player-name').attribute('placeholder', 'Skriv dit navn først!')
        return
    }
    console.log('Du trykkede Gem! Navn:', name, '— Tid:', seconds, 'sek')
    

    
    scoresRef.add({ name: name, seconds: seconds }).then(() => {
        select('#btn-save').attribute('disabled', true)
        select('#btn-save').html('Gemt!')
    })
}

// ============================================
// RESET
// ============================================
function resetGame() {
    select('#timer').html('0 sek')

    // Nulstil slutside
    select('#btn-save').removeAttribute('disabled')
    select('#btn-save').html('Gem high score')
    select('#player-name').value('')
    shiftPage('#start')
    // Sæt en eventlistener på slutningen af end-screen transitionen, og vis først save-score der.
    document.getElementById("end-screen").addEventListener("transitionend", (e) => {
        // FJERN HVIS IKKE ET PROBLEM: if (e.propertyName !== "left") return
        document.getElementById("save-score").style.display = "flex"
    }, {once: true})

}
