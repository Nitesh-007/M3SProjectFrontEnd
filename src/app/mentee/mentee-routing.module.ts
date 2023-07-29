import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskResolveComponent } from './task-resolve/task-resolve.component';
import { TaskViewComponent } from './task-view/task-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'taskresolve',
      component:TaskResolveComponent
    },
    {
      path: 'taskview',
      component:TaskViewComponent
    }
    
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenteeRoutingModule { }
