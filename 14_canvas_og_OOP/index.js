let x = 50
let speed = 10
let radius = 50

let gravity = 1
let friction = 0.99
let hor_x
let hor_speed
let hor_r = 20
let hor_y = 50
let hor_velo = 1
//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    var canvas = createCanvas(windowWidth, windowHeight)
    canvas.parent('page1')
    hor_x = windowWidth / 2
}
function draw() {
    frameRate(60)

    //håndter kugle 1
    fill('black')
    background(20, 200, 50)
    circle(x, 200, radius)
    x = x+speed
    if (x > windowWidth-radius/2 || x < 0+radius/2) speed = -speed

    //håndter kugle 2
    fill(200, 200, 300)
    noStroke()
    hor_velo += gravity
    hor_y += hor_velo
    hor_velo *=friction
    circle(hor_x, hor_y, hor_r)
    if (hor_y > windowHeight-hor_r/2) {
        hor_velo = -hor_velo
        hor_y = windowHeight-hor_r/2
    }

}
