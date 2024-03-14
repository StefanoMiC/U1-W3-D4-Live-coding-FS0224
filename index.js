// voglio generare 31 celle dinamicamente

const now = new Date(); // estrae il momento nel tempo attuale in cui si esegue in forma di data
// 7a) creo un array generale che conterrà dei sotto-array per rappresentare il calendario esterno e le celle interne
const appointments = [];
// vedi ciclo for per la generazione delle celle interne dell'array
/*
    [ 
    [],[],[],[],[],[],[],
    [],[],[],[],[],[],[],
    [],[],[],[],[],[],[],
    [],[],[],[],[],[],[],
    [],[],[],
    ]
  */

// 6) cambiare numero in newMeetingDay
const changeDayNumber = num => {
  const dayNumberSpan = document.getElementById("newMeetingDay");
  dayNumberSpan.innerText = num;
  dayNumberSpan.classList.add("hasDay");
};

const showAppointments = dayIndex => {
  const appointmentsContainer = document.getElementById("appointments");
  const appointmentsList = document.getElementById("appointmentsList");

  appointmentsList.innerHTML = "";

  const appointmentsOnSelectedDay = appointments[dayIndex];
  console.log("SELECTED DAY", appointmentsOnSelectedDay);

  appointmentsOnSelectedDay.forEach(string => {
    const li = document.createElement("li");
    li.innerText = string;

    appointmentsList.appendChild(li);
  });

  appointmentsContainer.style.display = "block";
};

// 7c) salvare appuntamento
const saveMeeting = event => {
  event.preventDefault(); // da fare sempre per una funzione collegata al submit di un form

  // se siamo qua il bottone save meeting è stato cliccato e i dati sono sicuramente contenuti nei due input (altrimenti la funzione non parte)
  const meetingTime = document.getElementById("newMeetingTime"); // riferimento all'input type "time"
  const meetingName = document.getElementById("newMeetingName"); // riferimento all'input type "text"

  const meetingText = meetingTime.value + " — " + meetingName.value;

  const dayString = document.getElementById("newMeetingDay").innerText; // stringa col numero del giorno

  const dayIndex = parseInt(dayString) - 1; // la stringa del numero viene convertita e il numero portato in base 0 per avere l'indice corrispondente al giorno
  // andiamo a selezionare la posizione corrispondente nell'array appointments
  appointments[dayIndex].push(meetingText); // inserimento della stringa nel sotto array corrispondente

  showAppointments(dayIndex); // abilitiamo la sezione appuntamenti passando l'indice del giorno di cui vogliamo visualizzare gli appuntamenti
};

// 2) creazione dinamica delle celle in base al numero di giorni in arrivo come parametro
const generateCells = days => {
  const calendar = document.querySelector(".calendar");

  for (let i = 0; i < days; i++) {
    // 7b) generiamo le posizioni dell'array globale appointments
    appointments.push([]); // questo ci crea tutte e 31 le celle vuote dentro l'array

    // generiamo le nostre celle per ogni giorno...
    const dayCellDiv = document.createElement("div");
    dayCellDiv.className = "day";

    const dayCellH3 = document.createElement("h3");
    dayCellH3.innerText = i + 1; // aggiungo il numero del giorno in base 1 all'h3

    // 5a) su OGNI cella del calendario agganciamo una funzione (eventListener), per tutti specifica e un po' diversa nel contenuto
    // la funzione si eseguirà SOLO SE l'utente cliccherà una cella
    dayCellDiv.onclick = event => {
      // 5b) gestiamo la selezione / deselezione delle celle
      const previouslySelected = calendar.querySelector(".selected");
      console.log("PREV SEL", previouslySelected);
      if (previouslySelected) {
        previouslySelected.classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");

      // 6) gestione del cambio del numero nello span del form in basso
      changeDayNumber(i + 1);

      // gestione della sezione appuntamenti dopo ogni click sulle celle del calendario
      // 8) per ogni click di una cella del calendario controlla se ci sono appuntamenti nello spazio corrispondente all'array appointments
      console.log(appointments[i]);
      if (appointments[i].length > 0) {
        // se ci sono, avvia la funzione per gestire la visualizzazione degli appuntamenti, e passagli l'indice dell'elemento cliccato
        showAppointments(i);
      } else {
        // in caso contrario, se l'array del giorno è ancora vuoto, nascondi la sezione appointments
        const appointmentsContainer = document.getElementById("appointments");
        appointmentsContainer.style.display = "none";
      }
    };
    // 3) illuminiamo il giorno corrente
    const todayNum = now.getDate(); // verifichiamo l'effetivo numero del giorno di oggi, a partire dalla data precedentemente estratta (vedi sopra)

    if (i + 1 === todayNum) {
      // confrontiamo il numero del ciclo +1 con il numero del giorno,
      // se matchano vogliamo colorare la cella che viene creata in questo ciclo, prima che venga inserita nel DOM
      dayCellH3.classList.add("currentDay"); // applichiamo una classe già definita nel nostro CSS
    }

    // questo è il momento in cui le celle cominceranno ad esistere nella pagina e di conseguenza nel calendario
    dayCellDiv.appendChild(dayCellH3);
    calendar.appendChild(dayCellDiv);
  }
};

// 4b)
const changeMonthName = () => {
  // preparo un array con i nomi dei mesi
  const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  const h1 = document.querySelector("h1");

  // prendiamo l'indice del mese corrente
  const monthIndex = now.getMonth();
  // usiamo l'indice per selezionare la posizione nell'array di mesi e salviamo quella stringa trovata nell'innerText dell'h1
  h1.innerText = months[monthIndex];
};

// voglio poi poter fare in modo che il numero massimo di giorni sia specifico in base al mese corrente
// 1) abbiamo il valore numerico, di nr di giorni in questo mese, in uscita dalla funzione daysInThisMonth
const daysInThisMonth = () => {
  const currentYear = now.getFullYear(); // 2024
  const currentMonth = now.getMonth(); // 2 per marzo (alla data attuale di registrazione)

  const lastDayDate = new Date(currentYear, currentMonth + 1, 0); // anno attuale, mese attuale + 1, giorno zero (ultimo giorno mese precedente)
  const lastDayOfThisMonth = lastDayDate.getDate(); // mi torna indietro SOLO il numero del giorno (l'ultmio del mese corrente)
  return lastDayOfThisMonth; // 31 (nel mese attuale)

  // si può riassumere in questa forma:
  // return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
};

// 👇👇👇 punto di avvio di tutta la nostra app
window.onload = () => {
  const days = daysInThisMonth();
  // 7d) prendo il form e gli aggancio la funzione saveMeeting all'evento submit (scatenato dal click sul bottone save meeting)
  const form = document.querySelector("form");
  form.addEventListener("submit", saveMeeting);

  generateCells(days);
  // 4a) voglio poter cambiare il nome del mese con quello corrente
  changeMonthName();
};
