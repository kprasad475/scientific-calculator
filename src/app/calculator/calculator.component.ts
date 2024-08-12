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
      this.displayValue = this.evaluateExpression(this.displayValue);
    } catch (e) {
      this.displayValue = 'Error';
    }
  }

  evaluateExpression(expr: string): string {
    // Replace mathematical functions with Math object functions
    expr = expr.replace(/sin/g, 'Math.sin')
               .replace(/cos/g, 'Math.cos')
               .replace(/tan/g, 'Math.tan');
    
    // Use Function constructor to safely evaluate the expression
    return Function('"use strict";return (' + expr + ')')();
  }
}
