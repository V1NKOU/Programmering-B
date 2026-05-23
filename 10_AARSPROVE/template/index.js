// ============================================
// STATE
// ============================================
var currentPage = '#start'
var timerInterval = null
var seconds = 0
var itemsFound = []
var askedQuestions = []
var currentScenario = null
var animationIntervals = {}
var currentFrames = {}
var typingInterval = null
var itemTimeout = null
var suspectsRoom = {}
// Firestore reference
var scoresRef = db.collection('highscores')


// ============================================
// ANIMATIONER
// ============================================

const animationer = {
    1: {
        idle: { frames: 6, ms: 150 },
        angry: { frames: 6, ms: 150 },
        greeting: { frames: 7, ms: 150 }
    },
    2: {
        idle: { frames: 6, ms: 150 },
        angry: { frames: 6, ms: 120 },
        greeting: { frames: 5, ms: 180 }
    },
    3: {
        idle: { frames: 6, ms: 150 },
        angry: { frames: 6, ms: 150 },
        greeting: { frames: 9, ms: 125 }
    }
    
}


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


}

// ============================================
// SHIFTPAGE — skifter mellem rum/sider
// ============================================
function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
    document.getElementById("item-container").classList.add("hidden")
    clearInterval(animationIntervals)
    for (const key in animationIntervals) {
        clearInterval(animationIntervals[key])
    }
    if (newPage == "#main-room") {
        playAnimation(1, 1, "idle")
        playAnimation(1, 2, "idle")
        playAnimation(1, 3, "idle")
    }
    if (newPage == "#crime-scene") {
        document.getElementById("crime-scene-container").innerHTML = ""
        loadItems("parkeringsplads", "crime-scene-container")
    }
    if (newPage == "#suspect-room") {
        document.getElementById("suspect-room-container").innerHTML = ""
        loadItems(suspectsRoom, "suspect-room-container")
    }

    

}

// ============================================
// TIMER — tæller 1 op hvert sekund
// ============================================
function startTimer() {
    stopTimer()
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
    itemsFound = []
    askedQuestions = []
    suspectsRoom = null
    clearInterval(typingInterval)
    clearTimeout(itemTimeout)
    currentScenario = gameScenarios[Math.floor(Math.random()*gameScenarios.length)]
    startTimer()
    shiftPage('#main-room')
    console.log(currentScenario.morder)
}

// ============================================
// CREATE ITEMS
// ============================================
function loadItems(rumNavn, containerId) {
    document.getElementById("item-container").classList.add("hidden")
    const items = currentScenario.genstande[rumNavn]
    const container = document.getElementById(containerId)
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const img = document.createElement("img")
        img.src = `./assets/items/${item.id}.png`
        img.style.position = "absolute"
        img.style.top = item.top
        img.style.left = item.left
        img.style.width = item.størrelse
        img.style.zIndex = "1"
        img.onclick = () => {
            if (!itemsFound.includes(item.id)) itemsFound.push(item.id)
            document.getElementById("item-name").textContent = item.navn
            document.getElementById("item-description").textContent = item.beskrivelse
            document.getElementById("item-container").classList.remove("hidden")
            clearTimeout(itemTimeout)
            itemTimeout = setTimeout(() => {
                document.getElementById("item-container").classList.add("hidden")
            }, 5000)
        }
        container.appendChild(img)
    }
}





// ============================================
// MISTÆNKTE
// ============================================

    function confirmGuess(suspectNumber) {
        if(confirm("Er du sikker? Når du anklager personen kan du ikke gå tilbage. Sørg for at have fundet beviser først!")) {
            votedSuspect = document.querySelector(".votedSuspect")
            votedSuspect.id = `room3suspect${suspectNumber}img`
            votedSuspect.style.display = "flex"
            votedSuspect.src = `./assets/animations/suspect${suspectNumber}angry/frame1.png`
            shiftPage("#end-screen")
            playAnimation(3, suspectNumber, "angry")
            stopTimer()
            if(suspectNumber == currentScenario.morder) {
                document.getElementById("save-score").style.display = "grid"
                document.getElementById("final-time").textContent = `Endelig tid: ${seconds} sekunder`
                document.getElementById("end-title").textContent = "Du fandt morderen!"
                document.getElementById("end-title").style.textShadow = "0px 0px 10px green"
            } else {
                document.getElementById("end-title").textContent = "Du gættede forkert."
                document.getElementById("end-title").style.textShadow = "0px 0px 10px red"
                document.getElementById("save-score").style.display = "none"
            }
        }
    }

