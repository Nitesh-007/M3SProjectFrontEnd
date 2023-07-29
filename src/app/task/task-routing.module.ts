import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditTaskComponent } from './create-edit-task/create-edit-task.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'tasklist', pathMatch: 'full' },
    {
      path: 'tasklist',
      component: TaskListComponent
    },
    {
      path: 'create-edit',
      component:CreateEditTaskComponent
    },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
