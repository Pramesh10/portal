import { NgClass } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.scss',
})
export class TestListComponent implements OnInit {
  router = inject(Router);
  queryParamsValue = inject(ActivatedRoute);



  //currentStatus of document
  currentStatus: string;

  ngOnInit(): void {
    // Get the params retrieval asynchronously
    this.queryParamsValue.queryParams.subscribe((params) => {
      console.log('Asynchronous query params:', params['status']);
      this.currentStatus = params['status'];
    });
  }
}
