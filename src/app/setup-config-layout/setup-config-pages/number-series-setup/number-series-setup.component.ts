import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CalendarModule } from 'primeng/calendar';
@Component({
  selector: 'app-number-series-setup',
  standalone: true,
  imports: [ BsDatepickerModule,FormsModule,CalendarModule],
  templateUrl: './number-series-setup.component.html',
  styleUrl: './number-series-setup.component.scss',
  providers : []
})
export class NumberSeriesSetupComponent {
  startingDate: Date[];
  

  onCreateNumberSeries(){

  }
}
