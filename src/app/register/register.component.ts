import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService, JwtService } from '../shared';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private mainService: MainService,
    private jwt: JwtService,
    private router: Router
  ) {}

  sending = false;

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.sending = true;
    this.mainService.register(form.value).subscribe(
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
