var gravity 
var friction  
var b
var f 
var points = 1000
var bSound
var bgMusic

async function setup() {
  bSound = await loadSound("../api_lib/sounds/beep.mp3")
  bgMusic = new Audio('./assets/chiptune.mp3')
  bgMusic.loop = true
  bgMusic.volume = 0.25
  shiftPage('#page1')
  var c = createCanvas(windowWidth, windowHeight)
  select('#page2').child(c)
  select('#startButton').mousePressed(()=>
    {
      startGame()
      shiftPage('#page2')
    })
  select('#restartButton').mousePressed(()=>{    
    startGame()
    shiftPage('#page2')
  })
  
  gravity = createVector(0, 0.5)
  friction = 0.99

  select('#info').html(points)

  b = new Ball(windowWidth/2, 0, 160, blomkaal, 12)
  f = new FloatingBall(100, 100, 110, roedkaal, 0, 12)
  frameRate(0)
}

function startGame(){
  frameRate(60)
  points = 1000
  if (bgMusic.paused) bgMusic.play()
    startTimer(1, 12, 'top-right', ()=>{
      bgMusic.pause()
      bgMusic.currentTime = 0
      select('#stats').html(`<h1>${points} point</h1>`)
      shiftPage('#page3')
    })
}

function draw() {
  background(100, 10)
  
  b.update()
  b.constrain()
  b.show()

  if(b.hit(f)){
    points--
    bSound.play()
  }

  select('#info').html(points)

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

