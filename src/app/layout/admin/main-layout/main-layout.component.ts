import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgClass } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive, NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ROUTES } from '../sidebar-routes/sidebar-routes';
import { CalendarEventsComponent } from "../../../pages/calendar-events/calendar-events.component";


@Component({
    selector: 'app-main-layout',
    standalone: true,
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss',
    providers: [Keepalive],
    imports: [
        SidebarComponent,
        RouterModule,
        NgClass,
        CommonModule,
        NgIdleKeepaliveModule,
        CalendarEventsComponent
    ]
})
export class MainLayoutComponent implements OnInit {
  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('sidebarOverlay') sidebarOverlay: ElementRef;
  isFocused: boolean = false;

  dropdown1: Dropdown = { isFocused: false };
  dropdown2: Dropdown = { isFocused: false };
  subdropdown1: SubDropdown = { isFocused: false };
  subdropdown2: SubDropdown = { isFocused: false };

  // some fields to store our state so we can display it in the UI
  idleState = 'NOT_STARTED';
  countdown?: number;
  lastPing?: Date;
  /**
   *
   */

  router = inject(Router);
  constructor(private idle: Idle, cd: ChangeDetectorRef, keepalive: Keepalive) {
    idle.setIdle(10); // how long can they be inactive before considered idle, in seconds
    idle.setTimeout(600); // how long can they be idle before considered timed out, in seconds
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // provide sources that will "interrupt" aka provide events indicating the user is active
    console.log('ctor');

    // do something when the user becomes idle
    idle.onIdleStart.subscribe(() => {
      this.idleState = 'IDLE';
    });
    // do something when the user is no longer idle
    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'NOT_IDLE';
      console.log(`${this.idleState} ${new Date()}`);
      this.countdown = undefined;
      cd.detectChanges(); // how do i avoid this kludge?
    });
    // do something when the user has timed out
    idle.onTimeout.subscribe(() => {
      this.idleState = 'TIMED_OUT';
      this.router.navigateByUrl('/login');
      console.log('timed out');
    });
    // do something as the timeout countdown does its thing
    idle.onTimeoutWarning.subscribe((seconds) => {
      this.countdown = seconds;
    });

    // set keepalive parameters, omit if not using keepalive
    keepalive.interval(10); // will ping at this interval while not idle, in seconds
    keepalive.onPing.subscribe(() => (this.lastPing = new Date())); // do something when it pings
  }

  reset() {
    // we'll call this method when we want to start/reset the idle process
    // reset any component state and be sure to call idle.watch()
    this.idle.watch();
    this.idleState = 'NOT_IDLE';
    this.countdown = undefined;
    this.lastPing = undefined;
  }

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

  ngOnInit(): void {
    this.reset();
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    console.log(this.menuItems);

  }

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

  //sidebar menu items implemetation 
  public menuItems: any[];


}

export interface Dropdown {
  isFocused: boolean;
}

export interface SubDropdown {
  isFocused: boolean;
}
