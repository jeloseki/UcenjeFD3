

const zadaci = {
  z1: (a, b) => {
    console.log('Zadatak 1');
    // početak 1

    // kraj 1
  },
  z2: (a, b) => {
    console.log('Zadatak 2');
    // početak 2

    // kraj 2
  },
  z3: (a, b) => {
    console.log('Zadatak 3');
    // početak 3 

    // kraj 3
  },
  z4: (a, b) => {
    console.log('Zadatak 4');
    // početak 4

    // kraj 4
  },
  z5: (a, b) => {
    console.log('Zadatak 5');
    // početak 5

    // kraj 5
  }
  // ovdje dodajemo nove zadatke
}


const rezultat = document.getElementById('rezultat');
document.getElementById('izvedi').addEventListener('click', () => {

  const a = document.getElementById('a').value;
  const b = document.getElementById('b').value;
  const zadatak = document.getElementById('zadatak').value;
  if (!(('z' + zadatak) in zadaci)) {
    rezultat.innerHTML = `Nepoznati zadatak ${zadatak}`;
    return;
  }
  // poziv funkcije u objektu
  zadaci['z' + zadatak](a, b);
});
