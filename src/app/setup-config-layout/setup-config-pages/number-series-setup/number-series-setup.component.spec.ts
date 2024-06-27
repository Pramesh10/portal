import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSeriesSetupComponent } from './number-series-setup.component';

describe('NumberSeriesSetupComponent', () => {
  let component: NumberSeriesSetupComponent;
  let fixture: ComponentFixture<NumberSeriesSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberSeriesSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberSeriesSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
