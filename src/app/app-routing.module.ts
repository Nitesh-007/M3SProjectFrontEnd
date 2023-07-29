import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGardGuard } from './Auth/auth-gard.guard';
import { Role } from './helpers/constants';

const routes: Routes = [
  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {
    path: 'mmms',
     loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule), 
     canActivate: [AuthGardGuard],
     data: {roles: [Role.ADMIN, Role.MENTEE, Role.MENTOR]}
     
  },
  

  
  // { path: 'mentee', loadChildren: () => import('./mentee/mentee.module').then(m => m.MenteeModule) },

  // { path: 'mentor', loadChildren: () => import('./mentor/mentor.module').then(m => m.MentorModule) },

  // { path: 'task', loadChildren: () => import('./task/task.module').then(m => m.TaskModule) },

  {path: '**', redirectTo: ''},
  

  ];
    


 
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