// ============================================
// FORHØRINGSRUM
// ============================================

    function interrogate(interrogantNumber) {
        shiftPage("#interrogation-room")
        activeInterrogant = document.querySelector(".interrogant")
        activeInterrogant.id = `room2suspect${interrogantNumber}img`
        activeInterrogant.style.display = "flex"
        playAnimation(2, interrogantNumber, "idle")
        document.getElementById("answer-container").classList.add("hidden")

        // SÆT "KARAKTEREN" TIL AT VÆRE ET ARRAY AF OBJEKTETS VÆRDIER, 
        // OG TAG INDEKSET AF interrogantNumber (1-3) og - 1 
        const character = Object.values(gameCharacters)[interrogantNumber - 1]
        const basicQuestions = character.spørgsmål.basis
        const scenarioQuestions = character.spørgsmål[currentScenario.id]
        //SAML BEGGE LISTER AF SPØRGSMÅLS INDHOLD I ET NYT ARRAY MED ...
        const questions = [...basicQuestions, ...scenarioQuestions].filter(sp => 
            (sp.kræver_genstand === null || itemsFound.includes(sp.kræver_genstand)) && !askedQuestions.includes(interrogantNumber + sp.tekst)
        )
        //TØM KASSEN FOR GAMLE KNAPPER
        document.getElementById("dialogOptContainer").innerHTML = ""
        //SKAB KNAPPER FOR HVERT SPØRGSMÅL
        for (let i = 0; i < questions.length; i++) {
            const questionBtn = document.createElement("button")
            questionBtn.classList.add("dialogOpt","greyStandardBox")
            questionBtn.textContent = questions[i].tekst
            questionBtn.onclick = () => {
                document.getElementById("answer-name").textContent = character.navn + ":"
                document.getElementById("answer-text").textContent = ""
                document.getElementById("answer-container").style.boxShadow = `0px 0px 5px ${character.farve}`
                document.getElementById("answer-name").style.color = character.farve
                document.getElementById("answer-container").classList.remove("hidden")
                typeAnswer(questions[i].svar, interrogantNumber)
                playAnimation(2, interrogantNumber, "angry")

                askedQuestions.push(interrogantNumber + questions[i].tekst)
                questionBtn.remove()
            }
            document.getElementById("dialogOptContainer").appendChild(questionBtn)
        }
        console.log(questions)
    }

    function typeAnswer(text, interrogantNumber) {
        clearInterval(typingInterval)
        var c = 0
        typingInterval = setInterval(() => {
            document.getElementById("answer-text").textContent = text.slice(0, c)
            c++
            if (c > text.length) {
                playAnimation(2, interrogantNumber, "idle")
                clearInterval(typingInterval)
            }
        }, 50)  
    }

// ============================================
// DE MISTÆNKTES RUM
// ============================================

function enterRoom(suspectNumber) {
    suspectsRoom = Object.keys(currentScenario.genstande)[suspectNumber]
    document.getElementById("suspect-room").style.backgroundImage = `url('./assets/suspect${suspectNumber}roomBg.png')`
    shiftPage("#suspect-room")
}



    function backBtn() {
        shiftPage("#main-room")
        document.getElementById('interrogation-room').addEventListener('transitionend', (e) => {
            if (e.propertyName !== "left") return
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
        // FJERN HVIS IKKE ET PROBLEM: 
        if (e.propertyName !== "left") return
        document.getElementById("save-score").style.display = "flex"
    }, {once: true})

}

