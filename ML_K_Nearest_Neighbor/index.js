// -------------------------------------------------------------
// TRIN 1: GLOBALE VARIABLER OG INDSTILLINGER
// (Start her: Vi skal definere hvad vores program skal kunne huske)
// -------------------------------------------------------------
var table           // Her gemmer vi den rå CSV fil fra p5's loadTable
var data = []       // Her gemmer vi vores rensede data (objekter med x, y, label)
var myChart         // Her gemmer vi selve graf-objektet fra Chart.js
var uniqueLabels

// INDSTILLINGER FOR DATA
// Her kobler vi til CSV-filen, vælger hvilke kolonner i CSV'en vi vil tage
// udgangspunkt i for vores x og y akser, og hvilket label vi vil kigge på.
var filename = 'assets/penguinsList.csv'
var colX = 'Culmen Length (mm)'     // X-aksen: Variabel 1 (input)
var colY = 'Flipper Length (mm)'      // Y-aksen: Variabel 2 (input)
var colLabel = 'Species' // Facit: Hvilken gruppe hører man til?

// GUI Overskrifter (Gør det pænt for brugeren)
var mainTitle = "Penguin Predictor"
var sectionTitle1 = "1. Indtast dine tal"
var instructionText = "Angiv antal pauser og søvntimer:"
var sectionTitle2 = "2. Se Resultat i Grafen"

// Farver til vores grupper (Labels) - Chart.js bruger disse
var colorList = ['#f04037', '#2e287c', '#fab041']

// BRUG DET HER!
// preload kører EN gang før setup
function preload() {
    //CSV-filen omdannes til et "table" objekt vha p5.js
    // Filens data placeres i rækker og kolonner 
    // med første række som header (kolonnenavn)
    table = loadTable(filename, 'csv', 'header')
}

// I setup laver vi vores forberedence arbejde - vi renser dataen fra CSV'en,
// og viser den på en graf ved hjælp af chart.js.
function setup() {
    // 0. SÆT TITLER I HTML
    select('#main-header').html(mainTitle)
    select('#section-1-title').html(sectionTitle1)
    select('#instruction-text').html(instructionText)
    select('#section-2-title').html(sectionTitle2)
    select('#label-x').html(colX)
    select('#label-y').html(colY)
    // -------------------------------------------------------------
    // TRIN 2: RENS DATA
    // (Forklar: Vi konverterer tekst-rækker til rigtige Javascript-objekter)
    // -------------------------------------------------------------

    // Variablen rows sættes til at være et array med alle CSV'filens rækker,
    // hvorefter vi blander dem tilfældigt og tager de første 1000 for hastighedens skyld
    var rows = table.rows
    rows = shuffle(rows).slice(0, 1000) 

    // Arrayet 'data' sættes til at være det array vi får tilbage, når vi mapper 
    // CSV'ens kolonner ud fra de keys vi valgte i toppen
    data = rows.map(row => {
        // Hver række i CSV'en omdannes til et objekt med x, y og bel properties
        // Da alt fra CSV'en er tekst, bruges Number() til at konvertere det til tal.
        var x = Number(row.get(colX)) // Første variabels kolonne (Culmen Length(mm))
        var y = Number(row.get(colY)) // Andet variabels kolonnne (Flipper Length(mm))
        var label = row.get(colLabel) // Labelet's kolonne (Species)
        
        // Tjek om data er gyldig (ikke NaN og har en label)
        // Der tjekkes om dataen er gyldig ved at sikre, at x og y er tal (ikke NaN),
        // ikke er 0 og at både x, y og label har en værdi (ikke null eller undefined)
        if (!isNaN(x) && !isNaN(y) && x && y && label) {
            // Hvis dataen er gyldig, returneres den med en x- og y-værdi og et label.
            return { x, y, label }
        }
    // Tomme/ugyldige pladser i arrayet fjernes med filter
    }).filter(p => p)
    // Dataen logges til konsollen
    console.log("Data klar:", data.length, "punkter")
    console.log(data)
 
    // nu skal vi forberede data til at blive vist med chart.js
    // Vi skal have fat i de unikke labels for hver gruppe i data
    
    // BRUG DET HER!
    // til at starte med sættes uniqueLabels til et tomt array
    uniqueLabels = []
    // Vi mapper data arrayet for at finde antallet af unikke labels
    data.map( point=> {
        // Vi kigger på punktets label og tjekker om det er et vi allerede har set før.
        //Hvis ikke, tilføjes det til uniqueLabels
        if(!uniqueLabels.includes(point.label)){
            uniqueLabels.push(point.label)
        }
    })
    // De unikke labels der blev fundet logges til konsollen
    console.log("Vi kiggede alle punkterne igennem og fandt disse labels: ", uniqueLabels)
    // De unikke labels bruges nu til at gruppere dataen i datasets (json objekter)
    // med den information som chart.js skal bruge.
    // For hvert unikt label laver vi en gruppe med alle datapunkterne der har det label
    var datasets = uniqueLabels.map( (label, index) =>{
        // Vi filtrerer data arrayet for at finde alle de punkter, 
        // der har det label vi kigger på i denne iteration
        var groupData = data.filter( point =>{
            // Hvert punkt hvis label matcher det label vi kigger på,
            // returneres i det nye array groupData
            return point.label == label
        })
        // Vi vælger en farve til gruppen baseret på dens index i uniqueLabels
        // og den tilsvarende farve i colorList (der er defineret tidligere i koden)
        var col = colorList[index]
        // Returner det færdige objekt med alle datapunkterne for hvert label 
        // og den information som chart.js skal bruge for at opstille grafen
        return {
            label: label,
            data: groupData,
            backgroundColor: col,
            pointRadius: 5,
            pointHoverRadius: 8
        }
    })

    //BRUG DET HER!

    // Et enkelt datasæt med brugerens gæt tilføjes til datasets arrayet
    datasets.push({ 
        label: "Dit gæt",
        data:[],
        pointStyle: "crossRot",
        pointRadius: 12,
        backgroundColor: "black",
        borderColor: "black",
        borderWidth: 4
    })
    //De endelige datasæts logges til konsollen
    console.log("så fik vi lavet dataset grupperne", datasets)

    // Grafen oprettes ved at referere til canvas elementet i HTML'en
    // og bruge Chart.js til at lave et scatter plot med vores datasets
    const canvasChart = document.getElementById("chartCanvas")
    myChart = new Chart(canvasChart, {
        // scatter er et todimmensionelt punktdiagram (x,y)
        type: "scatter",
        // Vi sætter data til at være det array af datasets vi lige har lavet
        data: { datasets:datasets },
        options:{
            //Aksetitlerne sættes til de valgte kolonnenavne fra CSV'en med "scales"
            scales:{
                x:{title:{display:true,text:colX}},
                y:{title:{display:true,text:colY}},
            }
        }

    })
    // Da grafen nu er sat op, kalder vi setupControls()
    setupControls()
}

