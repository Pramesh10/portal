import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable()

@Injectable({
  providedIn: 'root'
})
export class UserloginService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(){
    
  }

  

  logout() {
    
  }
}
