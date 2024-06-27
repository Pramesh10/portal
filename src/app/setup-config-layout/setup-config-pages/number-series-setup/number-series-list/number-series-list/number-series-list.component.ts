import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-number-series-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './number-series-list.component.html',
  styleUrl: './number-series-list.component.scss'
})
export class NumberSeriesListComponent {
  numberSeriesLine:any;
}
