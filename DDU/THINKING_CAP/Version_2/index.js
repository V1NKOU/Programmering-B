let btnPressed = false
let client

const ding = new Audio('./assets/ding.wav')
const endDing = new Audio('./assets/end-ding.mp3')
const ja = new Audio('./assets/ja.mp3')
const nej = new Audio('./assets/nej.mp3')
ding.volume = 0.8
endDing.volume = 0.7
ja.volume = 1
nej.volume = 1

const slotBehind = document.getElementById('slot-behind')
const slotAnswer = document.getElementById('slot-answer')
const rows = ['Ja','Nej','Ja','Nej','Ja','Nej','Ja','Nej','Ja','Nej',
              'Ja','Nej','Ja','Nej','Ja','Nej','Ja','Nej','Ja','Nej']

const doubled = rows.concat(rows).map(r => `<div class="row">${r}</div>`).join('')
slotBehind.innerHTML = doubled
slotAnswer.innerHTML = doubled

const rowHeightBehind = slotBehind.querySelector('.row').offsetHeight
const rowHeightAnswer = slotAnswer.querySelector('.row').offsetHeight

let waitTime, rowsScrolled, lastRow, rowsToPass, targetParity, step


function setup() {
    noCanvas()

    client = mqtt.connect('wss://mqtt.nextservices.dk')
    client.subscribe('cap')

    client.on('connect', () => {
        console.log("CONNECTION TO NEXTSERVICES ESTABLISHED!🤖")
        const toast = document.getElementById('toast')
        toast.classList.add('toastShown')
        toast.textContent = "CONNECTION TO NEXT SERVICES ESTABLISHED!🤖"
        setTimeout(() => toast.classList.remove('toastShown'), 3000)
    })

    client.on('message', (_, msg) => {
        if (msg.toString().includes('btnPress') && !btnPressed) {
            btnPressed = true
            startSpin()
        }
    })
}

const frames = [
    './assets/handtag1.png',
    './assets/handtag2.png',
    './assets/handtag3.png',
    './assets/handtag3.png',
    './assets/handtag3.png',
    './assets/handtag2.png',
    './assets/handtag1.png',
    './assets/handtag4.png',
]
frames.forEach(src => { new Image().src = src })

const gut = document.getElementById('gut')

function playAnimation(frameDelay = 150) {
    let i = 0
    function nextFrame() {
        gut.src = frames[i]
        i++
        if (i < frames.length) setTimeout(nextFrame, frameDelay)
    }
    nextFrame()
}

function drawAt(rowPos) {
    const totalBehind = rowHeightBehind * rows.length
    const totalAnswer = rowHeightAnswer * rows.length
    const behindPx = (rowPos * rowHeightBehind) % totalBehind
    const answerPx = (rowPos * rowHeightAnswer) % totalAnswer

    slotBehind.style.transform = `translateY(-${behindPx}px)`

    const boxHeight = slotAnswer.parentElement.offsetHeight
    const centerOffset = boxHeight / 2 - rowHeightAnswer / 2
    slotAnswer.style.transform = `translateY(${centerOffset - answerPx}px)`
}

function startSpin() {
    playAnimation()
    waitTime = 20
    rowsScrolled = 0
    lastRow = 0
    step = 0.6
    targetParity = Math.round(Math.random())
    rowsToPass = 24 + Math.round(Math.random() * 3)
    if (rowsToPass % 2 !== targetParity) rowsToPass++
    answerPick()
}

function answerPick() {
    const remaining = rowsToPass - rowsScrolled
    step = Math.max(0.03, Math.min(step, remaining))
    rowsScrolled += step
    step *= 0.978

    drawAt(rowsScrolled)

    const passed = Math.floor(rowsScrolled)
    if (passed > lastRow) {
        lastRow = passed
        ding.currentTime = 0
        ding.play()
    }

    if (rowsScrolled >= rowsToPass - 0.001) {
        drawAt(rowsToPass)
        if (client) client.publish('cap', '1')
        btnPressed = false
        endDing.currentTime = 0
        endDing.play()
        if (targetParity === 0) { ja.currentTime = 0; ja.play() }
        else { nej.currentTime = 0; nej.play() }
        //ELECTRICITY?
        document.getElementById('electricity').classList.remove('hidden')
        setTimeout( ()=> {
            document.getElementById('electricity').classList.add('hidden')
        },600)
        return
    }

    setTimeout(answerPick, waitTime)
}

startSpin() // TEMP for testing without btnPress — delete this line once MQTT is wired back in