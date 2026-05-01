document.querySelectorAll("table").forEach(table => {
  let i = 1;

  table.querySelectorAll("tbody tr").forEach(row => {
    const firstCell = row.querySelector("td");

    if (firstCell) {
      firstCell.textContent = `[${i}]`;
      i++;
    }
  });
});