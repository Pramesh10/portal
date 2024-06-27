import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-setup-config',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './setup-config.component.html',
  styleUrl: './setup-config.component.scss'
})
export class SetupConfigComponent {
  isCollapsed: boolean = false;

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
