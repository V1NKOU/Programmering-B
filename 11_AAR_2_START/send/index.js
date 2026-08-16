var client
const canvas = document.getElementById("draw-canvas")
const ctx = canvas.getContext("2d")
var isDragging = false
var mouseX
var mouseY
var currentCol = "rgb(0,0,0)"
var currentRad = "10"

function setup(){
    noCanvas()
    //mqtt er et objekt vi får fra mqtt biblioteket i html siden
    client = mqtt.connect('wss://mqtt.nextservices.dk')
    //MAKE TOAST!!
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


    canvas.addEventListener("mousemove", (e) => {
        mouseX = e.offsetX
        mouseY = e.offsetY
        if (isDragging) paint()
    })
    canvas.addEventListener("mousedown", (e) => {
        isDragging = true
        mouseX = e.offsetX
        mouseY = e.offsetY
        paint()
    })
    canvas.addEventListener("mouseup", () => isDragging = false)
    canvas.addEventListener("mouseleave", () => isDragging = false)

}

function paint() {
    client.publish('programmering/vink',JSON.stringify({
        x:mouseX,
        y:mouseY,
        color:currentCol,
        radius:currentRad
    }))
}
