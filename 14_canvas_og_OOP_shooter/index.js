var gravity 
var friction  
var b
var f
let p
let mousePos = {}
let faces = {
  simon:  [],
  asta:   [],
  ludvig: [],
  jonk:   []
}
let pewSound
let bulletImg
let projectiles = []
let pressStartTime = null
let isHeld = false
let currentHoldTime = null
let power = null
let keys = {}
let enemies = []
let spawnInterval = 2000
let minSpawnInterval = 400
let lastSpawn = 2000
let score = 0
let seconds = 0
let kills = 0
let timerInterval

async function load() {
  //LOAD IMAGES
  faces.simon.push(
    await loadImage("./assets/simonFaces/1.png"),
    await loadImage("./assets/simonFaces/2.png"),
    await loadImage("./assets/simonFaces/3.png"),
    await loadImage("./assets/simonFaces/4.png"),
    await loadImage("./assets/simonFaces/5.png"),
    await loadImage("./assets/simonFaces/6.png"),
    await loadImage("./assets/simonFaces/7.png"),
    await loadImage("./assets/simonFaces/8.png"),
    await loadImage("./assets/simonFaces/9.png")
  )
  //bulletImg = await loadImage("./assets/bullet.png")
  enemyImgs = [
    await loadImage("./assets/enemies/luder.png"),
    await loadImage("./assets/enemies/asta.png"),
    await loadImage("./assets/enemies/jonk.png")
  ]
  bulletImg = await loadImage("./assets/laser.png")
  bg = await loadImage("./assets/space3.png")
  //LOAD SOUNDS
  pewSound = await loadSound("./assets/sounds/pew.mp3")
  dieSound = await loadSound("./assets/sounds/die.m4a")
  hitSound = await loadSound("./assets/sounds/hit.m4a")
  playerHitSound = await loadSound("./assets/sounds/playerHit.m4a")
}
async function setup() {

  createCanvas(windowWidth, windowHeight)
  gravity = createVector(0, 0.5)
  friction = 0.985
  await load()
  //b = new Ball(windowWidth/2, 0, "orange", 48)
  //f = new FloatingBall(100, 50, "red", 48, 10, 0)
  p = new player(windowWidth/2, windowHeight/2, faces.simon[0], 105, 112.5, 0.55)
  
  mousePos.x = windowWidth/2
  mousePos.y = windowHeight/2
  document.addEventListener("mousemove", (e) => {
    mousePos.x = e.offsetX
    mousePos.y = e.offsetY
  })

  document.addEventListener("mousedown", () => {
    currentHoldTime = 0
    pressStartTime = millis()
    isHeld = true
  })
  document.addEventListener("mouseup", () => {
    if (pressStartTime !== null) {
      isHeld = false
      console.log("Held for", millis()-pressStartTime,"ms")
      let rotation = Math.atan2(mousePos.y - p.position.y,mousePos.x - p.position.x)
      power = constrain(currentHoldTime/30, 4, 30)
      console.log("Shot with",power, "power")
      pewSound.amp(constrain(power/10, 0.5, 1.2))
      pewSound.play()
      projectiles.push(new bullet(p.position.x, p.position.y, bulletImg, 42, power, rotation))
    }

  })

  document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    keys = {}
  })
  document.addEventListener("keydown", (key) => {
    keys[key.key.toLowerCase()] = true
  })
  document.addEventListener("keyup", (key) => {
    keys[key.key.toLowerCase()] = false
  })
  window.addEventListener("blur", () => {
    keys = {}
  })

  startTimer()
}

function startTimer() {
    stopTimer()
    seconds = 0
    timerInterval = setInterval(() => {
        seconds++
        document.getElementById('timeNum').innerHTML = seconds
    }, 1000)
}

function stopTimer() {
    clearInterval(timerInterval)
}


function spawnEnemy() {
  let spawnMargin = 150
  let x
  let y
  let side = Math.floor(Math.random()*4)
  if (side==0) {x = Math.random()*windowWidth, y = -spawnMargin}
  else if (side==1) {x = windowWidth+spawnMargin, y = Math.random()*windowHeight}
  else if (side==2) {x = Math.random()*windowWidth, y = windowHeight+spawnMargin}
  else {x = -spawnMargin, y = Math.random()*windowHeight}

  enemies.push(new enemy(x, y, enemyImgs[Math.floor(Math.random()*3)], 100, 100, 2))
  
}

