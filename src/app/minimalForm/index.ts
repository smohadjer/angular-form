import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  FormBuilder
} from '@angular/forms';
import { JsonPipe, NgFor } from '@angular/common';

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

  constructor(private formBuilder: FormBuilder) {
    this.myForm = new FormGroup({
      firstname: new FormControl(''),
      sex: new FormControl(''),
      privacy: new FormControl(true),
      state: new FormControl(this.states[3].abbrev),
      interests: new FormArray([])
    });

    // add checkboxes to interests FormArray
    this.interests.forEach(() => {
      this.interestsFormArray.push(new FormControl(false));
    });
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

    this.myForm.setValue({
      firstname: 'Saeid',
      sex: 'male',
      privacy: true,
      interests: this.interestsFormArray,
      state: this.states[1].abbrev
    });
  }

  submitHandler() {
    // const selectedInterests = this.myForm.value.interests.map((checked: boolean, i:number) => checked ? this.interests[i] : null).filter(v => v !== null);
    // console.log(selectedInterests);

    alert(JSON.stringify(this.myForm.value));
  }
}

