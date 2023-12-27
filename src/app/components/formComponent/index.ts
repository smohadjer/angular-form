import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputComponent } from '../inputComponent';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent
  ],
  template: `
    <form method="POST" action="api/form">
      <app-input [label]="labelFirstName" [name]="nameFirstName"></app-input>
      <app-input [label]="labelLastName" [name]="nameLastName"></app-input>
      <button>Submit</button>
    </form>
  `,
  styleUrl: './style.css'
})

export class FormComponent {
  labelFirstName = "First name";
  nameFirstName = "first-name";
  labelLastName = "Last name";
  nameLastName = "last-name";
}


