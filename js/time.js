function startClock(id) {
  function update() {
    const now = new Date();

    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true   
    });

    document.getElementById(id).textContent = time;
  }

  update();
  setInterval(update, 1000);
}

startClock("clock");