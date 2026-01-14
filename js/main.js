// # UTILITY

const instructions1 = "Memorizza i numeri entro il tempo limite!";
const instructions2 = "Scrivi i numeri che ricordi di aver visto!";
const timer = 31; // 30 secondi + 1 per gestire la partenza
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
const progress = document.getElementById("progress");

// # CARICAMENTO PAGINA

instructionsMessage.innerText = instructions1;

// generazione numeri casuali
const generatedNumbers = [];
for (let i = 0; i < cardinality; i++) {
  let currentNumber = generateRandomNumber(minValue, maxValue);
  // prevenzione numeri uguali. Non metto altre condizioni di uscita dal while, confidando che la generazione randomica giunga a numeri diversi in un tempo ragionevole per sua natura.
  while (generatedNumbers.includes(currentNumber)) {
    currentNumber = generateRandomNumber(minValue, maxValue);
  }
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

  //validazione input - valori
  let isInvalid = false;
  for (let i = 0; i < inputNumbers.length; i++) {
    const currentNumber = inputNumbers[i];
    if (
      isNaN(currentNumber) ||
      currentNumber < minValue ||
      currentNumber > maxValue
    ) {
      isInvalid = true;
      break;
    }
  }

  // validazione input - duplicati
  let isDuplicate = false;
  const inputNumbersAlias = Array.from(inputNumbers);
  while (inputNumbersAlias.length > 0) {
    const currentNumber = inputNumbersAlias.shift();
    if (inputNumbersAlias.includes(currentNumber)) {
      isDuplicate = true;
      break;
    }
  }

  // se il controllo passa vado alle fasi successive, altrimenti segnalo tramite alert la presenza di errori
  if (!isDuplicate && !isInvalid) {
    // filtro numeri inseriti uguali a nuumeri generati
    const guessedNumbers = inputNumbers.filter((el) =>
      generatedNumbers.includes(el)
    );

    // risposta in output
    if (guessedNumbers.length > 0 && guessedNumbers.length < cardinality) {
      message.classList = "text-warning text-center";
    } else if (guessedNumbers.length === cardinality) {
      message.classList = "text-success text-center";
    } else {
      message.classList = "text-danger text-center";
    }
    message.innerText = `Hai indovinato ${guessedNumbers.length}/${cardinality} numeri: (${guessedNumbers})\n\nNumeri da indovinare: (${generatedNumbers})\nNumeri inseriti: (${inputNumbers})`;
  } else {
    if (isInvalid) {
      alert(
        `🚨ATTENZIONE🚨\n\nInserimento non valido!\n\nSi accettano solo numeri interi compresi tra ${minValue} e ${maxValue}`
      );
    }
    if (isDuplicate) {
      alert("🚨ATTENZIONE🚨\n\nCi sono duplicati tra i numeri inseriti!");
    }
  }
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

  const percent = ((timer - countdownTimer) * 100) / (timer - 1);
  progress.style.width = `${percent}%`;
  progress.style.backgroundColor =
    percent < 50 ? "green" : percent < 75 ? "orange" : "orangered";
}
