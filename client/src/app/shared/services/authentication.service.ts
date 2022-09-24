import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import { url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl = url;
  constructor(private readonly http: HttpClient) { }

  login(user: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, user);
  }

  registerUser(user: User) {
   return this.http.post(`${this.apiUrl}/auth/signup`, user);
  }
}
