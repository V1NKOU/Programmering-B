let chars = []
//MQTT reference
let client 
let topic = "tuffTopic"
//to globale variable der holder styr på de valgte karakterer
let playerAIndex = 0
let playerBIndex = 0
let locked = { A: false, B: false }
function setup() {
    // Hent kataloget, lyt på MQTT og opdatér fællesskærmen her.

    //GET PPL FROM WICKANDMORT
    getChars()
    client = mqtt.connect('wss://mqtt.nextservices.dk')
    client.on('connect', () => {
        showToast('Forbundet til MQTT')
        client.subscribe(topic)
    
    })
    client.on('message', (topic, ms) => {
        showToast(`Modtog Besked: ${ms.toString()}`)
        let msObject = JSON.parse(ms.toString())
        console.log(msObject.name)

        if(msObject.action == "choose character") {
            if (msObject.name == "A") {
                document.querySelectorAll(".card img")[0].classList.add('selectedA')
                document.getElementById(`player${msObject.name}`).classList.add('selectedA')
            } else {
                document.querySelectorAll(".card img")[0].classList.add('selectedB')
                document.getElementById(`player${msObject.name}`).classList.add('selectedB')
            }
        }
        if(msObject.action == "forward") {
            if (locked[msObject.name]) return
            //hent variablen med det rigtige index og tæl den op og læg den i i
            let i = eval(`player${msObject.name}Index`)
            if ( i >= 0 && i < chars.length-1) {
                i++
                eval(`++player${msObject.name}Index`)
            }
            
            //skift billede
            
            document.querySelector(`#player${msObject.name} img`).src = chars[i].image
            document.querySelector(`#player${msObject.name} h2`).innerHTML = chars[i].name
            document.querySelector(`#player${msObject.name} h3`).innerHTML = chars[i].species

            let selected = document.getElementById('characters').querySelector(`.selected${msObject.name}`)
            if (selected) selected.classList.remove(`selected${msObject.name}`)
            //if (document.querySelectorAll(".card img")[i].classList.contains("selectedA"))
            document.querySelectorAll(".card img")[i].classList.add(`selected${msObject.name}`)

        }
        if(msObject.action == "back") {
            if (locked[msObject.name]) return
            //hent variablen med det rigtige index og tæl den op og læg den i i
            let i = eval(`player${msObject.name}Index`)
            if ( i > 0 && i < chars.length) {
                i--
                eval(`--player${msObject.name}Index`)
            }
          
            //skift billede
            
            document.querySelector(`#player${msObject.name} img`).src = chars[i].image
            document.querySelector(`#player${msObject.name} h2`).innerHTML = chars[i].name
            document.querySelector(`#player${msObject.name} h3`).innerHTML = chars[i].species

            let selected = document.getElementById('characters').querySelector(`.selected${msObject.name}`)
            if (selected) selected.classList.remove(`selected${msObject.name}`)
            document.querySelectorAll(".card img")[i].classList.add(`selected${msObject.name}`)
        }
        if(msObject.action == "select") {
            locked[msObject.name] = true
            document.getElementById(`player${msObject.name}`).classList.add('locked')
        }

    })
}

async function getChars() {
    chars = await getJSON('https://rickandmortyapi.com/api/character')
    chars = chars.results
    document.querySelector('#playerA img').src = chars[0].image
    document.querySelector('#playerB img').src = chars[0].image
    document.querySelector('#playerA h2').innerHTML = chars[0].name
    document.querySelector('#playerB h2').innerHTML = chars[0].name
    document.querySelector('#playerA h3').innerHTML = chars[0].species
    document.querySelector('#playerB h3').innerHTML = chars[0].species
    showChars(chars)

}

function showChars(chars) {
    for (let i = 0; i <chars.length; i++) {

        let card = createCard(chars[i].name,chars[i].text,chars[i].image)
        
        document.getElementById('characters').innerHTML +=card
    }
}