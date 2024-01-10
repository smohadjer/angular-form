import { Component, Input } from '@angular/core';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    ReactiveFormsModule, NgFor, NgIf
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})

export class AddressComponent {
  @Input() myGroup: FormGroup = new FormGroup({});

  // to populate state dropdown in template
  states = [
    {name: 'Arizona', abbrev: 'AZ'},
    {name: 'California', abbrev: 'CA'},
    {name: 'Colorado', abbrev: 'CO'},
    {name: 'New York', abbrev: 'NY'},
    {name: 'Pennsylvania', abbrev: 'PA'},
  ];

  constructor() {}
}
