import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { 
  BrazilStateResponse, 
  BrazilState, 
  CountriesResponse, 
  ApiStatus,
  BrazilResponse
} from '../models/covid-data.model';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  private apiUrl = 'https://covid19-brazil-api.now.sh/api';

  constructor(private http: HttpClient) { }

  // Get all Brazilian states data
  getAllStates(): Observable<BrazilState[]> {
    return this.http.get<BrazilStateResponse>(`${this.apiUrl}/report/v1`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // Get data for a specific Brazilian state
  getStateByUf(uf: string): Observable<BrazilState> {
    return this.http.get<BrazilState>(`${this.apiUrl}/report/v1/brazil/uf/${uf.toLowerCase()}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get Brazil data for a specific date
  getBrazilByDate(date: string): Observable<BrazilState[]> {
    // Format date as YYYYMMDD
    return this.http.get<BrazilStateResponse>(`${this.apiUrl}/report/v1/brazil/${date}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // Get current Brazil data
  getBrazilData(): Observable<BrazilResponse> {
    return this.http.get<BrazilResponse>(`${this.apiUrl}/report/v1/brazil`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get data for all countries
  getAllCountries(): Observable<CountriesResponse> {
    return this.http.get<CountriesResponse>(`${this.apiUrl}/report/v1/countries`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get API status
  getApiStatus(): Observable<ApiStatus> {
    return this.http.get<ApiStatus>(`${this.apiUrl}/status/v1`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Format date for API call (YYYYMMDD)
  formatDateForApi(date: Date): string {
    const year = date.getFullYear();
    // Pad month and day with leading zeros if needed
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  }

  // Error handling
  private handleError(error: any) {
    console.error('API Error:', error);
    let errorMsg = 'An error occurred while fetching data';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMsg);
  }
}