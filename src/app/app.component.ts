import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './components/formComponent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormComponent,
    ReactiveFormsModule
  ],
  template: `<main>
    <app-reactive-form></app-reactive-form>
  </main>`,
  styleUrl: './app.component.css'
})

export class AppComponent {

}
