// ============================================
// STATE
// ============================================
var currentPage = '#start'
var gameState = 0
var timerInterval = null
var seconds = 0
var currentSuspect = Math.floor(Math.random()*3) + 1
const gameCharacters = {
       asta: {
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
            hilsen: "Eooow dig",
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
        john: {
            hilsen: "nigga",
            spørgsmål: {
                uskyldig: [
                    {
                        tekst: "hvad laver du",
                        svar: "aurafarmer.",
                        kræver_genstand: null
                    },
                    {
                        tekst: "Er det dig der dræbte bro?",
                        svar: "nuh uh",
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
        questionBtn.onclick = () => console.log(questions[i].svar)
        document.getElementById("dialogOptContainer").appendChild(questionBtn)
        }

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
