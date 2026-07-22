// nizovi, polja, arrays
// nizovi su struktura podataka
// niz omogucuje pohranjivanje vise vrijednosti u jednoj varijabli
const t1 = 4 // u varijabli t1 imam prosjecnu temp za sijecanj

// prazan niz
const prazanNiz = []
console.log('prazanNiz', prazanNiz
)

// svaki niz ima duzinu
console.log('prazanNiz.length', prazanNiz.length)

// pohranjujem 12 prosjecnih temp za sijecanj-prosinac
const temp = [4, 1, 9, 15, 17, 27, 30, 33, 26, 18, 14, 8]

console.log(temp)
console.table(temp)

// prvi element niza na indexu 0
console.log('Prvi element niza', temp[0])

// zadnji element niza
console.log('Zadnji element niza', temp[temp.length - 1]) // ne moram znati konkretan broj indeksa

// ispisati 27 iz niza temp
console.log('27 iz niza temp', temp[5])

// vrijednosti elemenata niza se mogu mijenjati
// u lipnju nije bilo 27, vec 28
temp[5] = 28
console.table(temp)


// skratiti niz
temp.length = 10 // skrati niz na 10 elemenata
console.table(temp)

// uvecaj niz temp za 1 element
temp.length = temp.length + 1
temp[temp.length - 1] = 77
console.table(temp)
temp[110] = -1
console.table(temp)
console.log(temp[11])
console.log(temp.length)


const mjesta = [
    'Osijek',
    'Zagreb',
    'Split',
    'Rijeka',
    'Zadar',
]
console.table(mjesta)

// u ozbiljnom dev svijetu, naginje se da nizovi imaju elemente istog tipa

// niz moze imati bilo koji tip podatka za element i mogu biti mijesani
// ponavljanje tipova podataka

const ptp = [
    'Edunova', // string
    7,  // number
    18n,  // bigint
    true,  // boolean
    [], // array
    undefined,
    null,
    { ime: 'Pero' }, // objekt
    Symbol('e')
]

// ispisi Pero
console.log(ptp)
console.log(ptp[7])
console.log(ptp[7].ime)
console.log(ptp[7]['ime']) // necemo ovo koristiti

const osobe = [
    {
        ime: 'Ivica',
        prezime: 'Jelošek',
        godine: 41
    },
    {
        ime: 'Dunja',
        prezime: 'Jelošek',
        godine: 42
    },
    {
        ime: 'Andrej',
        prezime: 'Jelošek',
        godine: 12
    },
    {
        ime: 'Buba',
        prezime: 'Beagle',
        godine: 4
    },
]
console.table(osobe)

const sumaGodina = osobe[0].godine + osobe[1].godine + osobe[2].godine + osobe[3].godine
    + (osobe[4]?.godine ?? 0)
console.log(sumaGodina)


// destrukcija

const niz = [10, 20, 30] // tri elementa
const [e1, e2] = niz // izvrsio sam destrukcija na nacin da je prvi element niza zavrsio u varijabli e1, drugi u e2, a niz je ostao kakav je bio

console.log(e1, e2, niz)

const [, , e3] = niz
console.log(e3)

// npr backend vrati prazan niz
niz.length = 0 // na ovaj naci sam ocistio niz
const [x1=1, x2=20] = niz // kod destrukcije, varijablama se moze dodjeliti zadana vrijednost
console.log(x1, x2)


// spread operator ...

const n1 = [1, 2, 3]

const novi = n1 // ovo nije kopiranje, ovo je kreiranje reference na niz n1

novi [0] = 7
console.log(n1)

// spread operator ... zapravo kopira

const kopija = [...n1] // u nizu kopija se nalaze svi elementi kopirani za niza n1
console.log(kopija, n1)
 

// spajanje niza
const gradovi = ['Osijek', 'Zagreb']
const sela = ['Habjanovci', 'Tenja']
const hr = [...gradovi, ...sela]
console.log(hr)

document.getElementById('naslov').innerHTML=hr[0]

// ovo gore je jednodimenzionalni niz -- lista
// nizovi mogu biti visedimenzionalni
// 2D matrix

const tablica = [
    [1, 2, 3], // ovo je red s indexom 0
    [4, 5, 6], // red index 1 
    [7, 8, 9] // red index 2
]

// ispisi 6
console.log(tablica[1][2])
console.table(tablica)


// 3D je kocka

// 4D je tenzor