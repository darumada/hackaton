import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../shared';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private mainService: MainService
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.mainService.getProjectById(params['id']).subscribe(data => {
        console.log(data);
      });
    });
  }
}
