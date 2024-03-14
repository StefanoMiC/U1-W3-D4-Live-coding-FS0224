// voglio generare 31 celle dinamicamente
const now = new Date();

const generateCells = days => {
  const calendar = document.querySelector(".calendar");
  const todayNum = now.getDate();

  for (let i = 0; i < days; i++) {
    const dayCellDiv = document.createElement("div");
    dayCellDiv.className = "day";

    const dayCellH3 = document.createElement("h3");
    dayCellH3.innerText = i + 1;

    if (i + 1 === todayNum) {
      dayCellH3.classList.add("currentDay");
    }

    dayCellDiv.appendChild(dayCellH3);
    calendar.appendChild(dayCellDiv);
  }
};

// voglio poi poter fare in modo che il numero massimo di giorni sia specifico in base al mese corrente

const changeMonthName = () => {
  const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  const h1 = document.querySelector("h1");

  const monthIndex = now.getMonth();
  h1.innerText = months[monthIndex];
};

const daysInThisMonth = () => {
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const lastDayDate = new Date(currentYear, currentMonth + 1, 0);
  const lastDayOfThisMonth = lastDayDate.getDate();
  return lastDayOfThisMonth;
};
// voglio poter cambiare il nome del mese con quello corrente

const days = daysInThisMonth();

window.onload = () => {
  generateCells(days);
  changeMonthName();
};
