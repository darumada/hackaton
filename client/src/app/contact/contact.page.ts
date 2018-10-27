import { Component } from '@angular/core';
import { JwtService } from '../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss']
})
export class ContactPage {
  constructor(private jwt: JwtService, private router: Router) {}
  exit() {
    this.jwt.removeToken();
    this.router.navigateByUrl('/login');
  }
}
