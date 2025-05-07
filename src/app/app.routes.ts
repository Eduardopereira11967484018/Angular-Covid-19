import { Routes } from '@angular/router';
import { BrazilStatesComponent } from './components/brazil-states/brazil-states.component';
import { BrazilByDateComponent } from './components/brazil-by-date/brazil-by-date.component';
import { CountriesComponent } from './components/countries/countries.component';
import { DataFormComponent } from './components/data-form/data-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'brazil-states', pathMatch: 'full' },
  { path: 'brazil-states', component: BrazilStatesComponent },
  { path: 'brazil-by-date', component: BrazilByDateComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'data-form', component: DataFormComponent },
  { path: '**', redirectTo: 'brazil-states' }
];