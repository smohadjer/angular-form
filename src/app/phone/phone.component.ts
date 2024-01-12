import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
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
  @Input() phoneGroup: FormGroup = new FormGroup({});
  @Input() isRequired: boolean = false;
  @Input() index: number = -1;
  @Input() phoneLabels: string[] = [];

  constructor() {}

  removePhone(index: number) {
    const phones = this.phoneGroup.parent as FormArray;
    phones.removeAt(index);
  }
}
