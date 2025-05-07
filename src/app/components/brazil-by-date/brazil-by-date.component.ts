import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CovidService } from '../../services/covid.service';
import { BrazilState } from '../../models/covid-data.model';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-brazil-by-date',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  template: `
    <div class="container">
      <div class="page-header">
        <h2 class="page-title">COVID-19 Brazil Dashboard</h2>
        <div class="date-picker">
          <label for="datePicker">Datas:</label>
          <input 
            type="date" 
            id="datePicker" 
            [max]="todayDate" 
            [(ngModel)]="selectedDate" 
            (change)="onDateChange()" 
            class="form-control"
          />
        </div>
      </div>

      <app-loading *ngIf="loading"></app-loading>

      <div *ngIf="error" class="error-message">
        <i class="bi bi-exclamation-triangle"></i>
        <p>{{ error }}</p>
        <button (click)="loadData()" class="btn">Tentar novamente</button>
      </div>

      <div *ngIf="!loading && !error">
        <div *ngIf="noDataFound" class="no-data">
          <i class="bi bi-calendar-x"></i>
          <p>No data available for {{ formatDateForDisplay(selectedDate) }}</p>
          <p class="hint">Try selecting a different date</p>
        </div>

        <div *ngIf="!noDataFound && stateData.length > 0" class="data-container fade-in">
          <div class="data-summary">
            <h3>Data for {{ formatDateForDisplay(selectedDate) }}</h3>
            <div class="summary-stats">
              <div class="summary-stat">
                <span class="label">Total Cases:</span>
                <span class="value">{{ getTotalCases() | number }}</span>
              </div>
              <div class="summary-stat">
                <span class="label">Total Deaths:</span>
                <span class="value text-danger">{{ getTotalDeaths() | number }}</span>
              </div>
              <div class="summary-stat">
                <span class="label">States Reporting:</span>
                <span class="value">{{ stateData.length }}</span>
              </div>
            </div>
          </div>

          <div class="states-table">
            <table>
              <thead>
                <tr>
                  <th>State</th>
                  <th>Cases</th>
                  <th>Deaths</th>
                  <th>Suspects</th>
                  <th>Refuses</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let state of stateData">
                  <td>{{ state.state }} ({{ state.uf }})</td>
                  <td>{{ state.cases | number }}</td>
                  <td class="text-danger">{{ state.deaths | number }}</td>
                  <td>{{ state.suspects | number }}</td>
                  <td>{{ state.refuses | number }}</td>
                </tr>
              </tbody>
            </table>
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

    .date-picker {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .date-picker label {
      font-weight: 500;
    }

    .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--bg-card);
      padding: 3rem;
      border-radius: 0.5rem;
      text-align: center;
    }

    .no-data i {
      font-size: 3rem;
      color: var(--text-muted);
      margin-bottom: 1rem;
    }

    .no-data .hint {
      color: var(--text-muted);
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .data-container {
      margin-bottom: 2rem;
    }

    .data-summary {
      background-color: var(--bg-card);
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .data-summary h3 {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    .summary-stats {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .summary-stat {
      display: flex;
      flex-direction: column;
    }

    .summary-stat .label {
      color: var(--text-muted);
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }

    .summary-stat .value {
      font-size: 1.5rem;
      font-weight: 600;
    }

    .states-table {
      background-color: var(--bg-card);
      border-radius: 0.5rem;
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 1rem;
      text-align: left;
    }

    th {
      background-color: var(--bg-hover);
      font-weight: 600;
    }

    tbody tr {
      border-bottom: 1px solid var(--border);
      transition: background-color 0.2s ease;
    }

    tbody tr:last-child {
      border-bottom: none;
    }

    tbody tr:hover {
      background-color: var(--bg-hover);
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

      .states-table {
        overflow-x: auto;
      }

      table {
        min-width: 600px;
      }
    }
  `]
})
export class BrazilByDateComponent implements OnInit {
  selectedDate: string = this.formatDateForInput(new Date());
  todayDate: string = this.formatDateForInput(new Date());
  stateData: BrazilState[] = [];
  loading: boolean = true;
  error: string | null = null;
  noDataFound: boolean = false;

  constructor(private covidService: CovidService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;
    this.noDataFound = false;

    const formattedDate = this.formatDateForApi(this.selectedDate);
    
    this.covidService.getBrazilByDate(formattedDate).subscribe({
      next: (data) => {
        this.stateData = data;
        this.noDataFound = data.length === 0;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load data: ' + err;
        this.loading = false;
      }
    });
  }

  onDateChange(): void {
    this.loadData();
  }

  formatDateForApi(dateString: string): string {
    const date = new Date(dateString);
    return this.covidService.formatDateForApi(date);
  }

  formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  formatDateForDisplay(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getTotalCases(): number {
    return this.stateData.reduce((total, state) => total + state.cases, 0);
  }

  getTotalDeaths(): number {
    return this.stateData.reduce((total, state) => total + state.deaths, 0);
  }
}