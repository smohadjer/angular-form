import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgFor } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { PhoneComponent } from '../phone/phone.component';

@Component({
  standalone: true,
  selector: 'minimal-form',
  templateUrl: './template.html',
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    NgFor,
    PhoneComponent
  ],
  styleUrls: ['./style.css']
})

export class FormComponent implements OnInit {
  states = [
    {name: 'Arizona', abbrev: 'AZ'},
    {name: 'California', abbrev: 'CA'},
    {name: 'Colorado', abbrev: 'CO'},
    {name: 'New York', abbrev: 'NY'},
    {name: 'Pennsylvania', abbrev: 'PA'},
  ];
  interests = ['Chess', 'Tennis', 'Poker'];
  myModel = {
    firstName: new FormControl('', Validators.required),
    sex: new FormControl(''),
    privacy: new FormControl(false),
    address: new FormGroup({
      street: new FormControl(''),
      state: new FormControl(),
    }),
    phone: PhoneComponent.getControls(true),
    optionalPhones: new FormArray<FormGroup>([]),
    interests: new FormArray([
      new FormControl(false)
    ]),
    comments: new FormControl()
  };
  myForm;

  constructor() {
    this.myForm = new FormGroup(this.myModel);
  }

  ngOnInit(): void {
    // add checkboxes to interests FormArray
    this.interestsFormArray.clear();
    this.interests.forEach(() => {
      this.interestsFormArray.push(new FormControl(false));
    });

    // we can set values of form fields like this
    this.myForm.controls['sex'].setValue('male');

    // we can access form fields in this way
    const myState = this.myForm.get('address.state')!.value;
    const rawValues = this.myForm.getRawValue();
    //console.log(myState, rawValues);

    // subscribe to value changes on form or individual fields
    this.myForm.valueChanges.subscribe((value)=>{
      console.log(value);
    });
    this.myForm.controls['sex'].valueChanges.subscribe(value => console.log(value));
  }

  get interestsFormArray() {
    return this.myForm.controls.interests as FormArray;
  }

  setAllInterestsToTrue() {
    this.interestsFormArray.clear();
    this.interests.forEach(() => {
      this.interestsFormArray.push(new FormControl(true));
    });
  }

  populateForm() {
    this.setAllInterestsToTrue();

    this.myForm.patchValue({
      firstName: 'Saeid',
      sex: 'male',
      privacy: true,
      address: {
        street: 'Buchenstr. 1',
        state: this.states[1].abbrev,
      },
      comments: 'I have no comments!'
    });
  }

  resetForm() {
    this.myForm.reset();
    this.myForm.controls.optionalPhones.clear();
  }

  addPhone() {
    this.myForm.controls.optionalPhones.push(PhoneComponent.getControls(false),);
  }

  submitHandler() {
    console.log(this.myForm.value);

    fetch('api/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.myForm.value)
    })
    .then(response => response.json())
    .then(json => alert(JSON.stringify(json)));
  }
}

