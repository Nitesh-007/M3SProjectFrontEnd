import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent} from './layout/layout.component'
import { Role } from '../helpers/constants';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AuthGardGuard } from '../Auth/auth-gard.guard';
// import { UserProfileComponent } from './user-profile/user-profile.component';
const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    // { path: '', redirectTo: 'admin', pathMatch: 'full' },
    {
      path: 'admin',
      loadChildren: () => import('./../admin/admin.module').then(m => m.AdminModule), 
      data: {role : [Role.ADMIN]},
     canActivate: [AuthGardGuard],

    },
    {
      path: 'mentor',
      loadChildren: () => import('./../mentor/mentor.module').then(m => m.MentorModule),
      data: {role : [Role.MENTOR]},
     canActivate: [AuthGardGuard],


    },
    {
      path: 'mentee',
      loadChildren: () => import('./../mentee/mentee.module').then(m=>m.MenteeModule),
      data: {role : [Role.MENTEE]},
     canActivate: [AuthGardGuard],


    },

    {
      path: 'task',
      loadChildren: () => import('./../task/task.module').then(m=>m.TaskModule)
    },
    {
      path: 'profile',
      component: UserProfileComponent
  },

    {
        path: 'profile',
        component: UserProfileComponent
    },





    
  ],

 
  // canActivate: [AuthGuard]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
