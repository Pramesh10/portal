import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommongetService {
  http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() {}

  getUser() {
    return this.http.get<any>(
      `${this.apiUrl}api/Product`
    );
  }
  

  getEvents() {
    return this.http.get<any>(
      `${this.apiUrl}api/Product`
    );
  }

  getAll(): Observable<Brewery> {
    return this.http.get<Brewery>(`https://api.openbrewerydb.org/breweries`);
  }
  
  
  
}

export class Brewery {
  id: number;
  name: string;
}
