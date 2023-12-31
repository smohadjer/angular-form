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
  selector: 'app-phone',
  standalone: true,
  imports: [
    ReactiveFormsModule, NgFor, NgIf
  ],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css'
})

export class PhoneComponent {
  @Input() myGroup!: FormGroup;
  @Input() required: boolean = false;
  @Input() index: number = -1;

  // used in template to populate label dropdown
  phoneLabels = ['Mobile', 'Work', 'Home'];

  static getControls(required?: boolean): FormGroup {
    return new FormGroup({
        // we use Mobile as default label for phone
        label: new FormControl('Mobile'),
        number: required ? new FormControl('', Validators.required)
          : new FormControl('')
     });
  }

  constructor() {}

  removePhone(index: number) {
    const optionalPhones = this.myGroup.parent as FormArray;
    optionalPhones.removeAt(index);
  }
}
