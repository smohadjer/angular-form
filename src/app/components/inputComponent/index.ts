import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  template: `
      <div class="row">
        <label>{{label}}</label>:
        <input name="{{name}}">
      </div>
  `,
  styleUrl: './style.css'
})

export class InputComponent {
  @Input() label = '';
  @Input() name = '';

}


