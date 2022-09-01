//program utama kalkulator
var input = 0
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }

    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() {
      this.currentOperand = ''
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      let selfcount
      const current = parseFloat(this.currentOperand)
      if (this.currentOperand === '') return
      switch (operation) {
        case '%':
          selfcount = current / 100
          this.currentOperand = selfcount
          return
        case '+/-':
          selfcount = current * (-1)
          this.currentOperand = selfcount
          return
        default:
          break
      }
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '/':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  const tema = document.querySelector('[data-tema]')
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

  //inputan screen

  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (input){
        calculator.clear()
        calculator.updateDisplay()
        input = 0
      }
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      input = 0
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
    input = 1
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
    input = 1
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })

//inputan keyboard

  document.addEventListener('keydown', (event) =>{
    let operand
    let plusminus = 0
    let equal = 0
    let clear = 0
    let allClear = 0
    switch (event.key){
      case '%':
        operand = '%'
      break
      case '/':
        operand = '/'
      break
      case '*':
        operand = '*'
      break
      case '-':
        operand = '-'
      break
      case '+':
        operand = '+'
      break
      case '=':
        equal = 1
      break
      case 'c':
        clear = 1
      break
      case 'a':
        allClear = 1
      break
      case 'C':
        clear = 1
      break
      case 'A':
        allClear = 1
      break
      case 'Delete':
        allClear = 1
      break
      case 'Backspace':
        clear = 1
      break
      case 'M':
        plusminus = 1
      break
      case 'm':
        plusminus = 1
      break
      default:
      break
    }
    if (9 >= event.key || event.key === '.'){
    if (input){
      calculator.clear()
      calculator.updateDisplay()
      input = 0
    }
    calculator.appendNumber(event.key)
    calculator.updateDisplay()}
    else{
      if(operand){
        calculator.chooseOperation(operand)
        input = 0
        calculator.updateDisplay()
      }   
      if(equal){
        calculator.compute()
        calculator.updateDisplay()
        input = 1
        equal = 0
      }
      if(clear){
        calculator.delete()
        calculator.updateDisplay()
        clear = 0
      }
      if(allClear){
        calculator.clear()
        calculator.updateDisplay()
        input = 1
        allClear = 0
      }
      if(plusminus){
        calculator.chooseOperation('+/-')
        input = 0
        calculator.updateDisplay()
        plusminus = 0
      }
    }
  })

//pengganti tema

var r = document.querySelector(':root')
var t = 0

function theme_set() {
    if(t){
      r.style.setProperty('--text-primary', 'white')
      r.style.setProperty('--bg-primary', 'grey')
      r.style.setProperty('--bg-primary-shadow', 'rgba(128,128,128,0.5)')
      r.style.setProperty('--bg-second','black')
      t = 0
      return
    }
    r.style.setProperty('--text-primary', 'rgb(74, 83, 37)')
    r.style.setProperty('--bg-primary', 'rgb(218, 242, 129)')
    r.style.setProperty('--bg-primary-shadow', 'rgba(218, 242, 129, 0.5)')
    r.style.setProperty('--bg-second', 'rgba(68, 86, 3,0.3)')
    t = 1
 }


tema.addEventListener('click', button => {
  theme_set()
})
