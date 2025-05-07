import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CovidService } from '../../services/covid.service';
import { ApiStatus } from '../../models/covid-data.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <i class="bi bi-virus"></i>
            <h1>COVID-19 Brasil Dashboard</h1>
          </div>
          <nav class="nav">
            <a routerLink="/brazil-states" routerLinkActive="active">Estados</a>
            <a routerLink="/brazil-by-date" routerLinkActive="active">Por Data</a>
            <a routerLink="/countries" routerLinkActive="active">Países</a>
            <a routerLink="/data-form" routerLinkActive="active">Formulário</a>
          </nav>
          <div class="api-status" *ngIf="apiStatus">
            <span [class]="'status-indicator ' + (apiStatus.status === 'ok' ? 'online' : 'offline')"></span>
            <span class="status-text">API {{ apiStatus.status === 'ok' ? 'Online' : 'Offline' }}</span>
            <span class="status-time" *ngIf="apiStatus.date">
              Atualizado: {{ formatDate(apiStatus.date) }}
            </span>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--bg-card);
      padding: 1rem 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--primary);
    }

    .logo i {
      font-size: 1.75rem;
    }

    .logo h1 {
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0;
    }

    .nav {
      display: flex;
      gap: 1.5rem;
    }

    .nav a {
      color: var(--text-secondary);
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 0;
      transition: color 0.3s ease;
      position: relative;
    }

    .nav a:hover {
      color: var(--text-primary);
    }

    .nav a.active {
      color: var(--primary);
    }

    .nav a.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--primary);
    }

    .api-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
    }

    .status-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .online {
      background-color: var(--success);
    }

    .offline {
      background-color: var(--danger);
    }

    .status-text {
      font-weight: 500;
    }

    .status-time {
      color: var(--text-muted);
      font-size: 0.75rem;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 1rem;
      }

      .nav {
        gap: 1rem;
        margin: 0.5rem 0;
      }

      .api-status {
        font-size: 0.75rem;
      }
    }
  `]
})
export class HeaderComponent {
  apiStatus: ApiStatus | null = null;

  constructor(private covidService: CovidService) {}

  ngOnInit(): void {
    this.checkApiStatus();
  }

  checkApiStatus() {
    this.covidService.getApiStatus().subscribe({
      next: (status) => {
        this.apiStatus = status;
      },
      error: () => {
        // dados simulados para o status da API
        this.apiStatus = {
          status: 'offline',
          date: new Date().toISOString(),
          environment: 'unknown',
          aws: {
            region: 'unknown',
            function_version: 'unknown'
          }
        };
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}