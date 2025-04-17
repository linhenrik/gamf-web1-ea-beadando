const tabla = document.getElementById("adatTabla");
const vaszon = document.getElementById("diagram");
let chart;

tabla.addEventListener("click", function (esemeny) {
  const sor = esemeny.target.closest("tr");
  if (!sor) return;

  const ertekek = Array.from(sor.children).map(td => Number(td.textContent));

  if (chart) chart.destroy();

  chart = new Chart(vaszon, {
    type: "line",
    data: {
      labels: ["1.", "2.", "3.", "4.", "5."],
      datasets: [{
        label: "Kiválasztott sor",
        data: ertekek,
        borderColor: "blue",
        backgroundColor: "lightblue",
        fill: false,
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});