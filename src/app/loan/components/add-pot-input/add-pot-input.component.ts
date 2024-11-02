import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlowerpotService } from '../../../pot/services/flowerpot.service';

@Component({
  selector: 'app-add-pot-input',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-pot-input.component.html',
  styleUrl: './add-pot-input.component.css'
})
export class AddPotInputComponent {
  constructor(private router: Router, private flowerpotService: FlowerpotService) {}

  input1Value: string = '';
  input2Value: string = '';
  input3Value: string = '';
  input4Value: string = '';
  input5Value: string = '';

  soloNumeroLetras(event: any, inputField: 'input1Value' | 'input2Value' | 'input3Value' | 'input4Value' | 'input5Value') {
    const inputValue = event.key;
    const isLetterOrNumber: boolean = /^[0-9a-zA-Z]*$/.test(inputValue);
    const currentValue = this[inputField];

    if (!isLetterOrNumber || currentValue.length >= 1) {
        event.preventDefault();
    } else {
        this[inputField] += inputValue.toUpperCase();
    }
  }

  onSave() {
    const code = this.input1Value + this.input2Value + this.input3Value + this.input4Value + this.input5Value;

    this.flowerpotService.getFlowerpotByCode(code).subscribe(
      (flowerpot) => {

        this.router.navigate(['/code/confirmation', "valid"]);
      },
      (error) => {
        this.router.navigate(['/code/confirmation', "invalid"]);
      });
  }
}
