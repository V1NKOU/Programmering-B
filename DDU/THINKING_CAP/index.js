let waitTime
let countTo
let count
let btnPressed = false
const ding = new Audio('./assets/ding.wav')
const endDing = new Audio('./assets/end-ding.mp3')
const ja = new Audio('./assets/ja.mp3')
const nej = new Audio('./assets/nej.mp3')
ding.volume = 1
endDing.volume = 1
ja.volume = 2
nej.volume = 2


function sleep(ms) {
    return new Promise(r => setTimeout(r, ms))
}

function setup() {
    noCanvas()
    client = mqtt.connect('wss://mqtt.nextservices.dk')
    client.subscribe('cap')

    client.on('connect', msg => {
        console.log(msg)
        console.log("CONNECTION TO NEXTSERVICES ESTABLISHED!🤖")
        const toast = document.getElementById('toast')
        toast.classList.add('toastShown')
        toast.textContent = "CONNECTION TO NEXT SERVICES ESTABLISHED!🤖"
        setTimeout(() => {
            toast.classList.remove('toastShown')

        }, 3000)
    })
    

    //client.publish('cap', 'btnPress')
    
    client.on('message', (_, msg) => {
        console.log('Besked Modtaget')
        if (msg.toString().includes('btnPress') && !btnPressed) {
            btnPressed = true
            waitTime = 60
            countTo = Math.round(Math.random()) + 16
            count = 0
            answerPick()
            
            /*
            let i = 0
            let countTo = Math.round(Math.random()) + 50
            answerInterval = setInterval( () => {
                i++
                waitTime*=10
                document.getElementById('answer').textContent = (i % 2) ? "Ja" : "Nej" 
                if(i >= countTo) {
                    clearInterval(answerInterval)
                    client.publish('cap', '1')
                    console.log('End of btnPress')
                    btnPressed = false
                }
            },waitTime)
            */


            /*
            requestAnimationFrame(async () => {
                for (let i=0; i<Math.round(Math.random()) + 50; i++) {
                    await sleep(1000)
                }
            })


            
            setTimeout( () => {
                client.publish('cap', '1')
                console.log('End of btnPress')
                btnPressed = false
            }, 1000)
            */
        }
    })

}




function answerPick() {
    ding.currentTime = 0
    count++
    document.getElementById('answer').textContent = (count % 2) ? "Ja" : "Nej" 
    const answer = document.getElementById('answer')
    if(count%2) {
        answer.textContent = "Ja"
        if (answer.classList.contains('nej')) answer.classList.remove('nej')
        answer.classList.add('ja')
    } else {
        answer.textContent = "Nej"
        if (answer.classList.contains('ja')) answer.classList.remove('ja')
        answer.classList.add('nej')
    }
    console.log(waitTime + " count: " + count)
    waitTime *= 1.15
    if(count >= countTo) {
        endDing.currentTime = 0
        client.publish('cap', '1')
        console.log('End of btnPress')
        btnPressed = false
        endDing.play()
        if (count%2) {
            ja.currentTime = 0
            ja.play()
        } else {
            nej.currentTime = 0
            nej.play()
        }
        return
    }
    ding.play()
    setTimeout(answerPick, waitTime)
}

