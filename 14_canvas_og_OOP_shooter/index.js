const glass = 100
let gravity 
let friction  
let b
let f
let p
let mousePos = {}
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
let gameRunning = false
let faces = {
  simon:  [],
  asta:   [],
  ludvig: [],
  jonk:   []
}
//firestore ref
var scoresRef = db.collection('simon-shooter-scores')


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

  let cnv = createCanvas(windowWidth, windowHeight)
  cnv.parent("canvas-container")
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
  if (!gameRunning) return
  currentHoldTime = 0
  pressStartTime = millis()
  isHeld = true
  })

  document.addEventListener("mouseup", () => {
    if (!gameRunning || !isHeld) return
      isHeld = false
      console.log("Held for", millis()-pressStartTime,"ms")
      let rotation = Math.atan2(mousePos.y - p.position.y,mousePos.x - p.position.x)
      power = constrain(currentHoldTime/30, 4, 30)
      console.log("Shot with",power, "power")
      pewSound.amp(constrain(power/10, 0.5, 1.2))
      pewSound.play()
      projectiles.push(new bullet(p.position.x, p.position.y, bulletImg, 42, power, rotation))
    

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

  document.getElementById("startBtn").addEventListener("click", startGame)
  document.getElementById("restartBtn").addEventListener("click", startGame)

  const startBtn = document.getElementById("startBtn")
  startBtn.disabled = false
  startBtn.textContent = "Start"

  loadHighScores()
}

function startGame() {
  if (!p) return
  enemies = []
  projectiles = []
  score = 0
  kills = 0
  spawnInterval = 2000
  lastSpawn = millis()
  isHeld = false
  currentHoldTime = 0
  keys = {}
  p.hp = 100
  p.vel.set(0, 0)
  p.position.set(windowWidth/2, windowHeight/2)
  document.getElementById("scoreNum").textContent = 0
  document.getElementById("timeNum").textContent = 0
  startTimer()
  shiftPage("#page2")
  gameRunning = true
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
  if (!gameRunning || !p || !bg) return
  if (p.hp <= 0) {
    gameOver()
    return
  }

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
  fill(255, 255, 255,glass)
  strokeWeight(1.5)
  stroke("white")
  //stroke((w==maxW && isHeld) ? "white" : "white")
  rect(windowWidth/2-maxW/2,35, maxW, h)

  if (isHeld ) {
    push()
    drawingContext.shadowBlur = 10
    
    if (currentHoldTime/30 < 10) {
      fill(99, 224, 126, glass)
      drawingContext.shadowColor = "#63e07e"
    } else if (currentHoldTime/30 >= 10 && currentHoldTime/30 < 20) {
      fill(44, 201, 120, glass)
      drawingContext.shadowColor = "#2cc978"
    } else if (currentHoldTime/30 >= 20 && currentHoldTime/30 < 30) {
      fill(38, 177, 144, glass)
      drawingContext.shadowColor = "#26b190"
    } else if (currentHoldTime/30 >= 30) {
      fill(3, 161, 153, glass)
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

fill(255, 255, 255, glass)
strokeWeight(1.5)
stroke("white")
rect(windowWidth/2 - hpMaxW/2, hpY, hpMaxW, h)

if (hpW > 0) {
  push()
  drawingContext.shadowBlur = 10
  drawingContext.shadowColor = "lightgreen"
  if (p.hp > 75) {
    fill(49, 134, 49, 150)
    drawingContext.shadowColor = "#318631"
  } else if (p.hp < 75 && p.hp >= 50) {
    fill(161, 185, 21, 150)
    drawingContext.shadowColor = "#a1b915"
  } else if (p.hp < 50 && p.hp >= 25) {
    fill(185, 130, 21, 150)
    drawingContext.shadowColor = "#b98215"
  } else if (p.hp < 25 && p.hp > 0){
    fill(185, 54, 21, 150)
    drawingContext.shadowColor = "#b93615"
  }
  rect(windowWidth/2 - hpW/2, hpY, hpW, h)
  pop()
} else {
  gameOver()
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

function gameOver() {
  gameRunning = false
  stopTimer()
  isHeld = false
  keys = {}
  
  document.getElementById("stat-time-num").textContent = seconds
  document.getElementById("stat-kills-num").textContent = kills
  document.getElementById("stat-score-num").textContent = score

  select('#saveBtn').removeAttribute('disabled')
  select('#saveBtn').html('save')
  select('#nameInput').value('')
  shiftPage("#page3")
  
}

function saveScore() {
  const name = select("#nameInput").value().trim()
  if (name === '') {
        select('#nameInput').attribute('placeholder', 'Write your name first!')
        return
  }
  if (score <= 0) {
    select('#nameInput').attribute('placeholder', 'Score something first!')
    return
  }
    
    scoresRef.add({ name: name, seconds: seconds, kills: kills, score: score }).then(() => {
        select('#saveBtn').attribute('disabled', true)
        select('#saveBtn').html('Saved!')
    })
}

function loadHighScores() {
  scoresRef.orderBy('score', 'desc').limit(10).onSnapshot(snap => {
    const list = select('#highscore-list')
    list.html('')

    if (snap.empty) {
      const li = createElement('li', 'No scores yet')
      li.addClass('hs-empty')
      list.child(li)
      return
    }

    let rank = 1
    snap.forEach(doc => {
      const d = doc.data()
      const li = createElement('li')

      const rankSpan = createElement('span', rank++ + '.')
      rankSpan.addClass('hs-rank')

      const nameSpan = createElement('span')
      nameSpan.addClass('hs-name')
      nameSpan.elt.textContent = d.name      // textContent, so a name can't inject HTML

      const scoreSpan = createElement('span', d.score)
      scoreSpan.addClass('hs-score')

      li.child(rankSpan)
      li.child(nameSpan)
      li.child(scoreSpan)
      list.child(li)
    })
  }, err => {
    console.error(err)
    select('#highscore-list').html('<li class="hs-empty">Could not load scores</li>')
  })
}

