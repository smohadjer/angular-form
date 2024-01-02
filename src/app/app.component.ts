import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule
  ],
  template: `
    <main>
      <h1>Angular 17 Reactive Form</h1>
      <p><a href="https://github.com/smohadjer/angular-form">Code available on GitHub</a></p>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrl: './app.component.css'
})

export class AppComponent {

}
