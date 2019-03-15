import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetcandidatesService } from 'src/app/getcandidates.service';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  userInfo: {
    name: string;
    password: string;
    education: {
      degree: string;
      completionDate: Date;
      college: string;
    };
    previousEmployee: string;
    cgpa: string;
    experience: number;
  };

  constructor(
    private auth: AuthserviceService,
    private route: Router,
    private toastr: ToastrService,
    private getCandidate: GetcandidatesService,
    private profile: ProfileService
  ) {}

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(),
    email: new FormControl(),
    password: new FormControl('', [Validators.required]),
    degree: new FormControl('', [Validators.required]),
    completionDate: new FormControl(),
    college: new FormControl('', [Validators.required]),
    previousEmployee: new FormControl(),
    cgpa: new FormControl(),
    experience: new FormControl(),
    address: new FormControl(),
    pincode: new FormControl(),
    landmark: new FormControl()
  });

  ngOnInit() {
    this.getCandidate
      .getAllDetailsOfCandidate(this.auth.userInfo()._id)
      .subscribe(data => {
        this.userInfo = data;
        console.log(data);
        this.formGroup.get('name').setValue(data.name);
        this.formGroup.get('email').setValue(data.email);
        this.formGroup.get('phoneNumber').setValue(data.phoneNumber);
        this.formGroup.get('password').setValue(data.password);
        this.formGroup.get('degree').setValue(data.education.degree);
        this.formGroup
          .get('completionDate')
          .setValue(data.education.completionDate);
        this.formGroup.get('college').setValue(data.education.college);
        this.formGroup.get('experience').setValue(data.experience);
        this.formGroup.get('cgpa').setValue(data.cgpa);
        this.formGroup.get('previousEmployee').setValue(data.previousEmployee);
        this.formGroup.get('landmark').setValue(data.residence.landmark);
        this.formGroup.get('pincode').setValue(data.residence.pincode);
        this.formGroup.get('address').setValue(data.residence.address);
        // this.formGroup.get('resume').setValue(data.resume);
        // this.formGroup.get('video').setValue(data.video);
      });
  }

  onSubmit() {
    console.log(this.formGroup.value);
    if (!this.formGroup.valid) {
      return this.toastr.error('Fill all the necessary details');
    }
    let updateObj = Object.assign({}, ...this.formGroup.value, {
      candidateId: this.auth.userInfo()._id
    });
    console.log(updateObj);

    this.profile.updateProfile(updateObj).subscribe(data => {
      if (data.success) {
        this.toastr.success('Profile Updated successfully');
      } else {
        this.toastr.error('There was an error updating your profile');
      }
    });

    // let formData = new FormData();
    // // formData.append('education', this.formGroup.value);
    // formData.append('degree', this.formGroup.get('degree').value);
    // formData.append(
    //   'completionDate',
    //   this.formGroup.get('completionDate').value
    // );
    // formData.append('college', this.formGroup.get('college').value);

    // formData.append('name', this.formGroup.get('name').value);
    // formData.append('email', this.formGroup.get('email').value);
    // formData.append('phoneNumber', this.formGroup.get('phoneNumber').value);

    // formData.append('password', this.formGroup.get('password').value);

    // formData.append(
    //   'previousEmployee',
    //   this.formGroup.get('previousEmployee').value
    // );
    // formData.append('experience', this.formGroup.get('experience').value);
    // formData.append('resume', this.formGroup.get('resume').value);
    // formData.append('video', this.formGroup.get('video').value);

    // console.log();
    // // this.signUpService.signUp(formData).subscribe(data => console.log(data));
    // this.route.navigate(['/login']);
  }
}
