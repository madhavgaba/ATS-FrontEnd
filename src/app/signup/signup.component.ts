import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  phoneNumberRegex: any;

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      )
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    degree: new FormControl('', [Validators.required]),
    completionDate: new FormControl('', [Validators.required]),
    college: new FormControl('', [Validators.required]),
    cgpa: new FormControl('', [Validators.required]),
    previousEmployee: new FormControl(),
    experience: new FormControl(),
    resume: new FormControl('', [Validators.required]),
    video: new FormControl('', [Validators.required]),
    address: new FormControl(),
    landmark: new FormControl(),
    pincode: new FormControl()
  });

  constructor(
    private signUpService: SignupService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // this.formGroup.get('phoneNumber').setValue('');
  }

  onSubmit() {
    console.log(this.formGroup);

    if (!this.formGroup.valid) {
      return this.toastr.error('* marked fields are necessary');
    }

    let formData = new FormData();
    // formData.append('education', this.formGroup.value);
    formData.append('degree', this.formGroup.get('degree').value);
    formData.append(
      'completionDate',
      this.formGroup.get('completionDate').value
    );
    formData.append('college', this.formGroup.get('college').value);

    formData.append('name', this.formGroup.get('name').value);
    formData.append('email', this.formGroup.get('email').value);
    formData.append('phoneNumber', this.formGroup.get('phoneNumber').value);
    formData.append('cgpa', this.formGroup.get('cgpa').value);

    formData.append('password', this.formGroup.get('password').value);

    console.log(Object.assign({}, ...this.formGroup.value));
    formData.append(
      'previousEmployee',
      this.formGroup.get('previousEmployee').value
    );
    formData.append('experience', this.formGroup.get('experience').value);
    formData.append('resume', this.formGroup.get('resume').value);
    formData.append('video', this.formGroup.get('video').value);
    formData.append('address', this.formGroup.get('address').value);
    formData.append('landmark', this.formGroup.get('landmark').value);
    formData.append('pincode', this.formGroup.get('pincode').value);

    console.log();
    this.signUpService.signUp(formData).subscribe(data => console.log(data));
    this.route.navigate(['/login']);
  }

  onSelectResumeFile(event) {
    if (event.target.files.length > 0) {
      console.log(event.target.files[0].name);
      let fileName = event.target.files[0].name;
      let extn = fileName.substr(fileName.lastIndexOf('.') + 1);
      extn = JSON.stringify(extn);
      console.log(extn);

      if (extn != 'pdf' && extn != 'doc') {
        return this.toastr.error('Only pdf files are accepted');
      } else {
        this.formGroup.get('resume').setValue(event.target.files[0]);
      }
    }
  }

  onSelectVideoFile(event) {
    if (event.target.files.length > 0) {
      let fileName = event.target.files[0].name;
      let extn = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (extn != 'mp4') {
        return this.toastr.error('Only mp4 files are accepted');
      } else if (event.target.files[0].size > 10 * 1024 * 1024) {
        return this.toastr.error('Please upload video of less than 10mb');
      }

      this.formGroup.get('video').setValue(event.target.files[0]);
    }
  }

  onPressLogin() {
    console.log('login');
    this.route.navigate(['/login']);
  }
}
