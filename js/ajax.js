const code = "HSYNUUdhe603";

function hozzaadas() {
  const nev = document.getElementById("nev").value.trim();
  const magassag = document.getElementById("magassag").value.trim();
  const suly = document.getElementById("suly").value.trim();

  if (!nev || !magassag || !suly) {
    alert("Minden mező kitöltése kötelező");
    return;
  }
  if (nev.length > 30 || magassag.length > 30 || suly.length > 30) {
    alert("Az egyik mező hosszabb mint 30 karakter");
    return;
  }

  const adatok = new URLSearchParams({
    code,
    op: "create",
    name: nev,
    height: magassag,
    weight: suly
  });

  fetch("http://gamf.nhely.hu/ajax2/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: adatok.toString()
  })
  .then(res => res.text())
  .then(valasz => {
    alert("Sikeres CREATE");
    lekerdezes();
  });
}

function lekerdezes() {
  fetch("http://gamf.nhely.hu/ajax2/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `code=${code}&op=read`
  })
  .then(res => res.json())
  .then(valasz => {
    const lista = valasz.list;
    let ki = "<ul>";
    let osszeg = 0;
    let max = 0;

    lista.forEach(elem => {
      const h = parseInt(elem.height);
      ki += `<li>ID: ${elem.id}, Név: ${elem.name}, Magasság: ${elem.height}, Súly: ${elem.weight}</li>`;
      osszeg += h;
      if (h > max) max = h;
    });

    ki += "</ul>";
    const atlag = (osszeg / lista.length).toFixed(2);
    ki += `<p>Magasságok összege: ${osszeg}</p>`;
    ki += `<p>Átlagos magasság: ${atlag}</p>`;
    ki += `<p>Legnagyobb magasság: ${max}</p>`;

    document.getElementById("eredmeny").innerHTML = ki;
  });
}

function torles() {
  const id = document.getElementById("idTorles").value.trim();

  if (!id) {
    alert("Nincs megadva ID");
    return;
  }

  const torlesAdat = new URLSearchParams({
    code,
    op: "delete",
    id
  });

  fetch("http://gamf.nhely.hu/ajax2/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: torlesAdat.toString()
  })
  .then(res => res.text())
  .then(valasz => {
    alert("Sikeres DELETE");
    lekerdezes();
  });
}

function betoltes() {
  const id = document.getElementById("idUpdate").value.trim();
  const keresettId = parseInt(id);

  if (!id) {
    alert("Nincs megadva ID");
    return;
  }

  fetch("http://gamf.nhely.hu/ajax2/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `code=${code}&op=read`
  })
  .then(res => res.json())
  .then(valasz => {
    const talalat = valasz.list.find(e => e.id === keresettId);
    if (talalat) {
      document.getElementById("nevUpdate").value = talalat.name;
      document.getElementById("magassagUpdate").value = talalat.height;
      document.getElementById("sulyUpdate").value = talalat.weight;
    } else {
      alert("Nincs ilyen ID");
    }
  });
}

function modositas() {
  const id = document.getElementById("idUpdate").value.trim();
  const nev = document.getElementById("nevUpdate").value.trim();
  const magassag = document.getElementById("magassagUpdate").value.trim();
  const suly = document.getElementById("sulyUpdate").value.trim();

  if (!id || !nev || !magassag || !suly) {
    alert("Minden mező kitöltése kötelező");
    return;
  }
  if (nev.length > 30 || magassag.length > 30 || suly.length > 30) {
    alert("Az egyik mező hosszabb mint 30 karakter");
    return;
  }

  const updateAdat = new URLSearchParams({
    code,
    op: "update",
    id,
    name: nev,
    height: magassag,
    weight: suly
  });

  fetch("http://gamf.nhely.hu/ajax2/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: updateAdat.toString()
  })
  .then(res => res.text())
  .then(valasz => {
    alert("Sikeres UPDATE");
    lekerdezes();
  });
}