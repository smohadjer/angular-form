import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { FormComponent } from './components/formComponent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormComponent,
    CommonModule,
    RouterOutlet],
  template: `<main>
    <app-form></app-form>
  </main>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-form';
}
