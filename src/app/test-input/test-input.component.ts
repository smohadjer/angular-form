import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-test-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <fieldset class="noborder" [formGroup]="childForm">
      <div>
        <label>First name: *</label>
        <input type="text" formControlName="firstName" required>
      </div>
  </fieldset>
  `,
  styleUrl: './test-input.component.css'
})
export class TestInputComponent {
  @Input()
  public childForm!: FormGroup;

  constructor() {}

  static addTestInput(): FormControl {
    return new FormControl('', Validators.required);
  }
}
