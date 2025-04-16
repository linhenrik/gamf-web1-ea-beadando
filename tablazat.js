document.addEventListener("DOMContentLoaded", () => {
    const adatfelvetel = document.getElementById("adatfelvetel");
    const tablaTorzs = document.querySelector("#tablazat tbody");
  
    const adatok = [];
    let szerkesztunk = null;
  
    adatfelvetel.addEventListener("submit", (letrehoz) => {
      letrehoz.preventDefault();
  
      const nev = document.getElementById("nev").value.trim();
      const eletkor = document.getElementById("eletkor").value.trim();
      const varos = document.getElementById("varos").value.trim();
      const munkakor = document.getElementById("munkakor").value.trim();
  
      if (nev && eletkor && varos && munkakor) {
        const ujAdat = { nev, eletkor, varos, munkakor };
        if (szerkesztunk === null) {
            adatok.push(ujAdat);
          } else {
            adatok[szerkesztunk] = ujAdat;
            szerkesztunk = null;
            adatfelvetel.querySelector("button").textContent = "Felvétel";
          }
        adatfelvetel.reset();
        megjelenites();
      }
    });
  
    function megjelenites() {
      tablaTorzs.innerHTML = "";
  
      adatok.forEach((sor, index) => {
        const ujSor = document.createElement("tr");
  
        ujSor.innerHTML = `
          <td>${sor.nev}</td>
          <td>${sor.eletkor}</td>
          <td>${sor.varos}</td>
          <td>${sor.munkakor}</td>
          <td>
            <button onclick="szerkesztes(${index})">Szerkesztés</button>
            <button onclick="torles(${index})">Törlés</button>
          </td>
        `;
  
        tablaTorzs.appendChild(ujSor);
      });
    }
  
    window.torles = function(index) {
      adatok.splice(index, 1);
      megjelenites();
    };

    window.szerkesztes = function(index) {
        const adat = adatok[index];
        document.getElementById("nev").value = adat.nev;
        document.getElementById("eletkor").value = adat.eletkor;
        document.getElementById("varos").value = adat.varos;
        document.getElementById("munkakor").value = adat.munkakor;
    
        szerkesztunk = index;
        adatfelvetel.querySelector("button").textContent = "Mentés";
      };
  });