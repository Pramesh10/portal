import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceBillingComponent } from './sales-invoice-billing.component';

describe('SalesInvoiceBillingComponent', () => {
  let component: SalesInvoiceBillingComponent;
  let fixture: ComponentFixture<SalesInvoiceBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesInvoiceBillingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesInvoiceBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
