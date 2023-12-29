import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-reactive-form',
  templateUrl: './template.html',
  styleUrls: ['./style.css'],
  imports: [ReactiveFormsModule, JsonPipe],
})

export class ValidationFormComponent {
  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
  });

  constructor(private formBuilder: FormBuilder) {

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    const jsonString = JSON.stringify(this.profileForm.value);
    alert(jsonString);
  }
}
