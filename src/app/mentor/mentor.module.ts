import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentorRoutingModule } from './mentor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenteeListComponent } from './mentee-list/mentee-list.component';
import { TaskReviewComponent } from './task-review/task-review.component';
import { TaskFeedbackComponent } from './task-feedback/task-feedback.component';
import { TraineePerformanceComponent } from './trainee-performance/trainee-performance.component';
import { LayoutModule } from '../layout/layout.module';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenteeModule } from '../mentee/mentee.module';
import { TaskModule } from '../task/task.module';



@NgModule({
  declarations: [
    DashboardComponent,
    MenteeListComponent,
    TaskReviewComponent,
    TaskFeedbackComponent,
    TraineePerformanceComponent,

  ],
  imports: [
    CommonModule,
    MentorRoutingModule,
    MenteeModule,
    TaskModule,
    LayoutModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    HighchartsChartModule,
    MatButtonModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    MatFormFieldModule
  ],
  exports: [DashboardComponent,
    MenteeListComponent,
    TaskReviewComponent,
    TaskFeedbackComponent,
    TraineePerformanceComponent,
  ]
})
export class MentorModule { }
