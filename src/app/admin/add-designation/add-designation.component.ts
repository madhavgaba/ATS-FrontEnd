import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetCategoryService } from 'src/app/get-category.service';
import { IDesignation, ICategory } from 'src/app/interface/interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent implements OnInit {
  formGroup = new FormGroup({
    designation: new FormControl('', [Validators.required])
  });
  currentCategory: '';
  categories: ICategory[];
  profiles: [];
  constructor(
    private getDesignationService: GetCategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    console.log('INIT');
    this.getDesignationService
      .getAllCategory()
      .subscribe(data => (this.categories = data));
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      return this.toastr.error('Please fill the designation');
    }
    let newObj = {
      category: this.currentCategory,
      designation: this.formGroup.get('designation').value
    };
    this.getDesignationService
      .addDesignation(newObj)
      .subscribe(data => console.log(data));
    this.toastr.success('Designation added');
    this.formGroup.reset();
  }
  handleChange(event) {
    this.currentCategory = event.target.value;
  }
}
