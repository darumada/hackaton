import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(private jwt: JwtHelperService) {}

  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  removeToken() {
    localStorage.removeItem('access_token');
  }

  getTokenData() {
    return this.jwt.decodeToken(localStorage.getItem('access_token'));
  }
}
