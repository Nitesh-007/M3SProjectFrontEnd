import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { AdminRoutingModule } from "./admin-routing.module";
import { MentorListComponent } from "./mentor-list/mentor-list.component";
import { MenteesListComponent } from "./mentees-list/mentees-list.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LayoutModule } from "../layout/layout.module";
import { MatSidenavModule } from "@angular/material/sidenav";
import { TaskComponent } from "./task/task.component";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDividerModule } from "@angular/material/divider";
import { HighchartsChartModule } from "highcharts-angular";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { FormsModule } from "@angular/forms";
import highcharts3D from 'highcharts/highcharts-3d.src';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from "@angular/material/input";
import {MatSortModule} from '@angular/material/sort'






@NgModule({
  declarations: [
    MentorListComponent,
    MenteesListComponent,
    DashboardComponent,
    TaskComponent,
    DashboardComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    MatSidenavModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    MatDividerModule,
    HighchartsChartModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatSortModule
    
  ],
  exports: [
    MentorListComponent,
    MenteesListComponent,
    TaskComponent,
    DashboardComponent,
  ],
    
    
})
export class AdminModule {}
