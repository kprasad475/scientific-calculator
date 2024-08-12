import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  displayValue: string = '';
  buttons: string[] = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'sin', 'cos', 'tan', 'C'
  ];

  onButtonClick(button: string) {
    if (button === 'C') {
      this.displayValue = '';
    } else if (button === '=') {
      this.calculate();
    } else if (['sin', 'cos', 'tan'].includes(button)) {
      this.displayValue = `${button}(${this.displayValue})`;
      this.calculate();
    } else {
      this.displayValue += button;
    }
  }

  calculate() {
    try {
      this.displayValue = eval(this.displayValue.replace('sin', 'Math.sin')
        .replace('cos', 'Math.cos')
        .replace('tan', 'Math.tan'));
    } catch (e) {
      this.displayValue = 'Error';
    }
  }
}
