import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CovidService } from '../../services/covid.service';
import { CountryData } from '../../models/covid-data.model';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  template: `
    <div class="container">
      <div class="page-header">
        <h2 class="page-title">Global COVID-19 Data</h2>
        <div class="search-box">
          <input 
            type="text" 
            placeholder="Search countries..." 
            [(ngModel)]="searchTerm" 
            (input)="filterCountries()" 
            class="form-control"
          >
          <i class="bi bi-search search-icon"></i>
        </div>
      </div>

      <app-loading *ngIf="loading"></app-loading>

      <div *ngIf="error" class="error-message">
        <i class="bi bi-exclamation-triangle"></i>
        <p>{{ error }}</p>
        <button (click)="loadData()" class="btn">Try Again</button>
      </div>

      <div *ngIf="!loading && !error">
        <div class="summary-cards grid grid-4">
          <div class="card stat-card">
            <div class="stat-number">{{ getTotalCases() | number }}</div>
            <div class="stat-label">Total Cases</div>
          </div>
          <div class="card stat-card">
            <div class="stat-number">{{ getTotalConfirmed() | number }}</div>
            <div class="stat-label">Total Confirmed</div>
          </div>
          <div class="card stat-card">
            <div class="stat-number text-danger">{{ getTotalDeaths() | number }}</div>
            <div class="stat-label">Total Deaths</div>
          </div>
          <div class="card stat-card">
            <div class="stat-number text-success">{{ getTotalRecovered() | number }}</div>
            <div class="stat-label">Total Recovered</div>
          </div>
        </div>

        <div *ngIf="filteredCountries.length === 0 && searchTerm" class="no-results">
          <i class="bi bi-search"></i>
          <p>No countries found matching "{{ searchTerm }}"</p>
        </div>

        <div *ngIf="filteredCountries.length > 0" class="countries-table fade-in">
          <table>
            <thead>
              <tr>
                <th (click)="sortBy('country')">
                  Country <i *ngIf="sortColumn === 'country'" class="bi" [class.bi-arrow-up]="!sortAscending" [class.bi-arrow-down]="sortAscending"></i>
                </th>
                <th (click)="sortBy('cases')">
                  Cases <i *ngIf="sortColumn === 'cases'" class="bi" [class.bi-arrow-up]="!sortAscending" [class.bi-arrow-down]="sortAscending"></i>
                </th>
                <th (click)="sortBy('confirmed')">
                  Confirmed <i *ngIf="sortColumn === 'confirmed'" class="bi" [class.bi-arrow-up]="!sortAscending" [class.bi-arrow-down]="sortAscending"></i>
                </th>
                <th (click)="sortBy('deaths')">
                  Deaths <i *ngIf="sortColumn === 'deaths'" class="bi" [class.bi-arrow-up]="!sortAscending" [class.bi-arrow-down]="sortAscending"></i>
                </th>
                <th (click)="sortBy('recovered')">
                  Recovered <i *ngIf="sortColumn === 'recovered'" class="bi" [class.bi-arrow-up]="!sortAscending" [class.bi-arrow-down]="sortAscending"></i>
                </th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let country of filteredCountries">
                <td>{{ country.country }}</td>
                <td>{{ country.cases | number }}</td>
                <td>{{ country.confirmed | number }}</td>
                <td class="text-danger">{{ country.deaths | number }}</td>
                <td class="text-success">{{ country.recovered | number }}</td>
                <td>{{ formatDate(country.updated_at) }}</td>
              </tr>
            </tbody>
          </table>
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

    .search-box {
      position: relative;
      min-width: 300px;
    }

    .search-icon {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
    }

    .summary-cards {
      margin-bottom: 2rem;
    }

    .countries-table {
      background-color: var(--bg-card);
      border-radius: 0.5rem;
      overflow: hidden;
      margin-bottom: 2rem;
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
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    th:hover {
      background-color: rgba(255, 255, 255, 0.1);
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

    .no-results {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--bg-card);
      padding: 3rem;
      border-radius: 0.5rem;
      text-align: center;
    }

    .no-results i {
      font-size: 3rem;
      color: var(--text-muted);
      margin-bottom: 1rem;
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

      .search-box {
        width: 100%;
      }

      .countries-table {
        overflow-x: auto;
      }

      table {
        min-width: 900px;
      }
    }
  `]
})
export class CountriesComponent implements OnInit {
  countries: CountryData[] = [];
  filteredCountries: CountryData[] = [];
  loading: boolean = true;
  error: string | null = null;
  searchTerm: string = '';
  sortColumn: string = 'cases';
  sortAscending: boolean = false;

  constructor(private covidService: CovidService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;

    this.covidService.getAllCountries().subscribe({
      next: (response) => {
        this.countries = response.data;
        this.sortBy(this.sortColumn);
        this.filterCountries();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load data: ' + err;
        this.loading = false;
      }
    });
  }


  filterCountries(): void {
    if (!this.searchTerm) {
      this.filteredCountries = [...this.countries];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredCountries = this.countries.filter(country => 
        country.country.toLowerCase().includes(term)
      );
    }
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = column;
      this.sortAscending = true;
    }

    this.filteredCountries.sort((a: any, b: any) => {
      if (a[column] < b[column]) return this.sortAscending ? -1 : 1;
      if (a[column] > b[column]) return this.sortAscending ? 1 : -1;
      return 0;
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  getTotalCases(): number {
    return this.countries.reduce((total, country) => total + country.cases, 0);
  }

  getTotalConfirmed(): number {
    return this.countries.reduce((total, country) => total + country.confirmed, 0);
  }

  getTotalDeaths(): number {
    return this.countries.reduce((total, country) => total + country.deaths, 0);
  }

  getTotalRecovered(): number {
    return this.countries.reduce((total, country) => total + country.recovered, 0);
  }
}