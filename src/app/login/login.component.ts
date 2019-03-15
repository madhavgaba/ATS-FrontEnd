import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(
    private auth: AuthserviceService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // console.log('logint inti');
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.auth.userLogin(this.formGroup.value).subscribe(
        data => {
          console.log(data.role);
          if (data.role === 'admin') {
            this.route.navigate(['/admin/addCategory']);
          } else if (data.role === 'interviewee') {
            console.log(data.role);
            this.route.navigate(['/candidate/allJobs']);
          } else if (data.role === 'interviewer') {
            this.route.navigate(['/interviewer']);
          } else {
            console.log('toastr called');
            this.toastr.error(data.message);
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.toastr.error('Invalid Input');
    }
  }

  onPressSignUp() {
    localStorage.removeItem('token');
    this.route.navigate(['/signup']);
  }
}
