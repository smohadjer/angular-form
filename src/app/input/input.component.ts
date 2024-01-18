import { Component, Input, OnInit } from '@angular/core';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  template: `
    <div>
      <label>{{label}}: <span *ngIf="isRequired">*</span></label>
      <input type="{{type}}" [formControl]="parentFormControl">
    </div>
  `,
  styleUrl: './input.component.css'
})
export class InputComponent implements OnInit {
  @Input() label = '';
  @Input() parentFormControl!: FormControl;
  @Input() isRequired = false;
  @Input() type = 'text';

  constructor() {}

  ngOnInit(): void {}
}
