import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MenteeServiceService } from '../../services/mentee-service.service';
import { style } from '@angular/animations';
import { MatDrawer } from '@angular/material/sidenav/drawer';
import { TaskResolveComponent } from '../task-resolve/task-resolve.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {
  displayedColumns: string[] = ['taskID', 'taskTopic', 'projectCode', 'startDate/endDate', 'completedOn', 'reporter', 'status', 'star'];
  dataSource = new MatTableDataSource<any>([]);
  dataSource1 = new MatTableDataSource<any>([]);
  dataSource2 = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  selection1 = new SelectionModel<any>(true, []);
  selection2 = new SelectionModel<any>(true, []);

  modal: any;
  searchText: any;
  element: any;
  data: any;
  taskMenteeData: any;
  taskMenteeDataPending: any;
  taskMenteeDataComplete: any;

  taskId: any;
  selectedTaskView: any;

  onClose(sideNav: any) {
    sideNav.toggle()
    this.taskListData();
  }

  constructor(private menteeData: MenteeServiceService, private dialog: MatDialog) {
    this.menteeData.listen().subscribe((res:any)=>{
      console.log(res);
      this.taskListData()   
    })
  }


  taskListData() {
    var emp_type = JSON.parse(localStorage.getItem("currentUser") || '{}');
    const utype = emp_type.email;
    this.menteeData.menteeTaskList(utype).subscribe((data: any) => {
      this.taskMenteeData = data.data;
      this.dataSource = new MatTableDataSource<any>(this.taskMenteeData.allTaskList);
      this.taskMenteeDataComplete = data.data;
      this.dataSource1 = new MatTableDataSource<any>(this.taskMenteeDataComplete.completedTaskList);
      this.taskMenteeDataPending = data.data;
      this.dataSource2 = new MatTableDataSource<any>(this.taskMenteeDataPending.incompletedTaskList);

    });
  
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAllSelect() {
    const numSelected1 = this.selection1.selected.length;
    const numRows = this.dataSource1.data.length;
    return numSelected1 === numRows;
  }

  isAllSelect1() {
    const numSelected2 = this.selection2.selected.length;
    const numRows = this.dataSource2.data.length;
    return numSelected2 === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  toggleAllRows1() {
    if (this.isAllSelect()) {
      this.selection1.clear();
      return;
    }
    this.selection1.select(...this.dataSource1.data);
  }

  toggleAllRows2() {
    if (this.isAllSelect1()) {
      this.selection2.clear();
      return;
    }
    this.selection2.select(...this.dataSource2.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: []): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row[this.taskId]}`;
  }

  checkboxLabel1(row?: []): string {
    if (!row) {
      return `${this.isAllSelect() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection1.isSelected(row) ? 'deselect' : 'select'} row ${row[this.taskId]}`;
  }

  checkboxLabel2(row?: []): string {
    if (!row) {
      return `${this.isAllSelect1() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection2.isSelected(row) ? 'deselect' : 'select'} row ${row[this.taskId]}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();

  }

  onViewTask(data: any) {
    this.selectedTaskView = data.taskId
    const taskId = this.selectedTaskView
    const dialogRef = this.dialog.open(TaskResolveComponent, {
      width: "50%",
      data: taskId,
    });

    dialogRef.afterClosed().subscribe(() => this.taskListData());
  }


  ngOnInit(): void {

    this.taskListData();

  }

}



