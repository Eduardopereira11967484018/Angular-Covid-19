import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CovidService } from '../../services/covid.service';
import { BrazilState } from '../../models/covid-data.model';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-brazil-states',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  template: `
    <div class="container">
      <div class="page-header">
        <h2 class="page-title">COVID-19 in Brazilian States</h2>
        <div class="state-selector">
          <label for="stateSelect">Select State:</label>
          <select 
            id="stateSelect" 
            [(ngModel)]="selectedStateUf" 
            (change)="onStateSelect()" 
            class="form-control"
          >
            <option value="">All States</option>
            <option *ngFor="let state of states" [value]="state.uf">
              {{ state.state }} ({{ state.uf }})
            </option>
          </select>
        </div>
      </div>

      <app-loading *ngIf="loading"></app-loading>

      <div *ngIf="error" class="error-message">
        <i class="bi bi-exclamation-triangle"></i>
        <p>{{ error }}</p>
        <button (click)="loadData()" class="btn">Try Again</button>
      </div>

      <div *ngIf="!loading && !error">
        <!-- State Detail View -->
        <div *ngIf="selectedState" class="state-detail fade-in">
          <div class="state-header">
            <h3>{{ selectedState.state }} ({{ selectedState.uf }})</h3>
            <span class="updated-at">
              Updated: {{ formatDate(selectedState.datetime) }}
            </span>
          </div>

          <div class="grid grid-4">
            <div class="card stat-card">
              <div class="stat-number">{{ selectedState.cases | number }}</div>
              <div class="stat-label">Confirmed Cases</div>
            </div>
            <div class="card stat-card">
              <div class="stat-number text-danger">{{ selectedState.deaths | number }}</div>
              <div class="stat-label">Deaths</div>
            </div>
            <div class="card stat-card" *ngIf="selectedState.suspects !== undefined">
              <div class="stat-number text-warning">{{ selectedState.suspects | number }}</div>
              <div class="stat-label">Suspected Cases</div>
            </div>
            <div class="card stat-card" *ngIf="selectedState.refuses !== undefined">
              <div class="stat-number text-info">{{ selectedState.refuses | number }}</div>
              <div class="stat-label">Tests Refused</div>
            </div>
          </div>

          <div class="back-button mt-4">
            <button class="btn" (click)="selectedStateUf = ''; onStateSelect()">
              <i class="bi bi-arrow-left"></i> Back to All States
            </button>
          </div>
        </div>

        <!-- All States View -->
        <div *ngIf="!selectedState" class="states-grid fade-in">
          <div class="grid-header">
            <div class="header-item">State</div>
            <div class="header-item">Cases</div>
            <div class="header-item">Deaths</div>
            <div class="header-item">Actions</div>
          </div>
          
          <div class="grid-data">
            <div class="data-row" *ngFor="let state of states">
              <div class="data-cell state-name">
                {{ state.state }} ({{ state.uf }})
              </div>
              <div class="data-cell">
                {{ state.cases | number }}
              </div>
              <div class="data-cell deaths">
                {{ state.deaths | number }}
              </div>
              <div class="data-cell actions">
                <button class="btn btn-sm" (click)="viewStateDetails(state.uf)">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .page-title {
      font-size: 1.75rem;
      margin-bottom: 0;
    }

    .state-selector {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .state-selector label {
      font-weight: 500;
    }

    .state-selector select {
      min-width: 200px;
    }

    .states-grid {
      border-radius: 0.5rem;
      overflow: hidden;
      background-color: var(--bg-card);
      margin-bottom: 2rem;
      box-shadow: 0 4px 6px var(--shadow);
    }

    .grid-header {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      background-color: var(--bg-hover);
      padding: 1rem;
      font-weight: 600;
    }

    .grid-data .data-row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      padding: 1rem;
      border-bottom: 1px solid var(--border);
      transition: background-color 0.2s ease;
    }

    .grid-data .data-row:last-child {
      border-bottom: none;
    }

    .grid-data .data-row:hover {
      background-color: var(--bg-hover);
    }

    .data-cell.deaths {
      color: var(--danger);
    }

    .data-cell.state-name {
      font-weight: 500;
    }

    .btn-sm {
      padding: 0.25rem 0.75rem;
      font-size: 0.875rem;
    }

    .state-detail {
      margin-bottom: 2rem;
    }

    .state-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .state-header h3 {
      font-size: 1.5rem;
      margin: 0;
    }

    .updated-at {
      color: var(--text-muted);
      font-size: 0.875rem;
    }

    .error-message {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: rgba(239, 68, 68, 0.1);
      padding: 2rem;
      border-radius: 0.5rem;
      margin: 2rem 0;
      text-align: center;
    }

    .error-message i {
      font-size: 2rem;
      color: var(--danger);
      margin-bottom: 1rem;
    }

    @media (max-width: 768px) {
      .page-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .grid-header, .grid-data .data-row {
        grid-template-columns: 1fr 1fr 1fr;
      }

      .header-item:last-child, .data-cell.actions {
        display: none;
      }
      
      .data-cell.state-name {
        grid-column: 1 / -1;
        margin-bottom: 0.5rem;
      }
      
      .grid-data .data-row {
        padding: 1rem;
        display: flex;
        flex-wrap: wrap;
      }
      
      .actions {
        margin-top: 0.5rem;
        width: 100%;
      }
    }
  `]
})
export class BrazilStatesComponent implements OnInit {
  states: BrazilState[] = [];
  selectedStateUf: string = '';
  selectedState: BrazilState | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(private covidService: CovidService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;

    this.covidService.getAllStates().subscribe({
      next: (data) => {
        this.states = data.sort((a, b) => b.cases - a.cases);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load data: ' + err;
        this.loading = false;
      }
    });
  }

  onStateSelect(): void {
    if (this.selectedStateUf) {
      this.viewStateDetails(this.selectedStateUf);
    } else {
      this.selectedState = null;
    }
  }

  viewStateDetails(uf: string): void {
    this.loading = true;
    this.selectedStateUf = uf;

    this.covidService.getStateByUf(uf).subscribe({
      next: (data) => {
        if (data && 'error' in data) {
          this.error = `State ${uf} not found`;
          this.selectedState = null;
        } else {
          this.selectedState = data as BrazilState;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load state data: ' + err;
        this.loading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
}