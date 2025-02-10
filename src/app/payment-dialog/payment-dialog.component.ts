import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-payment-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent {
  amount: number = 0;
  isProcessing: boolean = false;
  error: string = '';
  @Output() close = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  selectAmount(value: number) {
    this.amount = value;
  }

  processPayment() {
    if (!this.amount || this.amount < 1) {
      this.error = 'Please select an amount';
      return;
    }

    this.isProcessing = true;
    this.error = '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });

    const url = `${environment.BASE_URL}/create-payment-intent/?amount=${this.amount}&username=4`;

    this.http.post<{ payment_link: string; message: string }>(
      url,
      {},
      { headers }
    ).subscribe({
      next: (response) => {
        this.isProcessing = false;
        if (response.payment_link) {
          // Open payment link in a new tab
          window.open(response.payment_link, '_blank');
          // Close the dialog
          this.close.emit();
        }
      },
      error: (error) => {
        this.isProcessing = false;
        this.error = error.error?.message || 'Payment processing failed. Please try again.';
        console.error('Payment error:', error);
      }
    });
  }
}