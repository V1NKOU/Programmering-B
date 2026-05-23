# Trækspørgsmål til årsprøve

**Programmering B - HTX 1. år**  
**Forberedelsestid:** 60 minutter  
**Hjælpemidler:** Eleverne må gerne bruge egne noter, tidligere projekter og internettet i forberedelsen.

Eleven skal forberede en lille programmeringsløsning og bagefter kunne forklare sin kode mundtligt. Spørgsmålene tager udgangspunkt i de mapper og eksperimenter, vi har arbejdet med i løbet af året.

---

## 1. Arrays og filtrering: Find bestemte elever

**Udgangspunkt:** `05_arrays`

Du har følgende array:

```js
let elever = [
  { navn: "Rikke", klasse: "2T", afleveret: true },
  { navn: "Peter", klasse: "2T", afleveret: false },
  { navn: "Zenia", klasse: "2T", afleveret: true }
]
```

Tilføj mindst to nye elever til arrayet.

Brug `map()` til at løbe arrayet igennem og udskriv alle elever, som **ikke har afleveret**.

Resultatet skal fx være:

```js
Mangler aflevering:
Peter
```

Du skal kunne forklare:

- Hvad et array er
- Hvad et objekt/JSON-objekt er
- Hvordan `map()` kan bruges til at løbe et array igennem
- Hvordan en `if`-sætning virker
- Hvordan man tilføjer nye elementer til et array

---

## 2. Quiz med spørgsmål og point

**Udgangspunkt:** `07_quiz_game`

I har allerede lavet et quizspil af denne type i mappen `07_quiz_game`.

Lav en ny simpel quiz-webapp med mindst fire sandt/falsk-spørgsmål. Du må gerne bruge strukturen fra det quizspil, vi allerede har lavet, men du skal selv kunne forklare koden.

Quizzen skal have:

- Et HTML-element, hvor spørgsmålet vises
- To knapper: `Sandt` og `Falsk`
- En score, der tæller op, når brugeren svarer rigtigt
- Et resultat, der vises når der ikke er flere spørgsmål

Hvert spørgsmål skal være et objekt:

```js
let questions = [
  { text: "JavaScript kører i browseren", answer: true },
  { text: "CSS bruges til logik", answer: false }
]
```

Når brugeren klikker på en af knapperne, skal programmet kalde en funktion `checkAnswer(userAnswer)`, som sammenligner brugerens svar med det rigtige svar. I må gerne bruge den samme type sammenligning som i quiz-eksemplet:

```js
if (questions[q].answer == userAnswer) {
  score++
}
```

Når quizzen er færdig, skal programmet skrive:

```js
Du fik 3 ud af 4 point
```

Du skal kunne forklare:

- Hvordan quizspørgsmålene er gemt
- Hvad variablerne `score` og `q` bruges til
- Hvordan funktionen `checkAnswer()` virker
- Hvordan `==` kan bruges til at sammenligne svaret
- Hvordan programmet ved, hvornår quizzen er slut

---

## 3. Memory game: Tjek to vendte kort

**Udgangspunkt:** `06_memory_game`

I har allerede lavet et memory game i mappen `06_memory_game`.

Lav den centrale del af spillet igen: Når spilleren har vendt to kort, skal programmet undersøge, om kortene har samme billede.

Du kan fx bruge to kort med en `img`-værdi:

```js
let card1 = { img: "dog.png" }
let card2 = { img: "dog.png" }
```

Lav et array `flippedCards`, hvor de to vendte kort bliver gemt.

Når der er to kort i `flippedCards`, skal programmet sammenligne deres `img`.

Hvis de matcher, skal der stå:

```js
Match!
```

Ellers skal der stå:

```js
Ikke et match
```

Brug gerne den samme type sammenligning, som I har brugt i undervisningen:

```js
if (flippedCards[0].img == flippedCards[1].img) {
  console.log("Match!")
}
```

Du skal kunne forklare:

- Hvordan kortene er repræsenteret som objekter
- Hvorfor de vendte kort gemmes i et array
- Hvordan man kan se, om der er vendt to kort
- Hvordan `==` bruges til at sammenligne billederne
- Hvad der skal ske, hvis kortene matcher eller ikke matcher

---

## 4. Point & click: Skift rum med `shiftPage`

**Udgangspunkt:** `0X_template_with_menu` og `10_AARSPROVE/template`

Lav tre HTML-sider/rum:

```html
<div class="page" id="start"></div>
<div class="page" id="room1"></div>
<div class="page" id="room2"></div>
```

Lav en funktion:

```js
function shiftPage(newPage) {
  // skjul gammel side
  // vis ny side
}
```

Lav en knap eller et klikbart element, som sender spilleren fra `start` til `room1`.

Du skal kunne forklare:

- Hvad DOM-elementer er
- Hvordan `select()` bruges
- Hvordan CSS-klasser kan vise og skjule sider
- Hvad `addClass()` og `removeClass()` gør
- Hvorfor variablen `currentPage` er nyttig

---

## 5. Escape room: Find tre skjulte symboler

**Udgangspunkt:** `10_AARSPROVE/template`

Lav et lille rum med tre klikbare symboler.

Når spilleren klikker på et symbol, skal symbolet skjules, og en tæller skal opdateres:

