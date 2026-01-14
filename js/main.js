// # UTILITY

const instructions1 = "Memorizza i numeri entro il tempo limite!";
const instructions2 = "Scrivi i numeri che ricordi di aver visto!";
const timer = 4; // 30 secondi + 1 per gestire la partenza
const interval = 1000; // 1 secondo
const minValue = 1;
const maxValue = 50;
const cardinality = 5; // quanti numeri da memorizzare

// # ACQUISIZIONE ELEMENTI DOM

const countdownNumber = document.getElementById("countdown");
const instructionsMessage = document.getElementById("instructions");
const numbersList = document.getElementById("numbers-list");
const anwersForm = document.getElementById("answers-form");
const inputGroup = document.getElementById("input-group");
const buttonConfirm = document.getElementById("button-confirm");
const message = document.getElementById("message");

// # CARICAMENTO PAGINA

instructionsMessage.innerText = instructions1;

// generazione numeri casuali
const generatedNumbers = [];
for (let i = 0; i < cardinality; i++) {
  let currentNumber = generateRandomNumber(minValue, maxValue);
  generatedNumbers.push(currentNumber);
  numbersList.innerHTML += `<li>${currentNumber}</li>`;
}

// gestione del countdown
let countdownTimer = timer;
handleCountdown();
const countdownID = setInterval(handleCountdown, interval);

// # INVIO DATI INSERITI

anwersForm.addEventListener("submit", (e) => {
  // preveniamo il default
  e.preventDefault();

  // acquisisco i numeri inseriti da utente
  const inputNumbers = Array.from(inputGroup.children).map((el) =>
    parseInt(el.value)
  );

  // filtro numeri inseriti uguali a nuumeri generati
  const guessedNumbers = inputNumbers.filter((el) =>
    generatedNumbers.includes(el)
  );

  // risposta in output
  message.innerText = `Hai indovinato ${guessedNumbers.length} numeri! => ${guessedNumbers}\n\nNumeri da indovinare: ${generatedNumbers}\nNumeri inseriti: ${inputNumbers}`;
});

// # FUNZIONI

/**
 *  This function receives a min and a max number (max > min) and generates a random number between min and max.
 *
 * @param {number} min the min value
 * @param {number} max the max value
 * @returns {number} the generated random number
 */
function generateRandomNumber(min, max) {
  if (max > min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  } else {
    throw new Error("Parametri non validi per la generazione del numero!");
  }
}

function handleCountdown() {
  if (countdownTimer > 1) {
    countdownTimer--;
    countdownNumber.innerText = countdownTimer;
  } else {
    clearInterval(countdownID);
    countdownNumber.classList.add("d-none");
    numbersList.classList.add("d-none");
    instructionsMessage.innerText = instructions2;
    anwersForm.classList.remove("d-none");
  }
}
