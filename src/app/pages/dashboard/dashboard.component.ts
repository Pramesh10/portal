import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers:[]
})


export class DashboardComponent implements OnInit {

  router = inject(Router);

  //Keypress events add on the pages
  //Keypress events add on the pages
  //Keypress events add on the pages
  //Keypress events add on the pages
  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'F1') {
      event.preventDefault(); // Prevent the default action (e.g., opening help in some browsers)
      this.router.navigate(['/salesinvoice', 'sales']);
      // Add your F1 key logic here
    }
    if (event.key === 'F2') {
      event.preventDefault(); // Prevent the default action (e.g., opening help in some browsers)
      this.router.navigate(['/salesinvoice', 'tax']);
      // Add your F1 key logic here
    }
  }

  //Keypress events end on the pages
  //Keypress events end on the pages
  //Keypress events end on the pages
  //Keypress events end on the pages
  ngOnInit(): void {
    
  }
 
}
