import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenteeRoutingModule } from './mentee-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { TaskResolveComponent } from './task-resolve/task-resolve.component';
import { LayoutModule } from '../layout/layout.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskModule } from '../task/task.module';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    DashboardComponent,
    TaskViewComponent,
    TaskResolveComponent
  ],
  imports: [
    CommonModule,
    MenteeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
    MatInputModule,
    HighchartsChartModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    TaskModule,
    MatGridListModule
  ],
  exports:[DashboardComponent,
    TaskViewComponent,
    TaskResolveComponent]
})
export class MenteeModule { }
