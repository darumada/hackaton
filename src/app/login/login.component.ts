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

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.mainService.login(form.value).subscribe(data => {
      this.jwt.setToken(data.user.token);
      this.router.navigateByUrl('');
    });
  }
}
