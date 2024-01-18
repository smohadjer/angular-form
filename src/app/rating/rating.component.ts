import { Component, Input, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'rating-input',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingInputComponent implements OnInit {
  @Input() parentFormGroup!: FormGroup;
  @Input() defaultValue: number = 0;

  inputFormControl = new FormControl();
  stars: boolean[] = Array(5).fill(false);

  constructor() {
    this.inputFormControl.valueChanges.subscribe((value) => {
      console.log(value);
      this.updateStars(value);
    });
  }

  ngOnInit(): void {
    this.inputFormControl.setValue(this.defaultValue);
    this.parentFormGroup.addControl('rating', this.inputFormControl);
    this.updateStars(this.defaultValue);
  }

  updateStars(value: number) {
    if (value) {
      this.stars.forEach((item, index) => {
        this.stars[index] = index < value;
      });
    } else {
      this.stars.fill(false);
    }
  }

  get value(): number {
    return this.stars.reduce((total, starred) => {
      return total + (starred ? 1 : 0);
    }, 0);
  }

  rate(rating: number) {
    this.stars = this.stars.map((_, i) => rating > i);
    this.inputFormControl.setValue(rating);
  }
}
