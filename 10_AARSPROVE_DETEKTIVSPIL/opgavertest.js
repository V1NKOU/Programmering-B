
let elever = [
  { navn: "Rikke", klasse: "2T", afleveret: true },
  { navn: "Peter", klasse: "2T", afleveret: false },
  { navn: "Zenia", klasse: "2T", afleveret: true }
]


//Tilføj mindst to nye elever til arrayet.
let nyeElever = [
    { navn: "Ole", klasse: "2T", afleveret: true },
    { navn: "Ursula", klasse: "2T", afleveret: false }
]
elever.push(...nyeElever)

console.log("Mangler aflevering:")

let dårligeElever = elever.map( (e) => {
    if (e.afleveret == false) console.log(e.navn)
})

//Brug `map()` til at løbe arrayet igennem og udskriv alle elever, som **ikke har afleveret**.

//Resultatet skal fx være:

```js
Mangler aflevering:
Peter
```
/*
Du skal kunne forklare:

- Hvad et array er
- Hvad et objekt/JSON-objekt er
- Hvordan `map()` kan bruges til at løbe et array igennem
- Hvordan en `if`-sætning virker
- Hvordan man tilføjer nye elementer til et array

---
*/