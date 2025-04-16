document.addEventListener("DOMContentLoaded", () => {
    const adatfelvetel = document.getElementById("adatfelvetel");
    const tablaTorzs = document.querySelector("#tablazat tbody");
  
    const adatok = [];
  
    adatfelvetel.addEventListener("submit", (letrehoz) => {
      letrehoz.preventDefault();
  
      const nev = document.getElementById("nev").value.trim();
      const eletkor = document.getElementById("eletkor").value.trim();
      const varos = document.getElementById("varos").value.trim();
      const munkakor = document.getElementById("munkakor").value.trim();
  
      if (nev && eletkor && varos && munkakor) {
        adatok.push({ nev, eletkor, varos, munkakor });
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
  });