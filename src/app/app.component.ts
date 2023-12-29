import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule
  ],
  template: `
    <aside>
      <h2>Reactive form examples</h2>
      <ul>
        <li><a routerLink='/'>Minimal</a></li>
        <li><a routerLink='/formbuilder'>built with FormBuilder</a></li>
        <li><a routerLink='/validation'>with validation</a></li>

      </ul>
    </aside>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrl: './app.component.css'
})

export class AppComponent {

}
