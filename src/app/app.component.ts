import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule
  ],
  template: `
    <h1>Angular 17 Reactive Form</h1>
    <p><a href="https://github.com/smohadjer/angular-form">Code available on GitHub</a></p>
    <div class="flex">
      <main>
        <router-outlet></router-outlet>
      </main>
      <aside class="status">
        <p>Form values:<br><code>{{ data().value }}</code></p>
        <p>Forom status: {{ data().status }}</p>
      </aside>
    </div>
  `,
  styleUrl: './app.component.css'
})

export class AppComponent {
  data;

  constructor(private dataService: DataService) {
    this.data = this.dataService.getData();
  }
}
