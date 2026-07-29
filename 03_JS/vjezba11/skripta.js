const isDev = true

// funkcija je skup naredbi s odredjenom svrhom s ciljem visestrukog poziva 
// DRY - don't repeat yourself

// "klasicne" funkcije

// 2 koraka rada s funkcijama; definicija i pozivanje

// redoslijed definicije i pozivanja nije bitan
odradi()

// 1. ne prima vrijednost i ne vraca vrijednost

// 1.1 definiranje
function odradi() {
    // u () se nalaze parametri, ova ne prima parametre
    // u tijelu nema return nekog tipa, ova je tipa void
    console.log('Poziv funckije odradi 1.1')
}
// poziv funkcije odradi
odradi()

document.getElementById('gumb2').addEventListener('click', odradi)

// koristenje bezimene funckije
document.getElementById('gumb3').addEventListener('click', function () {
    console.log('Poziv iz bezimene funckije')
})


// 2. Prima paremetre, ne vraca vrijednost
function parniBrojevi(odBroja, doBroja) { // odBroja, doBroja0 su parametri, odvajaju se zarezom
    for (let i = odBroja; i <= doBroja; i++) {
        if (i % 2 === 0) {
            console.log(i)
        }
    }
}

// 2.2 poziv
parniBrojevi(2, 12)
parniBrojevi(127, 134)


// korisni primjer druge vrste funckije

function log(poruka) {
    if (!isDev) { // ako nije dev, izadji iz funckije van;tzv. short circuiting
        return
    }
    console.log('\n') // \ -> prelazi u novi red
    console.log('+---------------------------+')
    console.log(poruka)
    console.log('+---------------------------+')
}

log('Prva poruka testiranje')

log('Osijek')


// 3. Ne prima parametre, vraca vrijednost

// 3.1 definicija
function slucajniBroj() { // () znaci da ne prima parametre
    return Math.random()
}

// 3.2 poziv

// funckije koje vracaju vrijednost, kod poziva ciji se rezultat ne koristi, se izvedu i "bace u vjetar"
slucajniBroj()

// varijabli sb dodjeljujem rezltat izvodjenja funkcije sb
const sb = slucajniBroj()

log(sb)

// koristenje funckije unutar parametra druge funkcije

log(slucajniBroj())



// 4.1 definicija
function zbrojPrimBrojeva(odBroja, doBroja) {
    let suma = 0
}

// 4.2 poziv

log(zbrojPrimBrojeva(-2, 10)) // 17
log(zbrojPrimBrojeva(100, 120))

const ime = 'pero'

// slucaj 4
log(ime.charCodeAt(0)) // ASCII https://ctf.xfer.hr/images/osint/ascii.p

// slucaj 3
log(ime.toUpperCase())

// slucaj 2
console.log('Slucaj 2')

// slucaj 1
// obrada dogadjaja na stranici

// rekurzija
// rekurzija je kada funkcija zove samu sebe uz uvjet prekida rekurzije
// u rekurziji moramo paziti na stack overflow

function zbroj(broj) {
    if (broj === 1) { // ovo je uvjet prekida rekurzije
        return 1
    }
    return broj + zbroj(broj - 1)
}

log(zbroj(100))


// hello() // skripta.js:124 Uncaught ReferenceError: Cannot access 'hello' before initialization ; arrow funkcijama ne mozemo pristupiti prije inicijaliziranja
// "moderne" funckije -  arrow function

const hello = () => log('Hello is arrow')

hello()

const brojevi = (a, b) => {
    return [a, 3, b]
}

log(brojevi(1, 2))

    ; (() => {
        console.log('Kreirana funckija i odmah izvedena')
    })()

