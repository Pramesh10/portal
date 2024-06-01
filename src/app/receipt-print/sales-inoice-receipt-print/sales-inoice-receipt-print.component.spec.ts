import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInoiceReceiptPrintComponent } from './sales-inoice-receipt-print.component';

describe('SalesInoiceReceiptPrintComponent', () => {
  let component: SalesInoiceReceiptPrintComponent;
  let fixture: ComponentFixture<SalesInoiceReceiptPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesInoiceReceiptPrintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesInoiceReceiptPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
