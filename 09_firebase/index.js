
//lav en ref til din collection
var quotesRef = db.collection('quotesData')
console.log('oprettet reference til test')
var edit_id = ""
var edit_div = ""

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    //NU KOMMER DET GENIALE: ONSNAPSHOT 
    quotesRef.onSnapshot( snap => {
        document.getElementById("quotes").textContent = ""
        console.log('Modtog snap', snap.size)
        snap.forEach( doc => {
            let d = doc.data()
            console.log(d)
            
            const quotesChild = document.createElement("div")
            quotesChild.classList.add("quote")
            const quoteText = document.createElement("p")
            //DER SKAL LAVES ET ELEMENT INDENDI MED KUN TEKSTEN
            quoteText.innerHTML = `"${d.text}" -${d.afsender}`
            quoteText.addEventListener("click", () => {
                quoteText.contentEditable = "true"
                edit_id = doc.id
                edit_div = quoteText
            })
            quoteText.addEventListener("keypress", (e) => {
                if(e.key == "Enter" && doc.id == edit_id) {
                    console.log("hej")
                    quotesRef.doc(edit_id).update({text:edit_div.innerHTML})
                }
            })
            const quoteDate = document.createElement("p")
            quoteDate.classList.add("quoteDate")
            quoteDate.textContent = `${d.timestamp.toDate().toLocaleDateString("da-dk",{
                weekday: "short",
                day: "numeric",
                month: "long",
                year: "numeric",
            })}`
            const deleteQuote = document.createElement("svg")
            deleteQuote.classList.add("deleteBtn")
            deleteQuote.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0b2644f0"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>`
            deleteQuote.addEventListener("click", () => {
                quotesRef.doc(doc.id).delete()
            })

            quotesChild.append(quoteText, quoteDate, deleteQuote)
            document.getElementById("quotes").appendChild(quotesChild)
        })
        
    })
    
    document.getElementById("inputField").addEventListener("keydown", enterPressed)
    document.getElementById("inputField2").addEventListener("keydown", enterPressed)
}
function enterPressed(e) {
    if(e.key == "Enter") {
        var newQuote = document.getElementById("inputField").value
                var newAfsender = document.getElementById("inputField2").value
                console.log(newQuote)

                if(newQuote == "" && newAfsender == "") {
                    confirm('skriv venligst noget FØR DU TRYKKER ENTER')
                    return
                }else if(newQuote == "" && newAfsender !== "") {
                    confirm('Makker du mangler ligesom et citat')
                    return
                }
                if(newAfsender == "") newAfsender = "En ukendt, men vis person"

                quotesRef.add({
                    text: newQuote,
                    afsender: newAfsender,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                //.then kaldes asynkront NÅR add er færdig
                }).then(
                    console.log('Quote gemt i databasen', newQuote)
                )
                console.log(quotesRef)

                document.getElementById("inputField").value = ""
                document.getElementById("inputField2").value = ""
    }
}

var a = "123"
console.log("a")