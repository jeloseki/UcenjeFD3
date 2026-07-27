// ponavljanje iteracije, petlje, loops

// u konzolu ispisati 10 puta Edunova, jedno ispod drugog

console.log('Edunova')
console.log('Edunova')
console.log('Edunova')
console.log('Edunova')
console.log('Edunova')
console.log('Edunova')
console.log('Edunova')
console.log('Edunova')
console.log('Edunova')
console.log('Edunova')


// ovo gore nije dobro rjesenje i necemo ga koristiti

// klasicna for-petlja

// for(iniciajalna vrijednost brojaca; uvjet izlaska iz petlje, uvecanje/umanjenje)

console.log('=====================')
// rijesenje gornjeg zadatka

for (let i = 0; i < 10; i++) {
    console.log('Edunova')
}

console.log('=====================')

// unutar petlje, "i" mijenja vrijednost

for (let i = 0; i < 10; i++) {
    console.log(`i=${i + 1}`)
}

console.log('=====================')

// unutar petlje, mozemo koristiti trenutne vrijednosti varijable, da se njima nesto radi

// odradio je 100 iteracija i dosao do rezultata 5050
let suma = 0
for (let i = 0; i < 100; i++) {
    suma += i + 1
    //    debugger
}

console.log(suma) // 5050

console.log((100 * (100 + 1)) / 2) // 5050

// NEKOLIKO PRIMJERA SETANJA S POMOCU FOR PETLJE

for (let i = 10; i > 0; i--) {
    console.log(i)
}

// manji prema vecem
for (let i = 7; i < 20; i += 2) {
    console.log(i)
}


// simulairam unos korisnika
const pocetak = 7
const kraj = 20
const uvecanje = 2
for (let i = pocetak; i < kraj; i += uvecanje) {
    console.log(i)
}

// ugnjezdjivanje petlje
document.write('<table>')
for (let i = 1; i <= 100; i++) {
    document.write('<tr>')
    for (let j = 1; j <= 100; j++) {
        document.write(`<td>${i * j}</td>`)
    }
    document.write('</tr>')
}
document.write('</table>')


// petlju mozemo preskociti i nasilno prekinuti

for (let i = 0; i < 10; i++) {
    if (i === 3) {
        continue // nastavlja-preskace petlju do pocetka
    }
    if (i === 7) {
        break // nasilno prekida izvodjenje petlje
    }
    console.log(i)
}

console.log('=====================')

const niz = [1, 2, 3, 4, 5, 6, 7]

// ispistai sve elemente niza
for (let i = 0; i < niz.length; i++) {
    console.log(niz[i])
}

// sipisati od zadnjeg prema prvom
console.log('=====================')

for (let i = niz.length - 1; i >= 0; i--) {
    console.log(niz[i])
}

// string je niz znakova
console.log('=====================')

const ime = 'Nina'
for (let i = 0; i < ime.length; i++) {
    console.log(ime[i])
}

// beskonacna petlja
const spavaj = (ms) => new Promise(r => setTimeout(r, ms))

async function odradi() {
    for (; ;) {
        //    console.log('U beskonacnoj petlji sam')
        document.getElementById('lista').innerHTML
            = '<li>' + (Math.floor(Math.random() * 1000) + 1) + '</li>'
            + document.getElementById('lista').innerHTML
        await spavaj(1500)
            break // iskomentirati <-break u slucaju zamrzavanja racunala zbog beskonacne petlje
    }
}
odradi()