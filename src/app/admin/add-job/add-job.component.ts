import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ICategory, IJobs } from 'src/app/interface/interfaces';
import { GetjobserviceService } from '../../getjobservice.service';
import { GetCategoryService } from 'src/app/get-category.service';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from 'src/app/location.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  formGroup = new FormGroup({
    category: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    lastDate: new FormControl('', [Validators.required]),
    paySalary: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    bondDetail: new FormControl(),
    blockJobId: new FormControl(),
    experienceYears: new FormControl('', [Validators.required]),
    experienceMonths: new FormControl(),
    description: new FormControl(),
    skillsRequired: new FormControl()
  });

  skillForm = this.fb.array([this.createSkill()]);

  createSkill() {
    return this.fb.group({
      skillName: [null]
    });
  }

  categories: ICategory[];
  profiles: ICategory[];
  designation: String[];
  jobs: IJobs[];
  skills: String[];
  loading: boolean;
  counter: number;
  locations: any;

  constructor(
    private getAllJobs: GetjobserviceService,
    private getAllCategories: GetCategoryService,
    private toastr: ToastrService,
    private location: LocationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.counter = 0;
    this.getAllCategories
      .getAllCategory()
      .subscribe(data => (this.categories = data));

    this.getAllJobs.getAllJobs().subscribe(data => (this.jobs = data));
    this.location.getAllLocations().subscribe(data => (this.locations = data));
  }

  addSkill() {
    this.skillForm = this.skillForm as FormArray;
    this.skillForm.push(this.createSkill());

    // let curSkillForm = <FormArray>this.skillForm;
    // console.log(curSkillForm);

    // return this.fb.group({
    //   skillName: [null]
    // });
    // console.log(this.skillForm);

    // let curSkillForm = <FormArray>this.skillForm;
    // if (!this.skillForm) {
    //   this.skillForm = new FormArray([]);
    //   return (<FormArray>this.skillForm).push(new FormControl());
    // }

    // return (<FormArray>this.skillForm).push(new FormControl());
    // return new FormControl();

    // let curSkills =

    // const curSkills = this.skillForm.value;
    // if (this.skills) {
    //   this.skills.push(curSkills);
    // } else {
    //   this.skills = [curSkills];
    // }
    // this.skillForm.reset();
    // console.log(this.skills);
  }
  onSubmit() {
    console.log(this.skillForm);
    if (!this.formGroup.valid) {
      return this.toastr.error('Please fill the details correctly');
    }
    let jobProfile = this.formGroup.value;
    jobProfile.skillsRequired = this.skills;
    jobProfile.jobId = Math.random() * 100;
    this.getAllJobs.addJob(jobProfile).subscribe(data => console.log(data));
    this.toastr.success('Job added successfully!');
    this.formGroup.reset();
  }

  categorySelected(event) {
    // console.log('came here')
    this.profiles = this.categories.filter(
      value => value.category === event.target.value
    );
    console.log(this.profiles);
    this.designation = this.profiles[0].designation;
    console.log(this.designation);
  }

  locationSelected(event) {
    this.formGroup.get('location').setValue(event.target.value);
  }

  resetSkills() {
    this.skills.pop();
  }
}
