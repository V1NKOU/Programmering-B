class Ball {
  constructor(x, y, img, diam, rotation=0){ 
    this.diam = diam
    this.img = img
    this.velocity = createVector(0, 0)
    this.position = createVector(x, y)
    this.rotation = rotation
  }
  update(){
    this.velocity.add(gravity)
    this.velocity.y *= friction 
    this.position.add(this.velocity)
  }
  constrain(){
    if(this.position.y > height - this.diam/2){
      this.position.y = height - this.diam/2
      this.velocity.y *= -1
    }
  }
  
  show(){
    if(this.img instanceof p5.Image){
      //Rotate the image
      push()
      translate(this.position.x, this.position.y)
      rotate(this.rotation)
      imageMode(CENTER)
      image(this.img, 0, 0, this.diam, this.diam)
      pop()

    } else {
      fill(this.img)
      noStroke()
      ellipse(this.position.x, this.position.y, this.diam, this.diam)
    }
  }
  hit(anotherBall){
    var b = anotherBall
    var totalR = (this.diam + b.diam || this.diam + b.height || 
      this.height + b.diam || this.height + b.height) / 2
    var d = dist(this.position.x, this.position.y, b.position.x, b.position.y)

    if(d <= totalR){
        console.log("hit"+anotherBall)
        return true
    }else{
        return false
    }
  }
}

class FloatingBall extends Ball{
    constructor(x, y, img, diam, speedX, speedY){
        //super betyder at vi overtager disse argumenter fra "super" klassen (Ball)
        super(x, y, img, diam)
        //vi overskriver velocity vektoren med en lokal der flytter sig på x aksen 
        this.velocity = createVector(speedX, speedY)
    }
    update(){
        this.position.add(this.velocity)
    }

    constrain(){
        //sørg for at floatingball bouncer på siderne
        this.position.x = constrain(this.position.x, this.diam/2, windowWidth - this.diam/2) 

        if(this.position.x <= this.diam/2 || this.position.x >= windowWidth - this.diam/2){
            this.velocity.mult(-1)
        }
    }

}

class player extends Ball {
  constructor(x, y, img, width, height, speed) {
    super(x, y, img)
    this.angle = 0
    this.height = height
    this.width = width
    this.move = createVector(0,0)
    this.vel = createVector(0,0)
    this.speed = speed
    this.hp = 100
  }
  update() {
    let difX = mousePos.x - this.position.x
    let difY = mousePos.y - this.position.y
    this.angle = Math.atan2(difY, difX)
    //console.log(this.angle)
    this.vel.x += this.move.x * this.speed
    this.vel.y += this.move.y * this.speed
    this.vel.mult(friction*0.96)
    this.position.x += this.vel.x
    this.position.y += this.vel.y

    if (this.angle < 1.125 && this.angle > 0.375 && dist(mousePos.x, mousePos.y, this.position.x, this.position.y) > 100) {
      if (faces.simon[8]) this.img = faces.simon[8]
    }
    if (this.angle < 1.875 && this.angle > 1.125 && dist(mousePos.x, mousePos.y, this.position.x, this.position.y) > 100) {
      if (faces.simon[7]) this.img = faces.simon[7]
    }
    if (this.angle < 2.625 && this.angle > 1.875 && dist(mousePos.x, mousePos.y, this.position.x, this.position.y) > 100) {
      if (faces.simon[6]) this.img = faces.simon[6]
    }
    if (this.angle < Math.PI && this.angle > 2.625 && dist(mousePos.x, mousePos.y, this.position.x, this.position.y) > 100) {
      if (faces.simon[5]) this.img = faces.simon[5]
    }
    if (this.angle < -2.625 && this.angle > -Math.PI && dist(mousePos.x, mousePos.y, this.position.x, this.position.y) > 100) {
      if (faces.simon[5]) this.img = faces.simon[5]
    }
    if (this.angle < -1.875 && this.angle > -2.625 && dist(mousePos.x, mousePos.y, this.position.x, this.position.y) > 100) {
      if (faces.simon[4]) this.img = faces.simon[4]
    }
    if (this.angle < -1.125 && this.angle > -1.875 && dist(mousePos.x, mousePos.y, this.position.x, this.position.y) > 100) {
      if (faces.simon[3]) this.img = faces.simon[3]
    }
    if (this.angle < -0.375 && this.angle > -1.125 && dist(mousePos.x, mousePos.y, this.position.x, this.position.y) > 100) {
      if (faces.simon[2]) this.img = faces.simon[2]
    }
    if (this.angle < 0.375 && this.angle > -0.375 && dist(mousePos.x, mousePos.y, this.position.x, this.position.y) > 100) {
      if (faces.simon[1]) this.img = faces.simon[1]
    }
    if (dist(mousePos.x, mousePos.y, this.position.x, this.position.y) < 75) {
      if (faces.simon[0]) this.img = faces.simon[0]
    }

  }

