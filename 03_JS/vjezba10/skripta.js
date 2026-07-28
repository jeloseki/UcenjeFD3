// while petlja
// radi s boolean tipom podatka
// sve dok je true ostaje u petlji

// beskonacna petlja

while (true){
    console.log('Edunova')
    break
}

// continue i break rade isto kao u FOR-petlji

let brojac=0

console.time('while petlja')
let suma=0
while (brojac++<100){
  //  console.log(brojac) //1,2,3 ... 100
  // if(brojac % 10 === 0){
  //  console.log(brojac)
  // }
  suma+=brojac
}

console.timeEnd('while petlja')
console.log(suma)


let brojUnos= '1262' // simuliram da je ovo unio korisnik = 11
console.time('ZB1')

suma = 0

for (let i = 0; i<brojUnos.length; i++){
    suma += Number(brojUnos[i]) // ovo se izvede 4 puta
}

console.timeEnd('ZB1')
console.log(suma)

console.time('ZB2')
let broj=Number(brojUnos) // ovo se izvodi jednom

suma = 0

while(broj>0){
suma+= broj % 10 // 1262 -> 2
broj = broj - (broj % 10) // 1262 -2 = 1260 | 126-6=120
broj /= 10 // 126 | 12
}
console.timeEnd('ZB2')
console.log(suma)


// cinjenica; u petlje (while, for) se ne mora uci
const x = 5
for(let i = 0; i > x; i++){
    console.log('Usao u petlju')
}

const podaciApi = [
    
    {
        ime: 'Pero'
    },
    {
        ime: 'Marko'
    }, 
    {
        ime: 'Marija'
    }
]

while (podaciApi.length>0){
    // funckija pop() uzima veci broj iz niza i skracuje niz za taj element (smanji length)
    console.log('Usao u petlju', podaciApi.pop()?.ime)
}
