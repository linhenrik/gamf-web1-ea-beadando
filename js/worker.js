onmessage = function () {
    let szam = 0;
    for (let i = 0; i < 150000; i++) {
      szam += i;
    }
    postMessage("A számok összeadva: " + szam);
  };