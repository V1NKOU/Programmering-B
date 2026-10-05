var gravity 
var friction  
var b
var f

function setup() {
  createCanvas(windowWidth, windowHeight)
  gravity = createVector(0, 0.5)
  friction = 0.99

  b = new Ball(windowWidth/2, 0, 24, "orange", 12)
  f = new FloatingBall(100, 50, 48, "red", 0, 4)
}

function draw() {
  background(100)
  b.update()
  b.constrain()
  b.show()

  f.update()
  f.constrain()
  f.show()
}

function keyPressed(){
  if(key == " "){
    b.jump()
    f.jump()
  }
}

