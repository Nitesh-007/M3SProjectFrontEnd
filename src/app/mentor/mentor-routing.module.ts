import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenteeModule } from '../mentee/mentee.module';
import { TaskResolveComponent } from '../mentee/task-resolve/task-resolve.component';
import { TaskViewComponent } from '../mentee/task-view/task-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenteeListComponent } from './mentee-list/mentee-list.component';
import { TaskFeedbackComponent } from './task-feedback/task-feedback.component';
import { TaskReviewComponent } from './task-review/task-review.component';
import { TraineePerformanceComponent } from './trainee-performance/trainee-performance.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'menteelist',
      component:MenteeListComponent
    },
    {
      path: 'taskfeedback',
      component:TaskFeedbackComponent
    },
    {
      path: 'taskreview',
      component:TaskReviewComponent
    },
    {
      path: 'traineeperformance',
      component:TraineePerformanceComponent
    },
    
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorRoutingModule { }
