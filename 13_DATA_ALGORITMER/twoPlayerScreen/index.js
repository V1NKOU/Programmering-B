let chars
//MQTT reference
let client 
function setup() {
    // Hent kataloget, lyt på MQTT og opdatér fællesskærmen her.

    //GET PPL FROM WICKANDMORT
    getChars()
    client = mqtt.connect('wss://mqtt.nextservices.dk')
    client.on('connect', () => {
        showToast('Forbundet til MQTT')
        client.subscribe('karaktervalg')
    
    })
    client.on('message', (topic, ms) => {
        showToast(`Modtog Besked: ${ms.toString()}`)
    })
}

async function getChars() {
    let res

    let chars = await getJSON('https://rickandmortyapi.com/api/character')
    showChars(chars.results)

}

function showChars(chars) {
    for (let i = 0; i <chars.length; i++) {

        let card = createCard(chars[i].name,chars[i].text,chars[i].image)
        
        document.getElementById('characters').innerHTML +=card
    }
}