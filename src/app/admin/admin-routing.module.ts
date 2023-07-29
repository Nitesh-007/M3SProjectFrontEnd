import { Component, ComponentFactory, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenteeListComponent } from '../mentor/mentee-list/mentee-list.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MenteesListComponent } from './mentees-list/mentees-list.component';
import { MentorListComponent } from './mentor-list/mentor-list.component';

import { TaskComponent } from './task/task.component';



const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'menteelist',
      component: MenteesListComponent
    },
    {
      path: 'mentorlist',
      component: MentorListComponent
    },
    
    {
      path: 'Task',
      component: TaskComponent
    },
    
    
]; 


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 
  
}
