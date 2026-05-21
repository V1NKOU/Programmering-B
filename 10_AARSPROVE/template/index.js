// ============================================
// STATE
// ============================================
var currentPage = '#start'
var gameState = 0
var timerInterval = null
var seconds = 0
var currentSuspect = Math.floor(Math.random()*3) + 1
// KARAKTERERNES INFORMATIONER OG SVAR (MORDER/IKKE MORDER)
const gameCharacters = {
    gilbert: {
        navn: "Gilbert",
        hilsen: "Hej du!",
        spørgsmål: {
            uskyldig: [
                {
                    tekst: "hvad laver du",
                    svar: "det gad du godt at vide hva",
                    kræver_genstand: null
                },
                {
                    tekst: "Er det dig der dræbte bro?",
                    svar: "nah bro trust",
                    kræver_genstand: null
                }
            ],   
            skyldig: [
                {
                    tekst: "hvad laver du",
                    svar: "er bare en lille submissive femboy UwU",
                    kræver_genstand: null
                },
                {
                    tekst: "Er det dig der dræbte bro?",
                    svar: "nej b",
                    kræver_genstand: null
                }
            ]   
        }
    },
    asta: {
        navn: "Asta",
        hilsen: "Yooooo",
        spørgsmål: {
            uskyldig: [
                {
                    tekst: "hvad laver du",
                    svar: "Øhh idk",
                    kræver_genstand: null
                },
                {
                    tekst: "Er det dig der dræbte bro?",
                    svar: "Nej da!",
                    kræver_genstand: null
                }
            ],   
            skyldig: [
                {
                    tekst: "hvad laver du",
                    svar: "Øhh idk (EVILLY)",
                    kræver_genstand: null
                },
                {
                    tekst: "Er det dig der dræbte bro?",
                    svar: "Ummm nejjjj",
                    kræver_genstand: null
                }
            ]   
        }
    },
    ludvig: {
        navn: "Ludvig",
        hilsen: "Har du hørt om partyboks?",
        spørgsmål: {
            uskyldig: [
                {
                    tekst: "hvad laver du",
                    svar: "er sej",
                    kræver_genstand: null
                },
                {
                    tekst: "Er det dig der dræbte bro?",
                    svar: "nah bro trust",
                    kræver_genstand: null
                }
            ],   
            skyldig: [
                {
                    tekst: "hvad laver du",
                    svar: "er ond",
                    kræver_genstand: null
                },
                {
                    tekst: "Er det dig der dræbte bro?",
                    svar: "nah bro.",
                    kræver_genstand: null
                }
            ]   
        }
    },
}

//ANIMATIONER!

const animationer = {
    1: {
        idle: { frames: 6, ms: 150 },
        angry: { frames: 6, ms: 150 },
        greeting: { frames: 7, ms: 150 }
    },
    2: {
        idle: { frames: 6, ms: 150 },
        angry: { frames: 6, ms: 120 }
    },
    3: {
        idle: { frames: 6, ms: 150 },
        angry: { frames: 6, ms: 165 },
        greeting: { frames: 9, ms: 125 }
    }
    
}
var animationIntervals = {}
var currentFrames = {}

function playAnimation(room, suspectNumber, animation) {
    //LAV EN KONSTANT DER REFERERER TIL RUMMET OG DEN MISTÆNKTE DER KALDES MED SOM ARGUMENT
    const key = `${room}_${suspectNumber}`
    //RYD DET INTERVAL DER ALLEREDE ER I GANG VED KEY'EN
    clearInterval(animationIntervals[key])
    //SÆT FRAMEN TIL 1
    currentFrames[key] = 1
    //GEM DET SPECIFIKKE BILLEDE DER SKAL GEMMES SOM EN KONSTANT
    const img = document.getElementById(`room${room}suspect${suspectNumber}img`)
    //FÅ ANTAL FRAMES OG MS FRA HVER ANIMATION
    const frames = animationer[suspectNumber][animation].frames
    const ms = animationer[suspectNumber][animation].ms
    //SÆT ET INTERVAL DER KØRES IGENNEM OG ÆNDRER BILLEDETS SOURCE
    animationIntervals[key] = setInterval( () => {
        img.src = `./assets/animations/suspect${suspectNumber}${animation}/frame${currentFrames[key]}.png`
        if(currentFrames[key] < frames) {
            currentFrames[key]++
        } else {
            currentFrames[key] = 1
        }
    }, ms)
}






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


    // ---- SLUTSIDE ----
    select('#btn-save').mousePressed(() => {
        saveHighScore()
    })

    select('#btn-restart').mousePressed(() => {
        resetGame()
    })

    //KØR ET LOOP FOR HVER SUSPECT DER SÆTTER EN EVENTLISTENER VED HOVER
    // DER ÆNDRER ANIMATIONEN DER FJERNES NÅR HOVER STOPPER
    for (let i = 1; i <= document.getElementsByClassName("suspect").length; i++) {
        
        document.getElementById(`suspect${i}`).addEventListener("mouseenter", () => {
            playAnimation(1, i, "greeting")
        })
        document.getElementById(`suspect${i}`).addEventListener("mouseleave", () => {
        playAnimation(1, i, "idle")
        })
    }

    playAnimation(2, 1, "idle")
    playAnimation(2, 2, "idle")
    playAnimation(2, 3, "idle")

}

// ============================================
// SHIFTPAGE — skifter mellem rum/sider
// ============================================
function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
    clearInterval(animationIntervals)
    for (const key in animationIntervals) {
        clearInterval(animationIntervals[key])
    }
    if (newPage == "#main-room") {
        playAnimation(1, 1, "idle")
        playAnimation(1, 2, "idle")
        playAnimation(1, 3, "idle")
    }
    

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

    function interrogate(interrogantNumber) {
        shiftPage("#interrogation-room")
        activeInterrogant = document.getElementsByClassName("interrogant")[interrogantNumber-1]
        activeInterrogant.style.display = "flex"
        playAnimation(2, interrogantNumber, "idle")

        // SÆT "KARAKTEREN" TIL AT VÆRE ET ARRAY AF OBJEKTETS VÆRDIER, 
        // OG TAG INDEKSET AF interrogantNumber (1-3) og - 1 
        const character = Object.values(gameCharacters)[interrogantNumber - 1]
        const questions = character.spørgsmål[interrogantNumber === currentSuspect ? "skyldig" : "uskyldig"]
        //TØM KASSEN FOR GAMLE KNAPPER
        document.getElementById("dialogOptContainer").innerHTML = ""
        //SKAB KNAPPER FOR HVERT SPØRGSMÅL
        for (let i = 0; i < questions.length; i++) {
        const questionBtn = document.createElement("button")
        questionBtn.classList.add("dialogOpt","greyStandardBox")
        questionBtn.textContent = questions[i].tekst
        questionBtn.onclick = () => {
            //GØR AT TEKSTEN TILFØJES TIL CONTAINEREN
            document.getElementById("answer-container").classList.remove("hidden")
            document.getElementById("answer-name").textContent = character.navn + ":"
            document.getElementById("answer-text").textContent = questions[i].svar
            playAnimation(2, interrogantNumber, "angry")
            setTimeout(() => playAnimation(2, interrogantNumber, "idle"), 3500)

        }
        document.getElementById("dialogOptContainer").appendChild(questionBtn)
        }

        

    }

    function backBtn() {
        shiftPage("#main-room")
        document.getElementById('interrogation-room').addEventListener('transitionend', () => {
            activeInterrogant.style.display = 'none'
            document.getElementById("answer-container").classList.add("hidden")
        }, {once: true}
        )
        
    }

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

