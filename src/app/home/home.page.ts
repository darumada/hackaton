import { Component, OnInit } from '@angular/core';
import { MainService } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  constructor(private mainService: MainService) {}
  projects = [];
  ngOnInit() {
    this.mainService.getProjects().subscribe(data => {
      this.projects = data.project;
      console.log(data);
    });
  }
}
