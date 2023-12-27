import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <form method="POST" action="">
      <div class="row">
        <label>First name</label>:
        <input name="first-name">
      </div>
      <div class="row">
        <label>Last name</label>:
        <input name="last-name">
      </div>
      <button>Submit</button>
    </form>
  `,
  styleUrl: './style.css'
})

export class FormComponent {

}


