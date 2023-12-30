import { Component } from '@angular/core';
import { FormBuilder, FormArray, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'builder-form',
  templateUrl: './template.html',
  styleUrls: ['./style.css'],
  imports: [ReactiveFormsModule, NgFor, JsonPipe],
})

export class FormBuilderComponent {
  myForm = this.formBuilder.group({
    firstName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    aliases: this.formBuilder.array([this.formBuilder.control('')]),
  });

  get aliases() {
    return this.myForm.get('aliases') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {

  }

  updateForm() {
    this.myForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }

  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }

  onSubmit() {
    const jsonString = JSON.stringify(this.myForm.value);
    alert(jsonString);
  }
}
