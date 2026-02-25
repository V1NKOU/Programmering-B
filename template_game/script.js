//we select the gamecontainer......
var game_container = document.querySelector('#game-container')
var points_display = document.querySelector('#points-display')
var time_display = document.querySelector('#time-display')
var timeout = 2000
var points = 0
var time_left = 10

//the function takes a asta div element as argument, and removes it from its parents container
function KillAsta(asta){
    game_container.removeChild(asta)
    points += 5
    points_display.textContent = points
    SpawnAsta()
}
function TimeoutAsta(asta){
    if (game_container.contains(asta)) {
    game_container.removeChild(asta)

    points -= 2
    points_display.textContent = points
    SpawnAsta()
    }
}
//setInterval is a javaScript function that runs a function every x milliseconds
function SpawnAsta() {
    //vi laver et img element i variablen new_asta
    var new_asta = document.createElement("img")
    //vi sætter koordinaterne til et tilfældigt tal mellem 0 og 100
    var top = Math.random() * 88
    var left = Math.random() * 92
    new_asta.style = `left: ${left}%; top: ${top}%`
    //we add a source to the new img
    new_asta.src = "./assets/asta.png"
    //we add a classname to it so we can style it
    new_asta.className = "asta"
    //we put the new img element inside the game container
    game_container.appendChild(new_asta)
    //when we click the new img element
    new_asta.addEventListener("click", ()=>KillAsta(new_asta))
    setTimeout(() =>{ TimeoutAsta(new_asta) }, timeout)
}

setInterval(() => {
    time_left -= 1
    time_display.textContent = time_left
    if (time_left == 0){
        confirm(`You got ${points} points!`)
        location.reload()
    }
}, 1000)

time_display.textContent = time_left
points_display.textContent = points

SpawnAsta()

