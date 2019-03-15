import { Component, OnInit } from '@angular/core';
import { GetcandidatesService } from '../getcandidates.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  candidateId: any;
  profile: any;
  constructor(
    private getCandidate: GetcandidatesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.candidateId = this.route.snapshot.paramMap.get('candidateId');
    // console.log(this.route.snapshot.paramMap.get('candidateId'));
    this.getCandidate.getCandidateProfile(this.candidateId).subscribe(data => {
      this.profile = data;
      console.log(this.profile);
    });
  }

  getFileUrl(fileName) {
    return `http://localhost:8082/api/candidate/getUploads/${fileName}`;
  }

  routeBack() {
    this.router.navigate(['/interviewer']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
