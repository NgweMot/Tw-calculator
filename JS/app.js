const previousDataText = document.querySelector("#previousDataText");
const currentDataText = document.querySelector("#currentDataText");
const dataNumberButtons = document.querySelectorAll(".data-number");
const dataOperatorButtons = document.querySelectorAll(".data-operator");
const ACButton = document.querySelector("#ACButton");
const DelButton = document.querySelector("#DelButton");
const equalButton = document.querySelector("#equalButton");
const output = document.querySelector("#output");

class Calculator {
  constructor(previousDataText, currentDataText) {
    this.previousDataText = previousDataText;
    this.currentDataText = currentDataText;
    this.clear();
  }
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.currentDataText.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousDataText.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )}${this.operation}`;
    }else{
        this.previousDataText.innerText=""  ;
    }
  }
}

const calculator = new Calculator(previousDataText, currentDataText);
dataNumberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
dataOperatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
ACButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
DelButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
