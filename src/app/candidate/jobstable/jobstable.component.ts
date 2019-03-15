import { Component, OnInit } from '@angular/core';
import { GetjobserviceService } from '../../getjobservice.service';
import { IJobs } from '../../interface/interfaces';
import { AuthserviceService } from '../../authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jobs-table',
  templateUrl: './jobstable.component.html',
  styleUrls: ['./jobstable.component.css']
})
export class JobstableComponent implements OnInit {
  constructor(
    private getAllJobs: GetjobserviceService,
    public auth: AuthserviceService,
    private toastr: ToastrService
  ) {}

  allJobs = [];
  _id: any;

  ngOnInit() {
    this.getAllJobs.getAllJobs().subscribe(data => (this.allJobs = data));
  }

  applyJob(index) {
    if (confirm('Are you sure you want to apply?')) {
      const userInfo = this.auth.userInfo();
      this.getAllJobs
        .applyJob({ candidateId: userInfo._id, jobId: index })
        .subscribe(data => {
          if (data.success) {
            this.toastr.success('Job applied successfully');
          } else {
            this.toastr.warning('You have already applied for this job');
          }
        });
    }
    // this.getAllJobs.applyJob(params).subscribe(data => console.log(data));
    // alert('Applied job successfully');
  }
}
