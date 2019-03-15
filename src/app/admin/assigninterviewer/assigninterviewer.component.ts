import { Component, OnInit } from '@angular/core';
import { GetinterviewerService } from 'src/app/getinterviewer.service';
import { Iinterviewer } from '../../interface/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetcandidatesService } from 'src/app/getcandidates.service';
import { ScheduleService } from 'src/app/schedule.service';
import { GetjobserviceService } from 'src/app/getjobservice.service';
import { CandidatehistoryService } from 'src/app/candidatehistory.service';
import { ApplicationsService } from 'src/app/applications.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assigninterviewer',
  templateUrl: './assigninterviewer.component.html',
  styleUrls: ['./assigninterviewer.component.css']
})
export class AssigninterviewerComponent implements OnInit {
  allInterviewers: any;
  jobs: any;
  candidates: any;
  interviewsDone: any;
  isCandidateSelected: boolean;
  loading: boolean;
  date: any;

  formGroup = new FormGroup({
    jobId: new FormControl('', [Validators.required]),
    candidateId: new FormControl('', [Validators.required]),
    interviewerId: new FormControl(''),
    time: new FormControl(''),
    date: new FormControl('')
  });

  constructor(
    private getInterviewers: GetinterviewerService,
    private getCandidates: GetcandidatesService,
    private setSchedule: ScheduleService,
    private getJobs: GetjobserviceService,
    private getCandidateHistory: CandidatehistoryService,
    private scheduleHelper: ApplicationsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.isCandidateSelected = false;
    this.getInterviewers.getAllInterviewers().then(data => {
      this.allInterviewers = data;
    });

    this.getJobs.getAllJobs().subscribe(data => {
      this.jobs = data;
      // console.log(this.jobs[0]._id);
    });
    this.date = new Date().toISOString().substr(0, 10);
    // console.log(this.date);
  }

  getHistory() {
    // console.log(this.formGroup.value.jobId);
    this.isCandidateSelected = true;
    let url = `http://localhost:8082/api/schedule/${
      this.formGroup.value.jobId
    }/${this.formGroup.value.candidateId}`;
    this.getCandidateHistory.getHistory(url).subscribe(data => {
      this.interviewsDone = data;
      console.log(data);
    });
  }

  getAllCandidates(event) {
    // this.isCandidateSelected = this.formGroup.value.candidateId === '';
    console.log(this.formGroup.value.jobId);
    this.getCandidates
      .getAllCandidatesWithId(this.formGroup.value.jobId)
      .subscribe(data => {
        // console.log(this.candidates);
        this.candidates = data;
        console.log(data);
      });
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      return this.toastr.error('Please fill all the details');
    }
    // console.log('clicked');
    this.setSchedule
      .setSchedule(this.formGroup.value)
      .subscribe(data => console.log(data));

    this.scheduleHelper
      .statusChanged({
        candidateId: this.formGroup.value.candidateId,
        jobId: this.formGroup.value.jobId,
        status: 'InterviewScheduled'
      })
      .subscribe(data => console.log('*******', data));

    this.toastr.success('Interview Scheduled');
  }

  markSelectionStatus() {
    this.scheduleHelper
      .statusChanged({
        candidateId: this.formGroup.value.candidateId,
        jobId: this.formGroup.value.jobId,
        status: 'Selected'
      })
      .subscribe(data => console.log(data));
    this.toastr.success('Selected');
  }

  markRejectionStatus() {
    console.log('gotcha');
    this.scheduleHelper
      .statusChanged({
        candidateId: this.formGroup.value.candidateId,
        jobId: this.formGroup.value.jobId,
        status: 'Rejected'
      })
      .subscribe(data => console.log(data));
    this.toastr.error('Rejected');
  }

  selectInterviewers() {}
}
