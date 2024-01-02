import { Component, Input } from '@angular/core';
import { JsonPipe, NgFor } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [
    ReactiveFormsModule, JsonPipe, NgFor
  ],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css'
})
export class PhoneComponent {
  @Input() form!: FormGroup;

  phoneLabels = ['Mobile', 'Work', 'Home'];

  static addControls(): FormGroup {
    return new FormGroup({
        label: new FormControl('Mobile'),
        number: new FormControl('')
     });
  }

  get phones() {
    return this.form.controls.phones as FormArray;
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  addPhone() {
    const phoneControls = PhoneComponent.addControls();
    this.phones.push(phoneControls);
  }
}
