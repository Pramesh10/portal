import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent,RouterModule,NgClass,CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('sidebarOverlay') sidebarOverlay: ElementRef;
  isFocused: boolean = false;

  dropdown1: Dropdown = { isFocused: false };
  dropdown2: Dropdown = { isFocused: false };
  subdropdown1: SubDropdown = { isFocused: false };
  subdropdown2: SubDropdown = { isFocused: false };

  toggleDropdown(dropdown: Dropdown): void {
    dropdown.isFocused = !dropdown.isFocused;

    // Ensure only one dropdown is open at a time
    if (dropdown.isFocused) {
      // Close all other dropdowns
      if (dropdown !== this.dropdown1) {
        this.dropdown1.isFocused = false;
      }
      if (dropdown !== this.dropdown2) {
        this.dropdown2.isFocused = false;
      }     
    }
  }

  toggleSubDropdown(subdropdown: SubDropdown): void {
    subdropdown.isFocused = !subdropdown.isFocused;
    if (subdropdown.isFocused) {
        // Close all other dropdowns
        if (subdropdown !== this.subdropdown1) {
          this.subdropdown1.isFocused = false;
        }
        if (subdropdown !== this.subdropdown2) {
          this.subdropdown2.isFocused = false;
        }     
      }
  }

  ngAfterViewInit() {}

  ngOnInit(): void {}

  isCollapsed: boolean = false;

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  collapseSidebarOnMouseLeave(): void {
    if (this.isCollapsed) {
      const dropdownMenus = document.querySelectorAll('.sidebar-dropdown-menu');
      dropdownMenus.forEach((menu: HTMLElement) => {
        menu.style.display = 'none';
      });

      // Remove 'focused' class from menu items if needed
      const focusedItems = document.querySelectorAll(
        '.sidebar-menu-item.has-dropdown.focused, .sidebar-dropdown-menu-item.has-dropdown.focused'
      );
      focusedItems.forEach((item: HTMLElement) => {
        item.classList.remove('focused');
      });
    }
  }

  collapseSidebar(): void {
    this.isCollapsed = true;
    const dropdownMenus = document.querySelectorAll('.sidebar-dropdown-menu');
    dropdownMenus.forEach((menu: HTMLElement) => {
      menu.style.display = 'none';
    });

    // Remove 'focused' class from menu items if needed
    const focusedItems = document.querySelectorAll(
      '.sidebar-menu-item.has-dropdown.focused, .sidebar-dropdown-menu-item.has-dropdown.focused'
    );
    focusedItems.forEach((item: HTMLElement) => {
      item.classList.remove('focused');
    });
    // Add logic to slide up dropdown menus and remove 'focused' class from menu items if needed
  }
}

export interface Dropdown {
  isFocused: boolean;
}

export interface SubDropdown {
  isFocused: boolean;
}