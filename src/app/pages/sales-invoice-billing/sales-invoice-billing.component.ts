import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales-invoice-billing',
  standalone: true,
  imports: [CommonModule, FormsModule,NgOptimizedImage],
  templateUrl: './sales-invoice-billing.component.html',
  styleUrl: './sales-invoice-billing.component.scss',
  animations: [
    trigger('showQR', [
      state('hidden', style({ opacity: 0, transform: 'translateY(20px)' })), // Initially hidden and slightly off-screen
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })), // Fully visible and reset position
      transition('hidden => visible', [
        animate('0.5s ease-in-out')
      ]),
    ])
  ]
})
export class SalesInvoiceBillingComponent implements OnInit {
  showQR: boolean = false;
  hidePaymentPanel: boolean = false;
  changeAmount: number;

  paymentModeLine: PaymentModeAccount[] = [
    {
      mode: 'Cash',
      amount: 10,
    },
    {
      mode: 'Card',
      amount: 20,
    },
    {
      mode: 'Visa',
      amount: 20,
    },
    {
      mode: 'FonePay',
      amount: 20,
    },
    {
      mode: 'PayPal',
      amount: 20,
    },
  ];

  //Keypress events add on the pages
  //Keypress events add on the pages
  //Keypress events add on the pages
  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    event.preventDefault();
    if (event.key === 'F2') {
      event.preventDefault(); // Prevent the default action (e.g., opening help in some browsers)
      this.fonepayClick();
      // Add your F1 key logic here
    }
    if (event.key === 'F3') {
      event.preventDefault(); // Prevent the default action (e.g., opening help in some browsers)
      this.fonepayClick();
      // Add your F1 key logic here
    }
    if (event.ctrlKey) {
      if (event.key === 'Q' || event.key === 'q') {
        event.preventDefault(); // Prevent the default action (e.g., opening help in some browsers)
        this.showQR = false;
        this.hidePaymentPanel = false;
        // Add your F1 key logic here
      }
    }
  }

  //Keypress events end on the pages
  //Keypress events end on the pages
  //Keypress events end on the pages
  //Keypress events end on the pages

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  deleteItem(index: number): void {
    this.paymentModeLine.splice(index, 1); // Remove item from the array
  }

  fonepayClick() {
    this.showQR = true;
    this.hidePaymentPanel = true;
    this.changeAmount = 0;
  }
}

export class PaymentModeAccount {
  mode: string;
  amount: number;
}
