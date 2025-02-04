import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  isDarkMode = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  
  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService.darkMode$.subscribe(
      isDark => this.isDarkMode = isDark
    );
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  onSubmit() {
    console.log('Registration submitted:', this.registerData);
    
    if (this.registerData.password === this.registerData.confirmPassword) {
      this.router.navigate(['/login']);
    }
  }
}