  show() {
    //push() saves the current drawing settings so they can be restored later by pop()
    push()
    //translate(this.position.x, this.position.y)
    //rotate(this.angle - 0.5*Math.PI)   // convert degrees -> radians here
    
    if(this.img instanceof p5.Image){
      imageMode(CENTER)
      drawingContext.shadowBlur = 30
      drawingContext.shadowColor = "white"
      image(this.img, this.position.x, this.position.y, this.width, this.height)   // draw at local origin, not this.position
    } else {
      fill(this.img)
      noStroke()
      ellipse(0, 0, this.width, this.height)
    }
    pop()
  }
  constrain() {
    
    if (this.position.x < this.width/2.5 || this.position.x > windowWidth-this.width/2.5 )
      this.vel.x *= -1
    if (this.position.y < this.height/2 || this.position.y > windowHeight-this.height/2) {
      this.vel.y *= -1
    }
    
    this.position.x = constrain(this.position.x, this.width/2.5, windowWidth-this.width/2.5)
    this.position.y = constrain(this.position.y, this.height/2, windowHeight-this.height/2)
      
  }
}

class bullet extends Ball {
  constructor(x, y, img, diam, speed, angle) {
    //THE SPEED SHOULD BE DETERMINED BY HOW LONG THE MOUSE IS HELD IN THE PROJECT JS
    super( x, y, img, diam, angle)
    this.angle = angle
    this.velocity = createVector(Math.cos(this.angle) * speed, Math.sin(this.angle) * speed)
    this.spawnTime = millis()
    this.transparency = 255
    this.maxLifeTimeMs = 3000
    this.hp = speed
  }
  update() {
    this.velocity.mult(friction)
    this.position.add(this.velocity)
    this.lifeTime = millis() - this.spawnTime
  }
  isOffScreen() {
    return (
      this.position.x < -this.diam ||
      this.position.x > width + this.diam ||
      this.position.y < -this.diam ||
      this.position.y > height + this.diam
    )
  }
  isExpired(maxLifeTimeMs=3000) {
    this.maxLifeTimeMs = maxLifeTimeMs
    return this.lifeTime > maxLifeTimeMs
  }
  show(){
    if(this.lifeTime > this.maxLifeTimeMs*0.8){
      this.transparency -= 10
    }
      //Rotate the image
      push()
      tint(255,this.transparency)
      translate(this.position.x, this.position.y)
      rotate(this.rotation)
      imageMode(CENTER)

      let aspectRatio = this.img.width / this.img.height
      let w = this.diam * aspectRatio
      let h = this.diam
      image(this.img, p.width/2, 0, w, h)
      pop()

  
  }
}

class enemy extends Ball {
  constructor(x, y, img, width, height, speed) {
    super(x,y,img)
    this.angle = 0
    this.height = height
    this.width = width
    this.speed = speed
    this.hp = 10
    this.lastHitTime = -1000
  }
  update(){
    let difX = p.position.x - this.position.x
    let difY = p.position.y - this.position.y
    this.angle = Math.atan2(difY, difX)

    this.velocity.x += difX/(difX**2+difY**2)**0.5 * this.speed *0.1
    this.velocity.y += difY/(difX**2+difY**2)**0.5 * this.speed *0.1
    this.velocity.mult(friction*0.96)
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

  }
  
  show() {
    //push() saves the current drawing settings so they can be restored later by pop()
    push()
    translate(this.position.x, this.position.y)
    rotate(this.angle)   // convert degrees -> radians here
    
    if(this.img instanceof p5.Image){
      imageMode(CENTER)
      drawingContext.shadowBlur = 30
      drawingContext.shadowColor = "red"
      image(this.img, 0, 0, this.width, this.height)   // draw at local origin, not this.position
    } else {
      fill(this.img)
      noStroke()
      ellipse(0, 0, this.width, this.height)
    }
    pop()
  }
}




/*
class Ball {
  constructor(x, y, diam, img, jump){ 
    this.diam = diam
    this.img = img
    this.velocity = createVector(0, 0)
    this.position = createVector(x, y)
    this.jumpForce = jump
  }
  update(){
    this.velocity.add(gravity)
    this.velocity.y *= friction 
    this.position.add(this.velocity)
  }
  constrain(){
    if(this.position.y > height - this.diam/2){
      this.position.y = height - this.diam/2
      this.velocity.y *= -1
    }
  }
  jump(){
    this.velocity.y -= this.jumpForce
  }
  
  show(){
    if(this.img instanceof p5.Image){
      imageMode(CENTER)
      image(this.img, this.position.x, this.position.y, this.diam, this.diam)
    } else {
      fill(this.img)
      noStroke()
      ellipse(this.position.x, this.position.y, this.diam, this.diam)
    }
  }
  hit(anotherBall){
    var b = anotherBall
    var totalR = (this.diam + b.diam) / 2
    var d = dist(this.position.x, this.position.y, b.position.x, b.position.y)

    if(d <= totalR){
        return true
    }else{
        return false
    }
  }
}

class FloatingBall extends Ball{
    constructor(x, y, diam, img, jump, speed){
        //super betyder at vi overtager disse argumenter fra "super" klassen (Ball)
        super(x, y, diam, img, jump)
        //vi overskriver velocity vektoren med en lokal der flytter sig på x aksen 
        this.velocity = createVector(speed, 0)
    }
    update(){
      this.position.add(0, random(2))
        this.position.add(this.velocity)
    }

    constrain(){
        //sørg for at floatingball bouncer på siderne
        this.position.x = constrain(this.position.x, this.diam/2, windowWidth - this.diam/2) 

        if(this.position.x <= this.diam/2 || this.position.x >= windowWidth - this.diam/2){
            this.velocity.mult(-1)
        }
    }

}
*/