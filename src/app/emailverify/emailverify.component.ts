import { Component, OnInit } from '@angular/core';
import { MailService } from '../mail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emailverify',
  templateUrl: './emailverify.component.html',
  styleUrls: ['./emailverify.component.css']
})
export class EmailverifyComponent implements OnInit {
  constructor(
    private mail: MailService,
    private current: ActivatedRoute,
    private route: Router,
    private toastr: ToastrService
  ) {}

  loading: Boolean;

  token: any;
  ngOnInit() {
    this.token = this.current.snapshot.paramMap.get('token');
    this.mail.verifyEmail(this.token).subscribe(data => {
      if (data.status) {
        this.loading = true;
        this.toastr.success('Email verfied');
        setTimeout(() => {
          this.loading = false;
          this.route.navigate(['/login']);
        }, 2000);
      } else {
        this.toastr.error('Invalid verification link');
        setTimeout(() => {
          this.loading = false;
          this.route.navigate(['/login']);
        }, 2000);
      }
    });
  }
}
