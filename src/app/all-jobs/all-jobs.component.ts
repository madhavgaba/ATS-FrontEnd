import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetjobserviceService } from '../getjobservice.service';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.css']
})
export class AllJobsComponent implements OnInit {
  constructor(
    private getAllJobs: GetjobserviceService,
    private toastr: ToastrService
  ) {}

  allJobs: any;

  ngOnInit() {
    this.getAllJobs.getAllJobs().subscribe(data => (this.allJobs = data));
  }
}
