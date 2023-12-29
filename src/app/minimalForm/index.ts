import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'minimal-form',
  templateUrl: './template.html',
  imports: [
    ReactiveFormsModule, JsonPipe
  ],
  styleUrls: ['./style.css']
})

export class MinimalFormComponent {
  myForm = new FormGroup({
    firstname: new FormControl('')
  });

  updateName() {
    this.myForm.setValue({
      firstname: 'Saeid'
    });
  }

  submitHandler() {
    alert(JSON.stringify(this.myForm.value));
  }
}

