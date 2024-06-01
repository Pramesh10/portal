import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';

import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventAddArg,
  EventSegment,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { EventInput } from '@fullcalendar/core';
import { CommongetService } from '../../common-services/commonget.service';

@Component({
  selector: 'app-calendar-events',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FullCalendarModule],
  templateUrl: './calendar-events.component.html',
  styleUrl: './calendar-events.component.scss',
})
export class CalendarEventsComponent implements OnInit {
  calendarVisible = signal(true); // Signal for calendar visibility toggle
  eventsList: EventApi[] = []; // Array to hold event data

  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    events: [],
    // Assign events array for initial data
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  });

  currentEvents = signal<EventApi[]>([]); // Signal to track current events

  constructor(
    private changeDetector: ChangeDetectorRef,
    private eventService: CommongetService
  ) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events) => {
      this.eventsList = events; // Assign fetched data to events array
      console.log(this.eventsList);
      // this.calendarOptions.add({
      //   events: events
      // });

      this.calendarOptions.update((options) => ({
        ...options,
        events: events,
        
      }));
      this.changeDetector.detectChanges();
    });
  }

  // Handle calendar visibility toggle (optional)
  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  // Handle selecting a date on the calendar
  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    if (title) {
      const calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // Clear date selection

      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  // Handle clicking on an event
  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'?`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  // Update current events based on FullCalendar events (optional)
  handleEvents(events: EventApi[]) {
    console.log(events);
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }
}
