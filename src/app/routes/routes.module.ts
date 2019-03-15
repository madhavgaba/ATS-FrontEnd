import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { AddJobComponent } from '../admin/add-job/add-job.component';
import { AddInterviewerComponent } from '../admin/add-interviewer/add-interviewer.component';
import { AddCategoryComponent } from '../admin/add-category/add-category.component';
import { AddDesignationComponent } from '../admin/add-designation/add-designation.component';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { AssigninterviewerComponent } from '../admin/assigninterviewer/assigninterviewer.component';
import { JobstableComponent } from '../candidate/jobstable/jobstable.component';
import { TrackstatusComponent } from '../admin/trackstatus/trackstatus.component';
import { InterviewerComponent } from '../interviewer/interviewer.component';
import { RoleguardService } from '../roleguard.service';
import { DashboardComponent } from '../candidate/dashboard/dashboard.component';
import { CandidateComponent } from '../candidate/candidate.component';
import { ProfileComponent } from '../profile/profile.component';
import { VerifyotpComponent } from '../verifyotp/verifyotp.component';
import { EmailverifyComponent } from '../emailverify/emailverify.component';
import { MyprofileComponent } from '../candidate/myprofile/myprofile.component';
import { AuthgaurdService } from '../authgaurd.service';
import { EditprofileComponent } from '../candidate/editprofile/editprofile.component';
import { ListinterviewersComponent } from '../admin/listinterviewers/listinterviewers.component';
import { AddlocationComponent } from '../admin/addlocation/addlocation.component';
import { AllJobsComponent } from '../all-jobs/all-jobs.component';

const route: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleguardService],
    data: { expectedRole: 'admin' },
    children: [
      { path: 'addInterviewer', component: AddInterviewerComponent },
      { path: 'addJob', component: AddJobComponent },
      { path: 'addCategory', component: AddCategoryComponent },
      { path: 'addDesignation', component: AddDesignationComponent },
      { path: 'assignInterviewer', component: AssigninterviewerComponent },
      { path: 'track', component: TrackstatusComponent },
      { path: 'listInterviewers', component: ListinterviewersComponent },
      { path: 'addLocation', component: AddlocationComponent }
    ]
  },
  {
    path: 'candidate',
    component: CandidateComponent,
    canActivate: [RoleguardService],
    data: { expectedRole: 'interviewee' },
    children: [
      { path: 'allJobs', component: JobstableComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'myprofile', component: MyprofileComponent },
      { path: 'editprofile', component: EditprofileComponent }
    ]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthgaurdService]
  },
  {
    path: 'allJobs',
    component: AllJobsComponent,
    canActivate: [AuthgaurdService]
  },
  {
    path: 'interviewer',
    component: InterviewerComponent,
    canActivate: [RoleguardService],
    data: { expectedRole: 'interviewer' }
  },
  {
    path: 'candidate/:candidateId',
    component: ProfileComponent,
    canActivate: [RoleguardService],
    data: { expectedRole: 'interviewer' }
  },
  {
    path: 'otp',
    component: VerifyotpComponent
  },
  {
    path: 'emailverify/:token',
    component: EmailverifyComponent
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(route)],
  exports: [RouterModule]
})
export class RoutesModule {}
