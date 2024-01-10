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
  @Input() myGroup: FormGroup = new FormGroup({});
  @Input() required: boolean = false;
  @Input() index: number = -1;

  // used in template to populate label dropdown
  phoneLabels = ['Mobile', 'Work', 'Home'];

  constructor() {}

  removePhone(index: number) {
    const optionalPhones = this.myGroup.parent as FormArray;
    optionalPhones.removeAt(index);
  }
}
