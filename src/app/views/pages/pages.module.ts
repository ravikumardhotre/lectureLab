import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { AccordionItemComponent, AccordionModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, SharedModule, SpinnerModule, TabsModule, TooltipModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { LogOutComponent } from './log-out/log-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import { NgSelectModule } from '@ng-select/ng-select';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CreateUsersComponent } from './create-users/create-users.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { AllInstructorsComponent } from './all-instructors/all-instructors.component';
import { AssignBatchedToCourseComponent } from './assign-batched-to-course/assign-batched-to-course.component';
import { AllAssignedBatchesComponent } from './all-assigned-batches/all-assigned-batches.component';
@NgModule({
  declarations: [
    LoginComponent,
    Page404Component,
    Page500Component,
    LogOutComponent,
    UpdatePasswordComponent,
    CreateUsersComponent,
    UpdateUsersComponent,
 
    AddCoursesComponent,
    AllInstructorsComponent,
    AssignBatchedToCourseComponent,
    AllAssignedBatchesComponent
    
  ],
  imports: [
    MatProgressSpinnerModule,
    SpinnerModule,
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    DataTablesModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
    }),
   
    MatStepperModule,
    NgSelectModule,
    FullCalendarModule,
    AccordionItemComponent,
    AccordionModule,
    SharedModule,
    NavModule,
    TabsModule
  ]
})
export class PagesModule {
}
