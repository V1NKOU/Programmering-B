var currentPage = '#page1'
var deck
var state = "begin"
var playerCardTotal = 0
var aceCount = 0

var player = {
    cards:[],
    total:0
}

var dealer = {
    cards: [],
    total:0
}

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    console.log('P5 setup kaldt inshallah')
    
    //skift til current page 
    shiftPage(currentPage)

    getDeck()


    
    //Sæt menu op
    //Hent alle sider som et array
    var allPages = selectAll('.page')
    //Løb listen igennem en for en 
    allPages.map(
       page => {
        //Lav et nyt <a> element 
        var menuItem = createElement('a')
        //Sæt a taggets html til sidens titel
        menuItem.html(page.attribute('title'))
        //sæt eventlistener på a tagget
        menuItem.mousePressed(
            () => shiftPage('#' + page.attribute('id'))
        )
        //sæt a tagget ind i sidebaren
        select('.sidebar').child(menuItem)
       }
    )

    var drawBtn = select('#playerDrawBtn')
    drawBtn.mousePressed( () => {
        if(state=="player"){
            drawCard()    
       }
    })
    var standBtn = select('#playerStandBtn')
    standBtn.mousePressed( () => {
        state = "dealer"
        select('#value-numberP').style('text-decoration', 'underline')
        select('#value-numberP').html(playerCardTotal)
    })
    
}
//Async står for asyncronous - vi ved ikke præcis hvor længe det tager at køre funktionen  
async function getDeck(){
    try {
        //fetch kan hente data fra en server ude i byen 
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        //Repsonse objektet kommer tilbage fr serveren - og HVIS response.ok er true, kan vi hente data
        console.log("Response objektet:", response)
        if(response.ok){
            const data = await response.json()
            console.log("Data vi får tilbage: ", data)
            deck = data
            drawCard()
        }
    } catch (error){
        console.log(error)
    }
}

async function drawCard(){
    if(state == "begin"){
        var cardOne = await getOneCard()
        player.cards.push(cardOne)
        returnCardValue(cardOne)
        var cardTwo = await getOneCard()
        player.cards.push(cardTwo)
        returnCardValue(cardTwo)
        //Dealeres FØRSTE kort skal være skjult
        var dealerCardOne = await getOneCard()
        dealerCardOne.hidden = true
        dealer.cards.push(dealerCardOne)
        var dealerCardTwo = await getOneCard()
        dealer.cards.push(dealerCardTwo)
        showCards()
        state = "player"
    }else if(state == "player" && playerCardTotal < 21){
        var newCard = await getOneCard()
        player.cards.push(newCard)
        // update the player's total when a new card is drawn
        returnCardValue(newCard)
        console.log("player cards: ", player.cards)
        if(playerCardTotal >= 21 && aceCount == 0){
            state = "dealer"
            select('#value-numberP').style('text-decoration', 'underline')
        }else if(state == "player" && playerCardTotal > 21 && aceCount > 0){
        playerCardTotal -= 10
        aceCount --
        }
        showCards()
    }
}

function showCards(){
    console.log("ShowCards er klar med: ", player.cards, dealer.cards)
    select('#player .cards').html('')
    player.cards.map( (c, i) => {
        var img = createImg(c.image)
        img.style('transform', `translate(${i*40}px, ${i*40}px)`)
        select('#player .cards').child(img)
    })
    select('#dealer .cards').html('')
    dealer.cards.map( (c, i) => {
        var img
        if(c.hidden){
            img = createImg('https://deckofcardsapi.com/static/img/back.png')
        }else{
            img = createImg(c.image)
        }
        
        img.style('transform', `translate(${i*40}px, ${i*40}px)`)
        select('#dealer .cards').child(img)
    })
    if(aceCount == 0){
        select('#value-numberP').html(playerCardTotal)
    }else if(aceCount > 0){
        select('#value-numberP').html((playerCardTotal - aceCount*10) + "/" + playerCardTotal)

    }
}

function returnCardValue(card){
    // Handle ACE specially, face cards (JACK/QUEEN/KING) as 10, and numeric cards as their numeric value
    if(card.value === "ACE"){
        playerCardTotal += 11
        aceCount ++
        return 11

    } else if(isNaN(Number(card.value))){
        // face cards (JACK, QUEEN, KING)
        playerCardTotal += 10
        return 10
    } else {
        playerCardTotal += Number(card.value)
        return Number(card.value)
    }
    if(state == "dealer" || playerCardTotal >= 21){
    state = "dealer"
    select('#value-numberP').style('text-decoration', 'underline')
    }
}

async function getOneCard(){
   //Hent et kort 
    try{
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        const data = await response.json()
        console.log("DrawCard kommer tilbage med et nyt kort:", data)
        return data.cards[0]
    } catch(error){
        console.log("Error catched", error)
    }

}


    console.log("Player card total:", playerCardTotal)

    function shiftPage(newPage){
        select(currentPage).removeClass('show')
        select(newPage).addClass('show')
        currentPage = newPage
    }

