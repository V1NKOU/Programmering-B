let topic = "tuffTopic"
let client
let me

function setup() {
    // Bind controllerens knapper og send handlinger over MQTT her.
    
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
            if (document.getElementById(`player${msObject.name}`)) 
                document.getElementById(`player${msObject.name}`).style.visibility = "hidden"
        }
    })
    
    document.getElementById('playerA').addEventListener('click', () => choosePlayer('A'))
    document.getElementById('playerB').addEventListener('click', () => choosePlayer('B'))
    document.getElementById('back').addEventListener('click', () => choice('back'))
    document.getElementById('forward').addEventListener('click', () => choice('forward'))
    document.getElementById('select').addEventListener('click', () => choice('select'))

/*
    while (true) {
        console.log("a")

    }
        */
}


    function choosePlayer(n) {
        me = n
        let obj =  {
            "name":n,
            "action":"choose character"
        }
        obj = JSON.stringify(obj)
        client.publish(topic, obj)
        document.getElementById('name').innerHTML = `I am ${me}`
        shiftPage('choose')
    }

    function choice(direction) {
        let obj =  {
            "name":me,
            "action":direction
        }
        obj = JSON.stringify(obj)
        client.publish(topic, obj)
    }