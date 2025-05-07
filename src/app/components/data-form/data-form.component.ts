import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CovidFormData } from '../../models/covid-data.model';

@Component({
  selector: 'app-data-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="page-header">
        <h2 class="page-title">Submit COVID-19 Data</h2>
      </div>

      <div class="form-container fade-in">
        <form [formGroup]="covidForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="state" class="form-label">State</label>
            <input 
              type="text" 
              id="state" 
              formControlName="state" 
              class="form-control" 
              [class.error]="isFieldInvalid('state')"
            >
            <div *ngIf="isFieldInvalid('state')" class="error-text">
              State is required
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="cases" class="form-label">Cases</label>
              <input 
                type="number" 
                id="cases" 
                formControlName="cases" 
                class="form-control" 
                [class.error]="isFieldInvalid('cases')"
              >
              <div *ngIf="isFieldInvalid('cases')" class="error-text">
                Valid number of cases is required
              </div>
            </div>

            <div class="form-group">
              <label for="confirmed" class="form-label">Confirmed</label>
              <input 
                type="number" 
                id="confirmed" 
                formControlName="confirmed" 
                class="form-control" 
                [class.error]="isFieldInvalid('confirmed')"
              >
              <div *ngIf="isFieldInvalid('confirmed')" class="error-text">
                Valid number of confirmed cases is required
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="deaths" class="form-label">Deaths</label>
              <input 
                type="number" 
                id="deaths" 
                formControlName="deaths" 
                class="form-control" 
                [class.error]="isFieldInvalid('deaths')"
              >
              <div *ngIf="isFieldInvalid('deaths')" class="error-text">
                Valid number of deaths is required
              </div>
            </div>

            <div class="form-group">
              <label for="recovered" class="form-label">Recovered</label>
              <input 
                type="number" 
                id="recovered" 
                formControlName="recovered" 
                class="form-control" 
                [class.error]="isFieldInvalid('recovered')"
              >
              <div *ngIf="isFieldInvalid('recovered')" class="error-text">
                Valid number of recovered cases is required
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="date" class="form-label">Date</label>
            <input 
              type="date" 
              id="date" 
              formControlName="date" 
              class="form-control" 
              [class.error]="isFieldInvalid('date')"
              [max]="todayDate"
            >
            <div *ngIf="isFieldInvalid('date')" class="error-text">
              Valid date is required
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn" [disabled]="covidForm.invalid">Submit Data</button>
            <button type="button" class="btn btn-secondary" (click)="resetForm()">Reset</button>
          </div>
        </form>
      </div>

      <div *ngIf="submittedData" class="submission-result fade-in">
        <h3>Form Submission Result</h3>
        <p>The following data would be sent to the API:</p>
        <pre>{{ submittedData | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      margin-bottom: 2rem;
    }

    .page-title {
      font-size: 1.75rem;
    }

    .form-container {
      background-color: var(--bg-card);
      border-radius: 0.5rem;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 4px 6px var(--shadow);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-control.error {
      border-color: var(--danger);
    }

    .error-text {
      color: var(--danger);
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .submission-result {
      background-color: var(--bg-card);
      border-radius: 0.5rem;
      padding: 2rem;
      margin-top: 2rem;
      box-shadow: 0 4px 6px var(--shadow);
    }

    .submission-result h3 {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    pre {
      background-color: var(--bg-hover);
      padding: 1.5rem;
      border-radius: 0.375rem;
      overflow-x: auto;
      font-size: 0.875rem;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
        gap: 0;
      }

      .form-actions {
        flex-direction: column;
      }
      
      .form-actions button {
        width: 100%;
      }
    }
  `]
})
export class DataFormComponent {
  covidForm: FormGroup;
  submittedData: CovidFormData | null = null;
  todayDate: string = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder) {
    this.covidForm = this.fb.group({
      state: ['', Validators.required],
      cases: [0, [Validators.required, Validators.min(0)]],
      confirmed: [0, [Validators.required, Validators.min(0)]],
      deaths: [0, [Validators.required, Validators.min(0)]],
      recovered: [0, [Validators.required, Validators.min(0)]],
      date: [this.todayDate, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.covidForm.valid) {
      this.submittedData = this.covidForm.value;
      console.log('Form submitted with data:', this.submittedData);
      // In a real application, this would be sent to an API
    } else {
      this.markFormGroupTouched(this.covidForm);
    }
  }

  resetForm(): void {
    this.covidForm.reset({
      state: '',
      cases: 0,
      confirmed: 0,
      deaths: 0,
      recovered: 0,
      date: this.todayDate
    });
    this.submittedData = null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.covidForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}