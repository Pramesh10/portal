import { Component } from '@angular/core';

@Component({
  selector: 'app-sales-inoice-receipt-print',
  standalone: true,
  imports: [],
  templateUrl: './sales-inoice-receipt-print.component.html',
  styleUrl: './sales-inoice-receipt-print.component.scss'
})
export class SalesInoiceReceiptPrintComponent {


  Print(): void {
    const printContents = document.getElementById('print-section')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
        // Reload the page to restore the original contents
    }
  }

}
