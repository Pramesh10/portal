import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSeriesListComponent } from './number-series-list.component';

describe('NumberSeriesListComponent', () => {
  let component: NumberSeriesListComponent;
  let fixture: ComponentFixture<NumberSeriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberSeriesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberSeriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
