import { Component, OnInit } from '@angular/core';
import { GetjobserviceService } from '../../getjobservice.service';
import { AuthserviceService } from '../../authservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  appliedJobs: any;
  scheduledJobs: any;

  constructor(
    private getAllAppliedJobs: GetjobserviceService,
    private auth: AuthserviceService
  ) {}

  ngOnInit() {
    // console.log('init');
    let userInfo = this.auth.userInfo();
    this.getAllAppliedJobs.getMyAppliedJobs(userInfo._id).subscribe(data => {
      this.appliedJobs = data;
      console.log(data);
      this.appliedJobs.map(value => {
        if (value.status === 'InterviewScheduled') {
          this.getAllAppliedJobs
            .getAllScheduledJobs({
              candidateId: userInfo._id,
              jobId: value.jobId
            })
            .subscribe(info => {
              (value.date = info.date), (value.time = info.time);
              console.log(this.appliedJobs);
            });
        }
      });
    });
  }
}
