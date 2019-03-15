import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { AddInterviewerComponent } from './admin/add-interviewer/add-interviewer.component';
import { AddJobComponent } from './admin/add-job/add-job.component';
import { PortalservicesService } from './portalservices.service';
import { RoutesModule } from './routes/routes.module';
import { HttpClientModule } from '@angular/common/http';
import { GetinterviewerService } from './getinterviewer.service';
import { GetCategoryService } from './get-category.service';
import { GetjobserviceService } from './getjobservice.service';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { AddDesignationComponent } from './admin/add-designation/add-designation.component';
import { LoginComponent } from './login/login.component';
import { AssigninterviewerComponent } from './admin/assigninterviewer/assigninterviewer.component';
import { TrackstatusComponent } from './admin/trackstatus/trackstatus.component';
import { InterviewerComponent } from './interviewer/interviewer.component';
import { DashboardComponent } from './candidate/dashboard/dashboard.component';
import { CandidateComponent } from './candidate/candidate.component';
import { JobstableComponent } from './candidate/jobstable/jobstable.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { SafePipe } from './safe.pipe';
import { VerifyotpComponent } from './verifyotp/verifyotp.component';
import { EmailverifyComponent } from './emailverify/emailverify.component';
import { MyprofileComponent } from './candidate/myprofile/myprofile.component';
import { EditprofileComponent } from './candidate/editprofile/editprofile.component';
import { ListinterviewersComponent } from './admin/listinterviewers/listinterviewers.component';
import { AddlocationComponent } from './admin/addlocation/addlocation.component';
import { AllJobsComponent } from '../app/all-jobs/all-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    AdminComponent,
    AddInterviewerComponent,
    AddJobComponent,
    AddCategoryComponent,
    AddDesignationComponent,
    LoginComponent,
    AssigninterviewerComponent,
    TrackstatusComponent,
    InterviewerComponent,
    DashboardComponent,
    CandidateComponent,
    JobstableComponent,
    ProfileComponent,
    SafePipe,
    VerifyotpComponent,
    EmailverifyComponent,
    MyprofileComponent,
    EditprofileComponent,
    ListinterviewersComponent,
    AddlocationComponent,
    AllJobsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    PortalservicesService,
    GetinterviewerService,
    GetCategoryService,
    GetjobserviceService,
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
