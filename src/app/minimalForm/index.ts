import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgFor } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators
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

export class MinimalFormComponent implements OnInit {
  myForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    sex: new FormControl(''),
    privacy: new FormControl(false),
    address: new FormGroup({
      street: new FormControl(''),
      state: new FormControl(''),
      phones: new FormArray([
        new FormControl('')
      ])
    }),
    interests: new FormArray([
      new FormControl(false)
    ]),
    comments: new FormControl()
  });

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

  ngOnInit(): void {
    console.log('init');
  }

  constructor() {
    // add checkboxes to interests FormArray
    this.interestsFormArray.clear();
    this.interests.forEach(() => {
      this.interestsFormArray.push(new FormControl(false));
    });

    // we can set values of form fields like this
    this.myForm.controls['sex'].setValue('male');

    // we can access form fields in this way
   // const street = this.myForm.value.address.street;
    const myState = this.myForm.get('address.state')!.value;
    const rawValues = this.myForm.getRawValue();
    //console.log(street, myState, rawValues);

    // subscribe to value changes on form or individual fields
    this.myForm.valueChanges.subscribe((value)=>{
      console.log(value);
    });
    this.myForm.controls['sex'].valueChanges.subscribe(value => console.log(value));
  }

  addPhone() {
    this.myForm.controls.address.controls.phones.push(new FormControl(''));
  }

  removePhone(index: number) {
    this.myForm.controls.address.controls.phones.removeAt(index);
  }

  get interestsFormArray() {
    return this.myForm.controls.interests;
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
        phones: [
          '123456789'
        ]
      },
      comments: 'I have no comments!'
    });
  }

  resetForm() {
    this.myForm.reset();
  }

  submitHandler() {
    // const selectedInterests = this.myForm.value.interests.map((checked: boolean, i:number) => checked ? this.interests[i] : null).filter(v => v !== null);
    // console.log(selectedInterests);

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

