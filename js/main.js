// # ACQUISIZIONE ELEMENTI DOM

const countdownNumber = document.getElementById("countdown");
const instructionsMessage = document.getElementById("instructions");
const numbersList = document.getElementById("numbers-list");
const anwersForm = document.getElementById("answers-form");
const inputGroup = document.getElementById("input-group");
const buttonConfirm = document.getElementById("button-confirm");
const message = document.getElementById("message");

// # CARICAMENTO PAGINA

for (let i = 0; i < 5; i++) {
  numbersList.innerHTML += `<li>${generateRandomNumber(1, 50)}</li>`;
}

let countdownTimer = 31;
handleCountdown();
const countdownID = setInterval(handleCountdown, 1000);

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
  console.log(countdownTimer);
  countdownTimer > 0 ? countdownTimer-- : clearInterval(countdownID);
  countdownNumber.innerText = countdownTimer;
}
