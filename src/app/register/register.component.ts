import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {
  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    // Here you would typically handle registration
    console.log('Registration submitted:', this.registerData);
    
    if (this.registerData.password === this.registerData.confirmPassword) {
      // For demo purposes, we'll just navigate to login
      this.router.navigate(['/login']);
    }
  }
}