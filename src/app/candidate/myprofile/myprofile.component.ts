import { Component, OnInit } from '@angular/core';
import { GetcandidatesService } from 'src/app/getcandidates.service';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  constructor(
    private getCandidate: GetcandidatesService,
    private auth: AuthserviceService
  ) {}

  candidateId: any;
  profile: any;

  ngOnInit() {
    this.candidateId = this.auth.userInfo()._id;
    this.getCandidate.getCandidateProfile(this.candidateId).subscribe(data => {
      this.profile = data;
      console.log(this.profile);
    });
  }

  getFileUrl(fileName) {
    return `http://localhost:8082/api/candidate/getUploads/${fileName}`;
  }
}
