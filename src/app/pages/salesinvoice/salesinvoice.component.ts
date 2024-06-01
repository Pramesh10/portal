import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesInvoiceUtilisCalculationLogic } from '../../sales-invoice-function/sales-invoice-utilis-calculation-logic';

@Component({
  selector: 'app-salesinvoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salesinvoice.component.html',
  styleUrl: './salesinvoice.component.scss',
})
export class SalesinvoiceComponent implements OnInit {
  @ViewChild('barcodeInput', { static: true })
  barcodeInput: ElementRef<HTMLInputElement>;
  invoiceType: string;
  queryParamsValue = inject(ActivatedRoute);
  router = inject(Router);

  salesInvoiceCalculation = inject(SalesInvoiceUtilisCalculationLogic);

  /**
   *
   */
  constructor(private cdr: ChangeDetectorRef) {}

  ///shortcut for the NEXT BIlling page
  ///shortcut for the NEXT BIlling page
  ///shortcut for the NEXT BIlling page

  isLoading: boolean = false; //Next button handling
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'End' || event.code === 'End') {
      // Handle 'End' key press
      this.isLoading = true;

      this.router.navigate(['/salesinvoicebilling']);
    }
  }

  ////Total Total Total Total Section
  ////Total Total Total Total Section
  ////Total Total Total Total Section
  totalNetAmount: number = 0;
  totalDiscount: number = 0;
  totalGrossAmount: number = 0;
  totalQuantity: number = 0;

  ngOnInit(): void {
    // Get the params retrieval asynchronously
    this.queryParamsValue.queryParams.subscribe((params) => {
      this.invoiceType = params['invoiceType'];
    });

    //SET FOCUS ON BARCODE INPUT
    this.setFocusOnInput();
  }

  //Handle key press in Barcode input
  //Handle key press in Barcode input
  //Handle key press in Barcode input
  emptyBarCode: boolean = false;
  onEnter(itemCode: string, inputElement: HTMLInputElement): void {
    inputElement.focus(); // Focus the Barcode element
    inputElement.select();
    this.emptyBarCode = itemCode === '';
    if (this.emptyBarCode) return;
    const existingItem = this.itemsLine.find(
      (item) => item.itemCode === itemCode
    );

    if (existingItem) {
      // Increase the quantity by 1
      existingItem.quantity += 1;
      //bring the edited item to the top of the list
      //bring the edited item to the top of the list
      //bring the edited item to the top of the list

      //check the index of the index of the edited items
      //check the index of the index of the edited items
      const index = this.itemsLine.findIndex(
        (item) => item.itemCode === itemCode
      );
      if (index !== -1) {
        this.updateItemLineToTop(index, existingItem);
      }
      //calculate the total again
      //calculate the total again
      //calculate the total again
      this.calculateAllItemsLines();
    } else {
     
      //make the request to backend for the rate 
      //price, discount , discount percentage ,line discount
      //and add the items to the lines according to the rate 
      //and discount
      
      //get the item description,rate ,discount and other
      //fields 




      this.addItemsLines(itemCode);
    }
  }

  //get the items details from the database
  //get the items details from the database
  //get the items details from the database

  itemsLine = Array<SalesInvoiceItemsLine>();
  addItemsLines(itemCode) {
    /*
 if (this.itemsLine.length == 0) {
      var temp = new SalesInvoiceItemsLine();
      temp.barCode = itemCode;
      temp.itemCode = itemCode;
      temp.itemName = 'ABC DEF GHI JHL IJK LMN OPQ RST UVW XYZ';
      temp.uom = 'PCS';
      temp.rate = 25.0;
      temp.quantity = 1;
      temp.grossAmount = 50;
      temp.discount = 1000;
      temp.discountPercentage = 0;
      temp.netAmount = 100;
      this.itemsLine.push(temp);
      console.log(this.itemsLine);
    } else {
      var temp = new SalesInvoiceItemsLine();
      temp.barCode = itemCode;
      temp.itemCode = itemCode;
      temp.itemName = 'ABC DEF GHI JHL';
      temp.uom = 'PCS';
      temp.rate = 25.0;
      temp.quantity = 1;
      temp.grossAmount = 50;
      temp.discount = 0;
      temp.discountPercentage = 0;
      temp.netAmount = 100;
      this.itemsLine.push(temp);
      console.log(this.itemsLine);
    }
    */

    /// Add the new Item Lines in table with calculation
    /// Add the new Item Lines in table with calculation
    /// Add the new Item Lines in table with calculation

    var tempInvoiceItemsLine = new SalesInvoiceItemsLine();
    tempInvoiceItemsLine.barCode = itemCode;
    tempInvoiceItemsLine.itemCode = itemCode;
    tempInvoiceItemsLine.itemName = 'ABC DEF GHI JHL';
    tempInvoiceItemsLine.uom = 'PCS';
    tempInvoiceItemsLine.rate = this.salesInvoiceCalculation.calculateRate();
    tempInvoiceItemsLine.quantity = 1;
    tempInvoiceItemsLine.minQuantity = 2;
    tempInvoiceItemsLine.grossAmount =
      this.salesInvoiceCalculation.calculateGrossAmount(
        tempInvoiceItemsLine.rate,
        tempInvoiceItemsLine.quantity
      );
    tempInvoiceItemsLine.discount = 0;
    tempInvoiceItemsLine.discountPercentage = 0;
    tempInvoiceItemsLine.netAmount =
      this.salesInvoiceCalculation.calculateNetAmount(
        tempInvoiceItemsLine.rate,
        tempInvoiceItemsLine.quantity
      );
    // this.itemsLine.push(tempInvoiceItemsLine);
    this.itemsLine.unshift(tempInvoiceItemsLine);

    this.calculateAllItemsLines();

    //CLEAR THE BARCODE INPUT AFTER THE ADDING TO THE LINE
    //CLEAR THE BARCODE INPUT AFTER THE ADDING TO THE LINE
    //CLEAR THE BARCODE INPUT AFTER THE ADDING TO THE LINE
    // this.clearBarcodeInput();
  }

  ////Quantity change function
  ////calculatioon after the quantity changed
  ////calculatioon after the quantity changed
  ////calculatioon after the quantity changed
  quantityChange(line: SalesInvoiceItemsLine) {
    if (line.quantity === null || line.quantity === undefined) {
      line.quantity = line.minQuantity; // Set to minQuantity on null/undefined
    } else if (line.quantity < 0) {
      // Handle negative values (optional)
      line.quantity = 0; // Set to 0 on negative input (optional)
    }

    this.calculateAllItemsLines();
  }

  //delete the itemLines
  //delete the itemLines
  //delete the itemLines
  //delete the itemLines
  deleteItem(index: number): void {
    this.itemsLine.splice(index, 1); // Remove item from the array
    //calculate the each line again and total
    this.calculateAllItemsLines();
  }

  //check if item's is already there in the Line
  //check if item's is already there in the Line
  //check if item's is already there in the Line
  checkDuplicateItemCode(itemCode: string): boolean {
    return (
      this.itemsLine.find((item) => item.itemCode === itemCode) !== undefined
    );
  }

  //clear barcode fron input
  //clear barcode fron input
  //clear barcode fron input
  //clear barcode fron input
  // clearBarcodeInput(): void {
  //   if (this.barcodeInput) {
  //     this.barcodeInput.nativeElement.value = ''; // Clear the input field
  //   }
  // }

  //calculate all the items lines
  //calculate all the items lines
  //calculate all the items lines
  //calculate all the items lines

  calculateAllItemsLines() {
    this.itemsLine = this.salesInvoiceCalculation.calculateSalesInvoiceItems(
      this.itemsLine
    );
    this.calculateTotals(this.itemsLine);
  }

  //CALCULATE THE TOTALS OF ALL ITEMS LINE
  calculateTotals(items: SalesInvoiceItemsLine[]): void {
    this.totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    this.totalGrossAmount = items.reduce(
      (sum, item) => sum + item.grossAmount,
      0
    );
    this.totalDiscount = items.reduce((sum, item) => sum + item.discount, 0);
    this.totalNetAmount = items.reduce((sum, item) => sum + item.netAmount, 0);
  }

  //SET FOCUS ON THE BARCODDE ELEMENT
  //SET FOCUS ON THE BARCODDE ELEMENT
  //SET FOCUS ON THE BARCODDE ELEMENT
  setFocusOnInput(): void {
    this.barcodeInput.nativeElement.focus();
  }

  ////Billing Page routing
  ////Billing Page routing
  ////Billing Page routing
  billing() {
    this.isLoading = true;

    //need to make the post and save the items to the temp table
    //and navigate to the billing page
    //need to make the post and save the items to the temp table
    //need to make the post and save the items to the temp table
    this.router.navigate(['/salesinvoicebilling']);
  }

  //////////Make the edited or added second time item to top of the list
  //////////Make the edited or added second time item to top of the list
  //////////Make the edited or added second time item to top of the list

  // Method to edit an existing item
  updateItemLineToTop(index: number, updatedItem: SalesInvoiceItemsLine): void {
    this.itemsLine.splice(index, 1); // Remove the item from its original position
    this.itemsLine.unshift(updatedItem); // Add the edited item to the top of the list
  }



  ///Get the Items Description
  ///Get the Items Description
  ///Get the Items Description

  getItemDescription(){
    //make the call to the backend to get the items description 
    //items description may contains discount,rate ,price,if it is 
    //taxable or not
  }

}

export class SalesInvoiceItemsLine {
  itemCode: string;
  barCode: string;
  itemName: string;
  uom: string;
  rate: number;
  quantity: number;
  minQuantity: number;
  grossAmount: number;
  discount: number;
  discountPercentage: number;
  netAmount: number;
  isKeyinWeight: boolean;
}
