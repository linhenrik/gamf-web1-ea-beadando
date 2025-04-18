class Szemely {
    constructor(nev, kor, varos) {
      this.nev = nev;
      this.kor = kor;
      this.varos = varos;
    }
  
    megjelenit() {
      return `Név: ${this.nev} Kor: ${this.kor} Város: ${this.varos}`;
    }
  }
  
const szemelyek = [];
  
function ujSzemely() {
    const nev = document.getElementById("nev").value.trim();
    const kor = parseInt(document.getElementById("kor").value.trim());
    const varos = document.getElementById("varos").value.trim();
  
    if (!nev || !kor || !varos) {
      alert("Nem lett minden mező kitöltve");
      return;
    }
  
    const uj = new Szemely(nev, kor, varos);
    szemelyek.push(uj);
    megjelenitLista();
    document.getElementById("nev").value = "";
    document.getElementById("kor").value = "";
    document.getElementById("varos").value = "";
}
  
function megjelenitLista() {
    const listaElem = document.getElementById("lista");
    listaElem.innerHTML = "";
  
    szemelyek.forEach((sz, index) => {
      const li = document.createElement("li");
      li.textContent = sz.megjelenit();
      const torlesGomb = document.createElement("button");
      torlesGomb.textContent = "Törlés";
      torlesGomb.onclick = () => {
        szemelyek.splice(index, 1);
        megjelenitLista();
      };
      li.appendChild(torlesGomb);
      listaElem.appendChild(li);
    });
}