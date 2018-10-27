import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../shared';
import { NgForm } from '@angular/forms';

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

  project;
  sending = false;
  id;

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.id = params['id'];
      this.mainService.getProjectById(params['id']).subscribe(data => {
        this.project = data.project;
      });
    });
  }

  onSubmit(form: NgForm) {
    this.sending = true;
    this.mainService.comment(form.value, this.id).subscribe(data => {
      this.sending = false;
      this.project.comments.push(data.comment);
      form.reset();
    });
  }
}
