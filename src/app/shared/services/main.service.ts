import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private api: ApiService) {}

  login(data) {
    return this.api.request('post', 'users/login', data);
  }
}