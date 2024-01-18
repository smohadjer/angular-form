import { Component, Input, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'rating-input',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule
  ],
  template: `
    <ng-container [formGroup]="parentFormGroup">
      <span *ngFor="let starred of stars; let i = index"
        (click)="rate(i + (starred ? (value > i + 1 ? 1 : 0) : 1))">
        <ng-container *ngIf="starred; else noStar">&#11088;</ng-container>
        <ng-template #noStar>&#11090;</ng-template>
      </span>
    </ng-container>
  `,
  styleUrl: './rating.component.css'
})
export class RatingInputComponent implements OnInit {
  @Input() parentFormGroup!: FormGroup;
  inputFormControl = new FormControl();

  stars: boolean[] = Array(5).fill(false);

  constructor() {}

  ngOnInit(): void {
      this.parentFormGroup.addControl('rating', this.inputFormControl);
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
