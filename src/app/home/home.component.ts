import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="home-content">
        <h1>Welcome to Our Platform</h1>
        <p>You've successfully logged in!</p>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>Feature 1</h3>
            <p>Description of feature 1 goes here</p>
          </div>
          <div class="feature-card">
            <h3>Feature 2</h3>
            <p>Description of feature 2 goes here</p>
          </div>
          <div class="feature-card">
            <h3>Feature 3</h3>
            <p>Description of feature 3 goes here</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #000000, #1a1a1a);
      padding: 2rem;
    }
    .home-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
      border: 1px solid #00c6ff;
    }
    h1 {
      color: #00c6ff;
      text-align: center;
      margin-bottom: 2rem;
      font-size: 2.5rem;
    }
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }
    .feature-card {
      background: rgba(255, 255, 255, 0.05);
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid rgba(0, 198, 255, 0.2);
      transition: transform 0.3s ease;
    }
    .feature-card:hover {
      transform: translateY(-5px);
      border-color: #00c6ff;
    }
    .feature-card h3 {
      color: #00c6ff;
      margin-bottom: 1rem;
    }
    .feature-card p {
      color: #ffffff80;
    }
  `]
})
export class HomeComponent {}