import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    // Here you would typically validate credentials
    console.log('Login submitted:', this.loginData);
    
    // For demo purposes, we'll just navigate to home
    this.router.navigate(['/home']);
  }
}