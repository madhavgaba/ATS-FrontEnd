import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationService } from 'src/app/location.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.component.html',
  styleUrls: ['./addlocation.component.css']
})
export class AddlocationComponent implements OnInit {
  formGroup = new FormGroup({
    location: new FormControl('', [Validators.required]),
    address: new FormControl(null, [
      Validators.required,
      Validators.minLength(10)
    ]),
    pincode: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6)
    ])
  });

  constructor(
    private location: LocationService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (!this.formGroup.valid) {
      return this.toastr.error('Please enter the location');
    }
    this.location.addLocation(this.formGroup.value).subscribe(data => {
      this.toastr.success('Location added successfully');
      this.formGroup.reset();
    });
  }
}