```js
Fundet: 1 / 3
```

Når alle tre symboler er fundet, skal spilleren sendes videre til næste rum.

Du skal kunne forklare:

- Hvad variablen `symbolsFound` bruges til
- Hvordan `mousePressed()` virker
- Hvordan `hide()` kan skjule et element
- Hvordan `html()` kan opdatere tekst på siden
- Hvordan en `if`-sætning bruges til at gå videre

---

## 6. Timer til et spil

**Udgangspunkt:** `10_AARSPROVE/template`

Lav en timer, der tæller sekunder fra spillet starter.

Programmet skal have funktionerne:

```js
startTimer()
stopTimer()
```

Timeren skal vises på siden, fx:

```js
Tid: 17 sekunder
```

Når spillet er færdigt, skal tiden stoppes og vises som slutresultat.

Du skal kunne forklare:

- Hvordan `setInterval()` virker
- Hvordan `clearInterval()` stopper timeren
- Hvorfor `seconds` bør være en global variabel
- Hvorfor timeren skal stoppes, når spillet er færdigt

---

## 7. High score som array

**Udgangspunkt:** `09_firebase`, men uden krav om rigtig Firebase

Lav et array med high scores:

```js
let scores = [
  { name: "Rikke", seconds: 42 },
  { name: "Peter", seconds: 55 },
  { name: "Zenia", seconds: 38 }
]
```

Tilføj en ny score.

Sorter listen, så den hurtigste tid står først, og udskriv top 3.

Du skal kunne forklare:

- Hvordan high scores er gemt som objekter
- Hvordan `push()` tilføjer en ny score
- Hvordan `sort()` kan sortere listen
- Hvorfor man skal sortere tal på en særlig måde
- Forskellen på lokal data i et array og data i Firestore

---

## 8. Firebase: Gem et quote eller en score

**Udgangspunkt:** `09_firebase`

Lav kode, der viser hvordan man kan gemme et objekt i Firestore:

```js
scoresRef.add({
  name: "Rikke",
  seconds: 42
})
```

Udvid objektet med mindst én ekstra oplysning, fx dato, bane eller antal fejl.

Lav også en kort forklaring af, hvordan `onSnapshot()` kan bruges til at hente data igen.

Du skal kunne forklare:

- Hvad en collection er
- Hvad et document er
- Hvad `add()` gør
- Hvordan objektdata gemmes i Firestore
- Hvorfor Firebase-kommunikation er asynkron

---

## 9. Fetch API: Hent data fra nettet

**Udgangspunkt:** `08_blackjack_fetch_api`

Lav en async funktion, der henter data fra en API.

Du må fx bruge:

```js
fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
```

Programmet skal hente JSON og udskrive mindst to værdier fra data-objektet i konsollen.

Du skal kunne forklare:

- Hvad `fetch()` gør
- Hvad `async` og `await` betyder
- Hvad `response.json()` gør
- Hvorfor data fra nettet ikke kommer med det samme
- Hvordan `try/catch` kan bruges til fejl

---

## 10. Blackjack: Beregn værdien af et kort

**Udgangspunkt:** `08_blackjack_fetch_api`

Lav en funktion `returnCardValue(card)`, som returnerer værdien af et kort.

Eksempler:

```js
"ACE" giver 11
"KING" giver 10
"7" giver 7
```

Test funktionen med mindst fem forskellige kort.

Du skal kunne forklare:

- Hvordan funktionen modtager et kort som parameter
- Hvordan `if` bruges til at tjekke korttypen
- Hvordan `isNaN()` kan bruges
- Hvorfor `Number()` er nødvendig
- Hvordan funktionen kan bruges i et spil

---

## 11. Lyd eller tale i browseren

**Udgangspunkt:** `04_webcam_mic_speech`

Lav et lille program, hvor brugeren skriver tekst i et inputfelt og trykker på en knap.

Når knappen trykkes, skal browseren læse teksten højt med:

```js
SpeechSynthesisUtterance
```

Udvid med mulighed for at ændre `rate` eller `pitch`.

Du skal kunne forklare:

- Hvordan man læser værdien fra et inputfelt
- Hvordan `mousePressed()` bruges som event
- Hvad en browser-API er
- Hvad `rate` og `pitch` betyder
- Forskellen på p5.js og almindelig JavaScript

---

## 12. Data cleaning: Rens en liste med data

**Udgangspunkt:** `ML_Data_Cleaner`

Du har følgende data:

```js
let data = [
  { name: "A", sleep: "7", breaks: "3" },
  { name: "B", sleep: "", breaks: "2" },
  { name: "C", sleep: "8", breaks: "not known" }
]
```

Lav en funktion, der laver dataene om, så `sleep` og `breaks` bliver tal.

Fjern rækker, hvor værdierne ikke kan bruges.

Resultatet skal fx være:

```js
[
  { name: "A", sleep: 7, breaks: 3 }
]
```

Du skal kunne forklare:

- Hvordan `map()` kan ændre data
- Hvordan `filter()` kan fjerne dårlige rækker
- Hvordan `Number()` laver strings om til tal
- Hvordan `isNaN()` kan finde ugyldige tal
- Hvorfor man skal rense data før machine learning
