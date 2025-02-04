import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  isDarkMode = false;
  showPassword: boolean = false;
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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
    console.log('Login submitted:', this.loginData);
    this.router.navigate(['/home']);
  }
}