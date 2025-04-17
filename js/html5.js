function mentes() {
  const ertek = document.getElementById("storageInput").value;
  localStorage.setItem("szoveg", ertek);
}
  
function betoltes() {
  const ertek = localStorage.getItem("szoveg") || "Nincs adat.";
  document.getElementById("storageOutput").textContent = ertek;
}
  
let worker;
function elinditWorker() {
  if (!worker) {
    worker = new Worker("js/worker.js");
    worker.onmessage = function (event) {
      document.getElementById("workerOutput").textContent = event.data;
    };
  }
  worker.postMessage("start");
}
  
function pozicio() {
  navigator.geolocation.getCurrentPosition((poz) => {
    document.getElementById("geoOutput").textContent =
      `Szélesség: ${poz.coords.latitude}, Hosszúság: ${poz.coords.longitude}`;
  });
}
  
function allowDrop(ev) {
  ev.preventDefault();
}
  
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev) {
  ev.preventDefault();
  const adat = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(adat));
}
  
window.onload = function () {
  const vaszon = document.getElementById("vaszon");
  const ctx = vaszon.getContext("2d");
  ctx.fillStyle = "blue";
  ctx.fillRect(10, 10, 150, 75);
};

let kapcsolat;
kapcsolat = new EventSource("sse.php");
  
kapcsolat.onmessage = function(event) {
  document.getElementById("sseKimenet").textContent = event.data;
};
  
kapcsolat.onerror = function() {
  document.getElementById("sseKimenet").textContent = "A kapcsolat megszakadt.";
};
  
function leallitas() {
  if (kapcsolat) {
    kapcsolat.close();
    document.getElementById("sseKimenet").textContent = "A kapcsolat leállítva.";
  }
}