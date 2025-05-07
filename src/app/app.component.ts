import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <footer class="footer">
        <div class="container">
          <p>© 2025 COVID-19 Brazil Dashboard</p>
          <p class="text-muted">Data provided by the COVID-19 Brazil API</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
      padding: 2rem 0;
    }

    .footer {
      background-color: var(--bg-card);
      padding: 1.5rem 0;
      text-align: center;
      margin-top: 2rem;
    }

    .footer p {
      margin: 0.25rem 0;
    }
  `]
})
export class AppComponent {
  title = 'COVID-19 Brazil Dashboard';
}