import { Component, OnInit } from '@angular/core';
import { MainService } from '../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  constructor(private mainService: MainService, private router: Router) {}
  projects = [];
  ngOnInit() {
    this.mainService.getProjects().subscribe(data => {
      this.projects = data.projects;
    });
  }
  goToProject(id) {
    this.router.navigate(['project', id]);
  }
}
