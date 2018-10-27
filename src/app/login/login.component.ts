import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService, JwtService } from '../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private mainService: MainService,
    private jwt: JwtService,
    private router: Router
  ) {}

  sending = false;
  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.sending = true;
    this.mainService.login(form.value).subscribe(
      data => {
        this.sending = false;
        this.jwt.setToken(data.user.token);
        this.router.navigateByUrl('');
      },
      () => {
        this.sending = false;
      }
    );
  }
}