function setupControls(){
    //1) Find alle x og y værdier i data
    //2) FORDI vi skal bruge dem til at bestemme hvad de der slidere skal gå fra og til
    //Det her betyder map data arrayet og returner alle point.x værdier
    var xValues = data.map( point => point.x )
    var yValues = data.map( point => point.y )
    //Beregn mindste og største værdier
    var minX = Math.min(...xValues)
    var minY = Math.min(...yValues)
    var maxX = Math.max(...xValues)
    var maxY = Math.max(...yValues)
    console.log('her er min og max for alle data: ', 'minX:', minX, 'maxX:', maxX, 'minY:', minY, 'maxY:', maxY)
    var xSlider = select('#input-x')
    var ySlider = select('#input-y')

    xSlider.attribute('min', Math.floor(minX))
    xSlider.attribute('max', Math.ceil(maxX))
    xSlider.value(minX + maxX / 2)

    ySlider.attribute('min', Math.floor(minY))
    ySlider.attribute('max', Math.ceil(maxY))
    ySlider.value(minY + maxY / 2)

    //input er sliderens "on change event", altså når man flytter den
    xSlider.input( () => select('#val-x').html( xSlider.value() ) )
    ySlider.input( () => select('#val-y').html( ySlider.value() ) )

    select('#val-x').html( xSlider.value() )
    select('#val-y').html( ySlider.value() )
    
    //DOM binding til k-slider
    var kSlider = select('#k-slider')
    kSlider.input( () => select('#k-value').html(select('#k-slider').value() ) )

    select('#predict-btn').mousePressed(classifyUnknown)
}

function classifyUnknown(){
    // Værdierne fra sliderne hentes ind i to variabler
    var inputX = select('#input-x').value()
    var inputY = select('#input-y').value()

    // Indlæs det sidste dataset i grafen (vores gæt) og sæt dets data 
    // til at være det punkt vi har fået fra sliderne
    var guessDataset = myChart.data.datasets[myChart.data.datasets.length - 1]
    guessDataset.data = [{x: inputX, y: inputY}]
    // Opdater grafen for at vise gættet
    myChart.update()
    // Alle punkters afstand til gættet beregnes og gemmes i en ny property på hvert punkt
    data = data.map( p => {
        // dist er en p5.js funktion der beregner den Euclidian distance mellem to punkter vha pythagoras
        p.distance = dist(inputX, inputY, p.x, p.y)
        return p
    })
    // Hvert punkts distance property sammenlignes, og arrayet 
    // sorteres med de mindste distancer først
    data.sort((a,b) => a.distance - b.distance)

    // antallet af k-naboer hentes fra slideren
    var k = select('#k-slider').value()

    // neighbors sættes til at være de første k punkter i det sorterede data array
    // altså de punkter med lavest distance til gættet, og dermed nærmeste naboer
    var neighbors = data.slice(0, k)

    // votes er et tomt objekt
    var votes = {}
    neighbors.map( n => {
        // For hver nabo tjekkes om dens label allerede findes i votes objektet
        //Hvis ikke, sættes den til 0
        if(votes[n.label] === undefined){
            votes[n.label] = 0
        }
        // For hver nabo gives der et "vote" til dets label, ved at øge værdien med 1
        votes[n.label] += 1 
    })
    console.log(votes)

    // Object.keys giver os keysne i votes objektet, 
    // hvilket er de forskellige labels de tætteste naboer har
    var allLabels = Object.keys(votes)

    // Til at starte med, sættes det første label i allLabels til at være vinderen
    var winner = allLabels[0]

    allLabels.map( l =>{
        //For hvert label tjekkes der om det har flere votes end den nuværende vinder
        if(votes[l] > votes[winner]){
            //Hvis det har, bliver det den nye vinder
            winner = l
        }
    })
    // Vinderen vises i HTML'en
    console.log(winner)
    select('#winner').html(winner)
    // Farven på vinderen i grafen vises i HTML'en ved at tjekke vinder-labelets 
    // index i uniqueLabels, og vise den tilsvarende farve i colorList
    select('#winner-color-box').style('background-color', colorList[uniqueLabels.indexOf(winner)])
}


//analysespørgsmål
//hvordan renser vi koden