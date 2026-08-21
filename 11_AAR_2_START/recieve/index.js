var client
var elements = []
const canvas = document.getElementById("draw-canvas")
const ctx = canvas.getContext("2d")

function setup(){
    noCanvas()
    //mqtt er et objekt vi får fra mqtt biblioteket i html siden
    client = mqtt.connect('wss://mqtt.nextservices.dk')

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

    client.on('message', (topic, msg) => {
        const element = JSON.parse(msg.toString())
        elements.push(element)
    })
    
    
    client.subscribe('programmering')
    //client.subscribe('programmering/page')
    client.subscribe('programmering/vink')
    
    /*
    client.on('message', (topic, msg) => {
        console.log(topic,msg)
        msg = msg.toString()
        if (topic == 'programmering/page') {
            msg = 'page' + msg
            shiftPage(msg)
            return
            
        }
    })
    */
   
}

var currentPage = "page1"
function shiftPage(newPage) {
    if(!document.getElementById(newPage)) return
    document.getElementById(currentPage).classList.remove('show')
    currentPage = newPage
    document.getElementById(currentPage).classList.add('show')
}

requestAnimationFrame(drawLoop)
function drawLoop() {
    console.log('loop tick', elements.length)
    for (let i = 0; i < elements.length; i++) {
        let el = elements[i]
        console.log('  drawing at', el.x, el.y)
        ctx.beginPath()
        ctx.arc(el.x,el.y,el.radius,0,Math.PI*2)
        ctx.fillStyle = el.color
        ctx.fill()
        ctx.closePath()
    }
    requestAnimationFrame(drawLoop)
}