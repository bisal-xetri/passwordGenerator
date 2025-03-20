// Get DOM elements
const resultElem = document.getElementById("result");
const lengthElem = document.getElementById("length");
const upperCaseElem = document.getElementById("uppercase");
const lowerCaseElem = document.getElementById("lowercase");
const symbolElem = document.getElementById("symbols");
const numbersElem = document.getElementById("numbers");
const generateElem = document.getElementById("generate");
const clipboardElem = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Generate event listener
generateElem.addEventListener("click", () => {
  let length = +lengthElem.value;
  // Ensure password length is within the valid range
  if (length < 4) {
    length = 4;
    lengthElem.value = 4; // Reset input field to minimum allowed value
  } else if (length > 20) {
    length = 20;
    lengthElem.value = 20; // Reset input field to maximum allowed value
  }

  const hasLower = lowerCaseElem.checked;
  const hasUpper = upperCaseElem.checked;
  const hasSymbol = symbolElem.checked;
  const hasNumber = numbersElem.checked;

  resultElem.innerText = generatePassword(
    length,
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol
  );
});

// Generate password function
function generatePassword(length, lower, upper, number, symbol) {
  let generatedPassword = "";
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesArr.length === 0) {
    return "Select at least one option!";
  }

  while (generatedPassword.length < length) {
    const randomType = typesArr[Math.floor(Math.random() * typesArr.length)];
    const funcName = Object.keys(randomType)[0];
    generatedPassword += randomFunc[funcName]();
  }

  return generatedPassword;
}

// Function to get random lowercase letter
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Function to get random uppercase letter
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Function to get random number
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Function to get random symbol
function getRandomSymbol() {
  const symbolChars = "!@#$%^&*_+|()=-";
  return symbolChars[Math.floor(Math.random() * symbolChars.length)];
}

// Clipboard functionality
clipboardElem.addEventListener("click", () => {
  const password = resultElem.innerText;
  if (!password) return;

  navigator.clipboard.writeText(password).then(() => {
    alert("Password copied to clipboard!");
  });
});
