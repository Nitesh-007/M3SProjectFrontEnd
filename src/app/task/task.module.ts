import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { CreateEditTaskComponent } from './create-edit-task/create-edit-task.component';
import { LayoutModule } from '../layout/layout.module';
import { MenteeModule } from '../mentee/mentee.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
// import { MultiSelectDropdownComponent } from './multi-select-dropdown/multi-select-dropdown.component';

// import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
// import {FormsModule,ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    TaskListComponent,
    CreateEditTaskComponent,
    DeleteTaskComponent,

  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    LayoutModule,
    MatGridListModule,
    AngularMultiSelectModule,
    MatDialogModule,
    // FormDialogComponent,
    // MenteeModule,
    // MultiSelectDropdownComponent,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule.forRoot()
  ],

  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  
  exports: [TaskListComponent,
    CreateEditTaskComponent]
})
export class TaskModule { }
