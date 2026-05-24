// ============================================
// STATE
// ============================================
var currentPage = '#start'
var seconds = 0
var itemsFound = []
var askedQuestions = []
var animationIntervals = {}
var currentFrame = {}
var timerInterval
var currentScenario
var typingInterval
var itemTimeout
var suspectsRoom
var activeInterrogant
var votedSuspect
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
    //LAVER EN UNIK NØGLE PER MISTÆNKT OG RUM
    const key = `${room}_${suspectNumber}`
    clearInterval(animationIntervals[key])
    currentFrame[key] = 1
    const img = document.getElementById(`room${room}suspect${suspectNumber}img`)
    const frames = animationer[suspectNumber][animation].frames
    const ms = animationer[suspectNumber][animation].ms
    //INTERVAL DER ÆNDRER IMG.SRC TIL NÆSTE FRAME HVERT MS-INTERVAL OG NULSTILLER TIL FRAME 1 NÅR MAX ER NÅET
    animationIntervals[key] = setInterval( () => {
        img.src = `./assets/animations/suspect${suspectNumber}${animation}/frame${currentFrame[key]}.png`
        if(currentFrame[key] < frames) {
            currentFrame[key]++
        } else {
            currentFrame[key] = 1
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

    //MOUSEENTER/MOUSELEAVE LYTTERE PÅ ALLE SUSPECTS — SKIFTER ANIMATION DYNAMISK VED HOVER
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
}

// ============================================
// CREATE ITEMS
// ============================================
function loadItems(rumNavn, containerId) {
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

function interrogate(suspectNumber) {
    shiftPage("#interrogation-room")
    activeInterrogant = document.querySelector(".interrogant")
    activeInterrogant.id = `room2suspect${suspectNumber}img`
    activeInterrogant.style.display = "flex"
    playAnimation(2, suspectNumber, "idle")
    document.getElementById("answer-container").classList.add("hidden")

    //HENT KARAKTERDATA VED AT KONVERTERE GAMECHARACTERS TIL ARRAY OG TILGÅ MED INDEKS (1-3 -> 0-2)
    const character = Object.values(gameCharacters)[suspectNumber - 1]
    const basicQuestions = character.spørgsmål.basis
    const scenarioQuestions = character.spørgsmål[currentScenario.id]
    //KOMBINER BASIS- OG SCENARIESPØRGSMÅL OG FILTRER: KUN SPØRGSMÅL HVOR GENSTAND ER FUNDET OG SPØRGSMÅLET IKKE ER STILLET FØR
    const questions = [...basicQuestions, ...scenarioQuestions].filter(sp =>
        (sp.kræver_genstand === null || itemsFound.includes(sp.kræver_genstand)) && !askedQuestions.includes(suspectNumber + sp.tekst)
    )
    //RENS CONTAINER OG GENERER EN KNAP PER TILGÆNGELIGT SPØRGSMÅL — KNAPPEN FJERNER SIG SELV VED KLIK
    document.getElementById("questionContainer").innerHTML = ""
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
            typeAnswer(questions[i].svar, suspectNumber)
            playAnimation(2, suspectNumber, "angry")

            askedQuestions.push(suspectNumber + questions[i].tekst)
            questionBtn.remove()
        }
        document.getElementById("questionContainer").appendChild(questionBtn)
    }
}

function typeAnswer(text, suspectNumber) {
    clearInterval(typingInterval)
    let t = 0
    typingInterval = setInterval(() => {
        document.getElementById("answer-text").textContent = text.slice(0, t)
        t++
        if (t > text.length) {
            playAnimation(2, suspectNumber, "idle")
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
            const d = doc.data()
            const li = createElement('li')
            li.child(createElement('span', d.name))
            li.child(createElement('span', d.seconds + ' sek'))
            select('#score-list').child(li)
        })
    })
}

function saveHighScore() {
    const name = select('#player-name').value().trim()
    if (name === '') {
        select('#player-name').attribute('placeholder', 'Skriv dit navn først!')
        return
    }
    
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

    //NULSTIL KNAPPER OG INPUTFELTER PÅ SLUTSIDEN
    select('#btn-save').removeAttribute('disabled')
    select('#btn-save').html('Gem high score')
    select('#player-name').value('')
    shiftPage('#start')
    //TRANSITIONEND VENTER PÅ AT END-SCREEN ER UDE AF SYNE FØR SAVE-SCORE VISES IGEN
    document.getElementById("end-screen").addEventListener("transitionend", (e) => {
        if (e.propertyName !== "left") return
        document.getElementById("save-score").style.display = "flex"
    }, {once: true})

}

