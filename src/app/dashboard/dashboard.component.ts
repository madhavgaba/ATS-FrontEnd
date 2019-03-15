import { Component, OnInit } from '@angular/core';
import { GetjobserviceService } from '../getjobservice.service';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  appliedJobs: any;

  constructor(
    private getAllAppliedJobs: GetjobserviceService,
    private auth: AuthserviceService
  ) {}

  ngOnInit() {
    let userInfo = this.auth.userInfo();
    console.log(userInfo._id);
    this.getAllAppliedJobs.getMyAppliedJobs(userInfo._id).subscribe(data => {
      this.appliedJobs = data;
      console.log('***', data);
    });
  }
}
