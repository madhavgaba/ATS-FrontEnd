import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit() {}

  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
