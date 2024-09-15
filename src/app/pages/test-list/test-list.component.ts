import { CommonModule, NgClass } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Perform } from './perform.class';
import {
  CommongetService,
  Brewery,
} from '../../common-services/commonget.service';

@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [RouterLink, NgClass, CommonModule],
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.scss',
})
export class TestListComponent implements OnInit {
  router = inject(Router);
  queryParamsValue = inject(ActivatedRoute);

  data = new Perform<Brewery>();
  //currentStatus of document
  currentStatus: string;

  /**
   *
   */
  constructor(private dataService: CommongetService) {}

  ngOnInit(): void {
    // Get the params retrieval asynchronously
    this.queryParamsValue.queryParams.subscribe((params) => {
      console.log('Asynchronous query params:', params['status']);
      this.currentStatus = params['status'];
    });

    this.data.load(this.dataService.getAll());

    console.log(this.data);
    console.log(this.data);
  }
}
