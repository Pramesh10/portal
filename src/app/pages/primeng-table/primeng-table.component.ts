import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommongetService } from '../../common-services/commonget.service';
import { ButtonModule } from 'primeng/button';
import { Table } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-primeng-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './primeng-table.component.html',
  styleUrl: './primeng-table.component.scss',
})
export class PrimengTableComponent implements OnInit {
  userService = inject(CommongetService);
  users!: User[];
  cols!: Column[];

  exportColumns!: ExportColumn[];

  statuses!: any[];

  loading: boolean = true;

  noUser: boolean = false;

  activityValues: number[] = [0, 100];

  searchValue: string | undefined;

  first = 0;

  rows = 10;

  ngOnInit(): void {
    this.getUserList();

    this.cols = [
      { field: 'age', header: 'Age', customExportHeader: 'Age' },
      { field: 'name', header: 'Name' },
      { field: 'birthday', header: 'BirthDay' },
      { field: 'location', header: 'Location' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  getUserList() {
    this.userService.getUser().subscribe((data) => {
      data.forEach((p) => (p.birthday = new Date(`${p.birthday}`)));
      this.users = data;
      this.loading = false;
    });
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  // getSeverity(status: string) {
  //   switch (status.toLowerCase()) {
  //     case 'unqualified':
  //       return 'danger';

  //     case 'qualified':
  //       return 'success';

  //     case 'new':
  //       return 'info';

  //     case 'negotiation':
  //       return 'warning';

  //     case 'renewal':
  //       return null;
  //   }
  // }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.users ? this.first === this.users.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.users ? this.first === 0 : true;
  }
}

export class User {
  name: string;
  age: number;
  birthday: Date;
  location: string;

  constructor(name: string, age: number, birthday: Date, location: string) {
    this.name = name;
    this.age = age;
    this.birthday = birthday;
    this.location = location;
  }
}

interface Column {
  field: string;
  header: string;
}

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}
