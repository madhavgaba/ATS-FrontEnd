import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { AuthserviceService } from '../authservice.service';
import { GetjobserviceService } from '../getjobservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-interviewer',
  templateUrl: './interviewer.component.html',
  styleUrls: ['./interviewer.component.css']
})
export class InterviewerComponent implements OnInit {
  interviewerSchedules: any;
  remarks: string;
  numberOfInterviews: any;

  constructor(
    private getSchedules: ScheduleService,
    private auth: AuthserviceService,
    private getJobs: GetjobserviceService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  onChangeComment(event) {
    this.remarks = event.target.value;
  }

  rejectInterview(event, schedule) {
    if (confirm('Sure to reject the interview?')) {
      this.getSchedules
        .rejectInterview(
          'http://localhost:8082/api/schedule/reject/' + schedule._id
        )
        .subscribe(data => this.toastr.success('Interview Rejected'));

      const closeInfo = {
        candidateId: schedule.candidateId,
        jobId: schedule.jobId,
        status: 'ToBeScheduled'
      };

      this.getJobs.closeApplication(closeInfo).subscribe(data => {
        console.log('Application status Changed');
      });

      this.getSchedules
        .getAllSchedulesForInterviewer(this.auth.userInfo()._id)
        .subscribe(data => {
          this.interviewerSchedules = data;
          console.log(data);
          this.numberOfInterviews = data.length;
        });
    }
  }

  ngOnInit() {
    const userInfo = this.auth.userInfo();
    console.log(userInfo);
    this.getSchedules
      .getAllSchedulesForInterviewer(userInfo._id)
      .subscribe(data => {
        this.interviewerSchedules = data;
        console.log(data);
        this.numberOfInterviews = data.length;
      });
  }
  submitResponse(event, schedule) {
    schedule.remarks = this.remarks;
    this.getSchedules
      .submitResponse(schedule)
      .subscribe(data => console.log(data));

    const closeInfo = {
      candidateId: schedule.candidateId,
      jobId: schedule.jobId,
      status: 'ToBeScheduled',
      remarks: this.remarks
    };
    this.getJobs.closeApplication(closeInfo).subscribe(data => {
      console.log('Application status changed');
      this.toastr.success('reponse sent');
    });
    this.getSchedules
      .getAllSchedulesForInterviewer(this.auth.userInfo()._id)
      .subscribe(data => {
        this.interviewerSchedules = data;
        console.log(data);
        this.numberOfInterviews = data.length;
      });
  }

  checkProfile(candidateId) {
    console.log(candidateId);
    this.route.navigate(['/candidate/' + candidateId]);
  }

  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
