import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { DataService } from '../data.service';
import { PhoneComponent } from '../phone/phone.component';
import { AddressComponent } from '../address/address.component';
import { IForm } from '../app.types';

@Component({
  standalone: true,
  selector: 'reactive-form',
  templateUrl: './form.component.html',
  imports: [
    ReactiveFormsModule,
    PhoneComponent,
    AddressComponent,
    JsonPipe
  ],
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  interestsList = ['Chess', 'Tennis', 'Poker'];
  phoneLabels = ['Phone', 'Mobile', 'Work', 'Home'];

  formModel: IForm = {
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthday: new FormControl(''),
    gender: new FormControl(''),
    privacy: new FormControl(false, [Validators.required]),
    phones: new FormArray([
      new FormGroup({
        label: new FormControl(this.phoneLabels[0]),
        number: new FormControl<number | null>(null, [Validators.required])
      })
    ]),
    interests: new FormArray<FormControl>([]),
    comments: new FormControl()
  };
  myForm;

  constructor(private dataService: DataService) {
    this.myForm = new FormGroup(this.formModel);
    this.logger();
  }

  logger() {
    const logData = {
      value: JSON.stringify(this.myForm.value),
      status:  JSON.stringify(this.myForm.status)
    };
    this.dataService.setData(logData);
  }

  get phones() {
    return this.myForm.controls.phones;
  }

  get interests() {
    return this.myForm.controls.interests;
  }

  ngOnInit(): void {
    // add interest controls to model
    this.interestsList.forEach((item) => {
      console.log(item);
      this.interests.push(new FormControl(false));
    });

    // we can set values of form fields like this
    this.myForm.controls['gender'].setValue('male');

    // we can access form fields in this way
    // const myState = this.myForm.get('address.state')!.value;
    // const rawValues = this.myForm.getRawValue();
    //console.log(myState, rawValues);

    // subscribe to value changes on form or individual fields
    this.myForm.valueChanges.subscribe((value)=>{
      this.logger();
    });
    this.myForm.controls['gender'].valueChanges.subscribe(value => console.log(value));
  }

  // to help with testing we use this fn to popuate the form
  populateForm() {
    // checks all interest checkboxes
    this.interests.controls.forEach(item => {
      item.setValue(true);
    });

    this.myForm.patchValue({
      name: 'John',
      gender: 'male',
      privacy: true,
      email: 'test@gmail.com',
      address: {
        street: 'Hamilton 123',
        state: 'NY'
      },
      phones: [
        {
          label: 'Phone',
          number: 123456789
        }
      ],
      comments: 'I have no comments!'
    });

    console.log(this.myForm.controls.address?.value);
  }

  resetForm() {
    this.myForm.reset();
    this.phones.clear();
    this.phones.push(
      new FormGroup({
        label: new FormControl(this.phoneLabels[0]),
        number: new FormControl<number | null>(null, Validators.required)
      })
    );
  }

  addPhone() {
    const phoneGroup = new FormGroup({
      label: new FormControl(this.phoneLabels[0]),
      number: new FormControl<number | null>(null)
    });

    this.phones.push(phoneGroup);
  }

  submitHandler() {
    //console.log(this.myForm.value);

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

