class Calculator {
  constructor(previousOperandEle, currentOperandEle) {
    this.previousOperand = previousOperandEle.innerHTML;
    this.currentOperand = currentOperandEle.innerHTML;
    this.operation = "";
  }
  render() {
    if (this.operation) {
      previousOperandEle.innerHTML =
        this.previousOperand + " " + this.operation;
    } else previousOperandEle.innerHTML = this.previousOperand;
    currentOperandEle.innerHTML = this.currentOperand;
  }

  append(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand + number;
    this.render();
  }

  chooseOperation(operation) {
    this.operation = operation;
    if (this.previousOperand) {
      if (this.currentOperand) this.previousOperand = this.compute();
    } else this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.render();
  }

  compute() {
    if (!this.previousOperand || !this.currentOperand) return;

    let result = 0;
    let prev = parseFloat(this.previousOperand);
    let curr = parseFloat(this.currentOperand);
    if (this.operation === "+") result = prev + curr;
    else if (this.operation === "-") result = prev - curr;
    else if (this.operation === "*") result = prev * curr;
    else result = prev / curr;
    this.currentOperand = String(result);
    this.previousOperand = "";
    this.operation = "";
    this.render();
    return String(result);
  }

  delete() {
    if (this.currentOperand) {
      this.currentOperand = this.currentOperand.slice(
        0,
        this.currentOperand.length - 1
      );
    } else if (this.operation) this.operation = "";
    else if (this.previousOperand)
      this.previousOperand = this.previousOperand.slice(
        0,
        this.previousOperand.length - 1
      );
    this.render();
  }
  ac() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = "";
    this.render();
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const acbutton = document.querySelector("[data-ac]");
const deleteButton = document.querySelector("[data-del]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandEle = document.querySelector("[data-previous-operand]");
const currentOperandEle = document.querySelector("[data-current-operand]");

const calc = new Calculator(previousOperandEle, currentOperandEle);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => calc.append(button.innerHTML));
});

operationButtons.forEach((button) =>
  button.addEventListener("click", () => calc.chooseOperation(button.innerHTML))
);

acbutton.addEventListener("click", () => calc.ac());
deleteButton.addEventListener("click", () => calc.delete());
equalsButton.addEventListener("click", () => calc.compute());
