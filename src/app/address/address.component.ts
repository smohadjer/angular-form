import { Component, Input, OnInit } from '@angular/core';
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
  @Input() parentFormGroup!: FormGroup;
  addressFormGroup: FormGroup = new FormGroup({
    street: new FormControl('', Validators.required),
    state: new FormControl(),
  });

  // to populate state dropdown in template
  states = [
    {name: 'Arizona', abbrev: 'AZ'},
    {name: 'California', abbrev: 'CA'},
    {name: 'Colorado', abbrev: 'CO'},
    {name: 'New York', abbrev: 'NY'},
    {name: 'Pennsylvania', abbrev: 'PA'},
  ];

  constructor() {}

  ngOnInit(): void {
    this.parentFormGroup.addControl('address', this.addressFormGroup);
  }

  public get isValid(): boolean {
    return this.addressFormGroup.valid;
  }

  public get isDirty(): boolean {
    return this.addressFormGroup.dirty;
  }
}
