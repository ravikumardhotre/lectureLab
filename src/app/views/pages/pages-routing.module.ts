import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogOutComponent } from './log-out/log-out.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AllInstructorsComponent } from './all-instructors/all-instructors.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { AssignBatchedToCourseComponent } from './assign-batched-to-course/assign-batched-to-course.component';
import { AllAssignedBatchesComponent } from './all-assigned-batches/all-assigned-batches.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'logout',
    component: LogOutComponent,
    data: {
      title: 'Logout Page'
    }
  },
  {
    path: 'update-password',
    component: UpdatePasswordComponent,
    data: {
      title: 'Update Password'
    }
  },
 
  {
    path: 'all-instructor',
    component: AllInstructorsComponent,
  },
  
  {
    path: 'register-instructor',
    component: CreateUsersComponent,
  },
  {
    path: 'assigned-batches',
    component: AllAssignedBatchesComponent,
  },
  {
    path:'add-course',
    component:AddCoursesComponent
  },

 

  {
    path:'assign-batch',
    component:AssignBatchedToCourseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