function draw() {
  if (!p || !bg) return
  background(bg)
  /*
  b.update()
  b.constrain()
  b.show()

  f.update()
  f.constrain()
  f.show()
  */

p.move.x = (keys["d"] ? 1 : 0) - (keys["a"] ? 1 : 0)
p.move.y = (keys["s"] ? 1 : 0) - (keys["w"] ? 1 : 0)

//HANDLE ENEMY-PLAYER AND BULLET COLLISIONS
for(let e of enemies) {
  if (p.hit(e) && millis() - e.lastHitTime > 500) {
    p.hp -= 10
    e.lastHitTime = millis()
    playerHitSound.play()
    
  }
  for (let b of projectiles) {
    if (b.hp > 0 && e.hp > 0 && b.hit(e)) {
      let dmg = Math.min(b.hp, e.hp)
      b.hp -= dmg
      e.hp -= dmg

      if (e.hp <= 0) {
        dieSound.play()
        kills++
        score += kills*seconds
        document.getElementById("scoreNum").textContent = score
      } else {
        hitSound.play()
      }

    }
  }
}

 projectiles.forEach(e => {
   e.update()
   e.show()
 })

 enemies.forEach(e => {
  e.update()
  e.show()
 })

  p.update()
  p.constrain()
  p.show()

  let maxW = 450
  let w = constrain(currentHoldTime/2, 0, maxW)
  let h = 30
  fill(255, 255, 255,70)
  strokeWeight(1.5)
  stroke("white")
  //stroke((w==maxW && isHeld) ? "white" : "white")
  rect(windowWidth/2-maxW/2,35, maxW, h)

  if (isHeld ) {
    push()
    drawingContext.shadowBlur = 10
    
    if (currentHoldTime/30 < 10) {
      fill("#63e07e")
      drawingContext.shadowColor = "#63e07e"
    } else if (currentHoldTime/30 >= 10 && currentHoldTime/30 < 20) {
      fill("#2cc978")
      drawingContext.shadowColor = "#2cc978"
    } else if (currentHoldTime/30 >= 20 && currentHoldTime/30 < 30) {
      fill("#26b190")
      drawingContext.shadowColor = "#26b190"
    } else if (currentHoldTime/30 >= 30) {
      fill("#03a199")
      drawingContext.shadowColor = "#03a199"
    }
    //fill((w==maxW) ? "#016d01" : "#318631")
    rect(windowWidth/2-w/2,35,w,h)
    pop()
  }

  // HEALTH BAR
let hpMaxW = 250
let hpW = constrain(p.hp / 100 * hpMaxW, 0, hpMaxW)   // 100 = starting hp
let hpY = 75                                           // just below the charge bar

fill(255, 255, 255, 70)
strokeWeight(1.5)
stroke("white")
rect(windowWidth/2 - hpMaxW/2, hpY, hpMaxW, h)

if (hpW > 0) {
  push()
  drawingContext.shadowBlur = 10
  drawingContext.shadowColor = "lightgreen"
  if (p.hp > 75) {
    fill("#318631")
  } else if (p.hp < 75 && p.hp >= 50) {
    fill("#a1b915")
  } else if (p.hp < 50 && p.hp > 25) {
    fill("#b98215")
  } else {
    fill("#b93615")
  }
  rect(windowWidth/2 - hpW/2, hpY, hpW, h)
  pop()
}

  if (millis() - lastSpawn > spawnInterval) {
    spawnEnemy()
    lastSpawn = millis()
    spawnInterval = Math.max(minSpawnInterval, spawnInterval * 0.975)
  }

  enemies = enemies.filter(e => e.hp > 0)
  projectiles = projectiles.filter(b => b.hp > 0 && !b.isExpired() && !b.isOffScreen())

  currentHoldTime = millis() - pressStartTime
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  p.position.x = windowWidth/2
  p.position.y = windowHeight/2
}


