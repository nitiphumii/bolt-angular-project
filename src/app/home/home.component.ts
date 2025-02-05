import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';
import { HttpClient } from '@angular/common/http';

interface FinancialSummary {
  sales: number;
  revenue: number;
  expenses: number;
}

interface SaleRecord {
  date: string;
  product: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isDarkMode = false;
  isLoading = false;
  summary: FinancialSummary | null = null;

  constructor(
    private themeService: ThemeService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.themeService.darkMode$.subscribe(
      isDark => this.isDarkMode = isDark
    );
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  processCSV(text: string): SaleRecord[] {
    const lines = text.split('\n');
    const records: SaleRecord[] = [];
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const [date, product, quantity, price] = line.split(',');
        records.push({
          date,
          product,
          quantity: Number(quantity),
          price: Number(price)
        });
      }
    }
    
    return records;
  }

  calculateSummary(records: SaleRecord[]): FinancialSummary {
    let totalSales = 0;
    let totalRevenue = 0;
    
    records.forEach(record => {
      const saleAmount = record.quantity * record.price;
      totalSales += record.quantity;
      totalRevenue += saleAmount;
    });

    // Assuming expenses are 40% of revenue for this example
    const expenses = totalRevenue * 0.4;

    return {
      sales: totalSales,
      revenue: Math.round(totalRevenue * 100) / 100,
      expenses: Math.round(expenses * 100) / 100
    };
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.isLoading = true;
      const file = input.files[0];
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const records = this.processCSV(text);
        this.summary = this.calculateSummary(records);
        this.isLoading = false;
      };
      reader.onerror = (e) => {
        console.error('Error reading file:', e);
        alert('Error reading file. Please try again.');
        this.isLoading = false;
      };
      reader.readAsText(file);
    }
  }
}