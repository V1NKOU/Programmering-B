//This script takes a csv file and cleans the data into a javascript array

var table
//cleanData will hold the javascript object we intend to use
var cleanData = []
const csvFile = './assets/penguinsList.csv'
//vi bruger kun 1000 rækker, da vi skal tegne dem på skærmen
const maxRows = 1000

function preload(){
    //loadTable er en p5 funktion der henter en tabel fra en fil.
    table = loadTable(csvFile, 'csv', 'header')
    console.log('Data tabel loaded')
}

//Kan jeg lave en algoritme som kan bruges i klassifikation af pingvinarter ud fra deres flipper length og culmen length
function setup(){
    console.log('Rå data kolonner: ',table.columns)
    var xValue = 'Flipper Length (mm)'
    var yValue = 'Culmen Length (mm)'
    var labelValue = 'Species'

    //table.rows er et array med alle data objekterne i
    //map returnerer et nyt element med de dimensioner vi gerne vil have
    cleanData = table.rows.map( row => {
        var x = row.get(xValue)
        var y = row.get(yValue)
        var returnObj = {
            [xValue]: Number(x),
            [yValue]: Number(y)
        }
        if(labelValue){
            returnObj.label = row.get(labelValue)
        }
        return returnObj
    })
    //vi filtrerer lige arrayet så vi er sikre på at alle de dimensioner vi skal bruge
    cleanData = cleanData.filter( row=> {
        //valid er true hvis begge felter er et tal
        var valid = !isNaN(row[xValue]) && !isNaN(row[yValue]) && row[xValue] != 0 && row[yValue] != 0
        //MEN vi skal også tjekke om label er noget HVIS vi har en label
        if (labelValue && !row.label) {
            valid = false
        }
        return valid
    })
    console.log("Clean data her: ", cleanData)
    //bland data vilkårligt
    cleanData = shuffle(cleanData)
    cleanData = cleanData.slice(0, maxRows)

    console.log('Så har vi renset data', cleanData)
    
    select('#status').html(`Vi har nu skåret det ned til max 1000 rækker`)
}


