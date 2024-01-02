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
import { AddressComponent } from '../address/address.component';

@Component({
  standalone: true,
  selector: 'reactive-form',
  templateUrl: './template.html',
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    NgFor,
    PhoneComponent,
    AddressComponent
  ],
  styleUrls: ['./style.css']
})

export class FormComponent implements OnInit {
  interestsList = ['Chess', 'Tennis', 'Poker'];
  formModel = {
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl(''),
    privacy: new FormControl(false),
    address: AddressComponent.getControls(),
    phone: PhoneComponent.getControls(true),
    // optionalPhones gets populated via addPhone() method
    optionalPhones: new FormArray<FormGroup>([]),
    interests: new FormArray<FormControl>([]),
    comments: new FormControl()
  };
  myForm;

  constructor() {
    this.myForm = new FormGroup(this.formModel);
  }

  get phone() {
    return this.myForm.controls.phone;
  }

  get address() {
    return this.myForm.controls.address;
  }

  get optionalPhones() {
    return this.myForm.controls.optionalPhones;
  }

  get interests() {
    return this.myForm.controls.interests;
  }

  ngOnInit(): void {
    // add interest controls to model
    this.interestsList.forEach(() => {
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
      console.log(value);
    });
    this.myForm.controls['gender'].valueChanges.subscribe(value => console.log(value));
  }

  // to help with testing we use this fn to popuate the form
  populateForm() {
    // checks all interest checkboxes
    this.interests.controls.forEach(item => {
      item.setValue(true);
    });

    this.address.setValue({
      street: 'Hamilton 123',
      state: 'NY'
    })

    this.myForm.patchValue({
      firstName: 'John',
      lastName: 'Smith',
      gender: 'male',
      privacy: true,
      phone: {
        label: 'Work',
        number: 123456789
      },
      comments: 'I have no comments!'
    });
  }

  resetForm() {
    this.myForm.reset();
    this.phone.setValue({
      label: 'Mobile',
      number: null
    });
    this.optionalPhones.clear();
  }

  addPhone() {
    this.optionalPhones.push(PhoneComponent.getControls(),);
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

