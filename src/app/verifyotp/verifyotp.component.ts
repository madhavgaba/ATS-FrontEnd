import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { ToastrService } from 'ngx-toastr';
import { genOtp } from '../interface/interfaces';
import { Router } from '@angular/router';
import { MailService } from '../mail.service';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css']
})
export class VerifyotpComponent implements OnInit {
  constructor(
    private auth: AuthserviceService,
    private toastr: ToastrService,
    private route: Router,
    private mail: MailService
  ) {}

  valueOtp: string;
  ngOnInit() {
    console.log(this.auth.userInfo);
    // this.otpInfo.userId=this.getAllAuthService.userInfo.userId
  }

  sendOtpEvent(event) {
    const otpInfo = new genOtp(this.auth.userInfo()._id, 'candidate', 'verify');
    this.auth.sendOtp(otpInfo).subscribe(data => {
      console.log(data);
    });
  }
  otpEvent(event) {
    this.valueOtp = event.target.value;
  }
  verifyOtpEvent(event) {
    this.auth
      .matchOtp(`${this.auth.userInfo()._id}/${this.valueOtp}`)
      .subscribe(data => {
        if (data.status == 'false') {
          this.toastr.error('Incorrect Otp');
        } else {
          this.toastr.success('Matched Successfully');
          this.mail.sendEmail(`${this.auth.userInfo()._id}`).subscribe(data =>
            setTimeout(() => {
              this.toastr.success(
                'A verification mail has been sent to your mail address'
              );
            }, 1500)
          );
          localStorage.removeItem('token');
          this.route.navigate(['/login']);
        }
      });
  }
}
