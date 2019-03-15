import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetCategoryService } from 'src/app/get-category.service';
import { Observable } from 'rxjs/Observable';
import { ICategory } from 'src/app/interface/interfaces';
import { GetinterviewerService } from 'src/app/getinterviewer.service';
import { ToastrService, Toast } from 'ngx-toastr';
import { MailService } from 'src/app/mail.service';

@Component({
  selector: 'app-add-interviewer',
  templateUrl: './add-interviewer.component.html',
  styleUrls: ['./add-interviewer.component.css']
})
export class AddInterviewerComponent implements OnInit {
  formgroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    category: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', Validators.required)
  });
  public categories: ICategory[];
  designation: String[];
  profiles: ICategory[];
  constructor(
    private getAllCategoryService: GetCategoryService,
    private getInterviewerService: GetinterviewerService,
    private toastr: ToastrService,
    private mail: MailService
  ) {}

  ngOnInit() {
    this.formgroup.get('password').setValue('');
    this.formgroup.get('confirmPassword').setValue('');
    this.getAllCategoryService
      .getAllCategory()
      .subscribe(data => (this.categories = data));
  }

  categorySelected() {
    this.profiles = this.categories.filter(
      value => value.category === this.formgroup.value.category
    );
    console.log(this.profiles);
    this.designation = this.profiles[0].designation;
    console.log(this.designation);
  }

  addInterviewer() {
    console.log('enter');
    if (!this.formgroup.valid) {
      return this.toastr.error('Please fill all the details');
    }

    let interviewerInfo = this.formgroup.value;
    this.getInterviewerService.setInterviewer(interviewerInfo).subscribe();
    this.mail
      .sendAccountActivationEmail({
        email: this.formgroup.value.email,
        password: this.formgroup.value.password
      })
      .subscribe();
    this.toastr.success('Add interviewer success');
    this.formgroup.reset();
  }

  onSubmit() {}
}
