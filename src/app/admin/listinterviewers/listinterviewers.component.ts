import { Component, OnInit } from '@angular/core';
import { GetinterviewerService } from 'src/app/getinterviewer.service';

@Component({
  selector: 'app-listinterviewers',
  templateUrl: './listinterviewers.component.html',
  styleUrls: ['./listinterviewers.component.css']
})
export class ListinterviewersComponent implements OnInit {
  allInterviewers: any;
  constructor(private getInterviewers: GetinterviewerService) {}

  ngOnInit() {
    this.getInterviewers.getAllInterviewers().then(data => {
      this.allInterviewers = data;
      console.log(this.allInterviewers);
    });
  }
}
