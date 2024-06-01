import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SalesInvoiceUtilisCalculationLogic {
  constructor() {}

  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  //calculate the r
  calculateRate(): number {
    return 15;
  }

  calculateGrossAmount(rate: number, quantity: number): number {
    console.log(quantity, 'quantity calculation ');
    return rate * quantity;
  }


  calculateNetAmount(rate: number, quantity: number): number {
    console.log(quantity, 'quantity calculation ');
    return rate * quantity;
  }

  calculateAllItemsLines() {}

  calculateSalesInvoiceItems(
    items: SalesInvoiceItemsLine[]
  ): SalesInvoiceItemsLine[] {
    return items.map((item) => {
      // Calculate grossAmount as rate * quantity
      item.grossAmount = item.rate * item.quantity;

      // Calculate discountPercentage as (discount / grossAmount) * 100
      item.discountPercentage = item.grossAmount
        ? (item.discount / item.grossAmount) * 100
        : 0;

      // Calculate netAmount as grossAmount - discount
      item.netAmount = item.grossAmount - item.discount;

      return item;
    });
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
  isKeyinWeight : boolean;
}
