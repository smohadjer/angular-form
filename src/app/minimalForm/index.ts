import { Component } from '@angular/core';
import { JsonPipe, NgFor } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'minimal-form',
  templateUrl: './template.html',
  imports: [
    ReactiveFormsModule, JsonPipe, NgFor
  ],
  styleUrls: ['./style.css']
})

export class MinimalFormComponent {
  myForm: FormGroup;
  states = [
    {name: 'Arizona', abbrev: 'AZ'},
    {name: 'California', abbrev: 'CA'},
    {name: 'Colorado', abbrev: 'CO'},
    {name: 'New York', abbrev: 'NY'},
    {name: 'Pennsylvania', abbrev: 'PA'},
  ];
  interests = [
    'chess',
    'tennis',
    'poker'
  ]

  constructor() {
    this.myForm = new FormGroup({
      firstname: new FormControl(''),
      sex: new FormControl(''),
      privacy: new FormControl(false),
      address: new FormGroup({
        street: new FormControl(''),
        state: new FormControl(null),
      }),
      interests: new FormArray([])
    });

    // add checkboxes to interests FormArray
    this.interests.forEach(() => {
      this.interestsFormArray.push(new FormControl(false));
    });

    // we can set values of form fields like this
    this.myForm.controls['sex'].setValue('male');

    // we can access form fields in this way
    const street = this.myForm.value.address.street;
    const myState = this.myForm.get('address.state')!.value;
    const rawValues = this.myForm.getRawValue();
    console.log(street, myState, rawValues);

    // subscribe to value changes on form or individual fields
    this.myForm.valueChanges.subscribe((value)=>{
      console.log(value);
    });
    this.myForm.controls['sex'].valueChanges.subscribe(value => console.log(value));
  }

  get interestsFormArray() {
    return this.myForm.controls['interests'] as FormArray;
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
      firstname: 'Saeid',
      sex: 'male',
      privacy: true,
      address: {
        street: 'Buchenstr. 1',
        state: this.states[1].abbrev
      }
    });
  }

  resetForm() {
    this.myForm.reset();
  }

  submitHandler() {
    // const selectedInterests = this.myForm.value.interests.map((checked: boolean, i:number) => checked ? this.interests[i] : null).filter(v => v !== null);
    // console.log(selectedInterests);

    alert(JSON.stringify(this.myForm.value));
  }
}

