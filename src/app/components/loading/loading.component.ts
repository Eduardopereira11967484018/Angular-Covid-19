import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-container" [ngClass]="{'overlay': overlay}">
      <span class="loader"></span>
      <p class="loading-text">{{ message }}</p>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
    }
    
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(15, 23, 42, 0.8);
      z-index: 1000;
    }
    
    .loading-text {
      margin-top: 1rem;
      color: var(--text-secondary);
      font-weight: 500;
    }
  `]
})
export class LoadingComponent {
  @Input() message: string = 'Loading data...';
  @Input() overlay: boolean = false;
}