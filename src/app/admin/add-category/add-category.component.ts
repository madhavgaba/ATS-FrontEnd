import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetCategoryService } from 'src/app/get-category.service';
import { ToastrService, Toast } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  formGroup = new FormGroup({
    category: new FormControl('', [Validators.required])
  });

  constructor(
    private addCategoryService: GetCategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (!this.formGroup.valid) {
      return this.toastr.error('Please fill the category');
    }
    this.addCategoryService
      .addCategory(this.formGroup.value)
      .subscribe(data => console.log(data));
    this.toastr.success('Cateogory Added Successfully');
    this.formGroup.reset();
  }
}
