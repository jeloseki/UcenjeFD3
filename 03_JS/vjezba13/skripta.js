// Try Catch je mehanizam osiguranja da nam program ne pukne na nacin da nam omoguci obradu iznimke (greske)

// console.log('Početak')

// const i = 7

// const rezultat = i + varijabla

// console.log(rezultat)

// console.log('Kraj')

try{
   // ovdje se uvijek ulazi
   console.log('Početak')
   const i = 7
   const rezultat = i + varijabla
   console.log(rezultat)
}catch(e){
// ovdje zavrsim ako se dogodi greska (bacena greska)
   console.log('Greška', e.name, e.message, e)
}
console.log('Kraj')

// 2. primjer
// opcionalna sintaksa, ima jos i finally

console.log('2. primjer')
const i = 7
let rezultat = 0

try{
    // uvijek se izvodi 
   rezultat = i + varijabla
}catch{
    // izvodi se u slucaju greske try
   rezultat = i + 1
   // uvijek izvodi
}finally{
   console.log(rezultat)
}
console.log('Kraj 2. primjer')


// provociramo gresku
function korijen(broj){
    if(broj<-1){
        // iniciramo pogresku
        throw new Error('Ne mogu izvaditi 2. korijen')
    }
    return Math.sqrt(broj)
}

console.log(korijen(9)) //3

try {
    console.log(korijen(-9))
} catch (e) {
    console.log(e.message)
}


// zgodan primjer -- losa sintaksa
function rekurzija(){
    let a = 1, b = 2, c = 3, d = 4, e = 5
    let f = 'Neki dugački tekst koji zauzima prostor'
    brojac++
    rekurzija()
}

let brojac = 0

console.time('rekurzija')
try {
    rekurzija()
} catch (error) {
    console.log('Stog napunje na:', brojac)
}
console.timeEnd('rekurzija')


