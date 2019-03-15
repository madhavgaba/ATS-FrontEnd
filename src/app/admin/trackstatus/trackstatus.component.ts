import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleService } from 'src/app/schedule.service';
import { GetcandidatesService } from 'src/app/getcandidates.service';
import { GetjobserviceService } from 'src/app/getjobservice.service';
import { GetinterviewerService } from 'src/app/getinterviewer.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TrackService } from 'src/app/track.service';

@Component({
  selector: 'app-trackstatus',
  templateUrl: './trackstatus.component.html',
  styleUrls: ['./trackstatus.component.css']
})
export class TrackstatusComponent implements OnInit {
  formGroup = new FormGroup({
    jobId: new FormControl(),
    status: new FormControl()
  });

  constructor(
    private schedulesService: ScheduleService,
    private getCandidateService: GetcandidatesService,
    private getJobService: GetjobserviceService,
    private track: TrackService
  ) {}

  candidates: any;
  applications: any;
  interviewers: any;
  jobIds: any;
  isAnyCandidate: boolean;
  isStatusSelected: boolean;

  ngOnInit() {
    this.isAnyCandidate = false;
    this.isStatusSelected = false;
    this.getJobService.getAllJobIds().subscribe(data => (this.jobIds = data));
  }

  jobSelected(event) {
    this.formGroup.get('jobId').setValue(event.target.value);
    this.track
      .getAllApplications(this.formGroup.value.jobId)
      .subscribe(data => {
        this.applications = data;
      });
  }

  statusSelected(event) {
    let status = event.target.value;
    this.candidates = this.applications.filter(
      value => value.status === event.target.value
    );
    this.isAnyCandidate = this.candidates.length > 0;
    // this.isStatusSelected = true;
    console.log(this.candidates);
  }

  onSubmit() {
    this.isStatusSelected = true;
  }
}
