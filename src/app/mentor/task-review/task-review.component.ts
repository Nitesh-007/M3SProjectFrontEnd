import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MenteeServiceService } from '../../services/mentee-service.service';
import { style } from '@angular/animations';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditTaskComponent } from 'src/app/task/create-edit-task/create-edit-task.component';
import { DeleteTaskComponent } from 'src/app/task/delete-task/delete-task.component';
import { MatTabChangeEvent } from '@angular/material/tabs';


@Component({
  selector: 'app-task-review',
  templateUrl: './task-review.component.html',
  styleUrls: ['./task-review.component.css']
})


export class TaskReviewComponent implements OnInit {
  selectedTask1: any;

  utype: any;

  dropMentee: any = [];

  projectsCode: any = [];

  dropPriority: any = [];



  displayedColumns: string[] = ['select', 'taskID', 'taskTopic', 'projectCode', 'startDate/endDate', 'completedOn', 'assignee', 'status', 'star'];
  dataSource = new MatTableDataSource<any>([]);
  dataSource1 = new MatTableDataSource<any>([]);
  dataSource2 = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  selection1 = new SelectionModel<any>(true, []);
  selection2 = new SelectionModel<any>(true, []);

  modal: any;
  searchText: any;
  data: any;
  taskMenteeData: any;
  taskMenteeDataPending: any;
  taskMenteeDataComplete: any;
  i!: number;
  task!: string;
  event: any;
  status: any;
  taskId!: number;
  taskCondition: any;
  selectedTaskView: any;
  selectedTaskEditId: any;
  selectedTab: number = 0;


  constructor(private menteeData: MenteeServiceService, private _snackBar: MatSnackBar, private dialog: MatDialog) {

    this.menteeData.listen().subscribe((res: any) => {
      this.taskListData()
    })

  }

  ngOnInit(): void {
    this.taskListData();
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTab = tabChangeEvent.index;
  }

  onClose(sideNav: any) {
    sideNav.toggle()
    this.taskListData();
    this.selectedTaskView = null;
    this.selectedTaskEditId = null;
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateEditTaskComponent, {
      width: "50%",

    });
    dialogRef.afterClosed().subscribe(() => this.taskListData());
  }

  taskListData() {
    var emp_type = JSON.parse(localStorage.getItem("currentUser") || '{}');
    const utype = emp_type.email;
    this.menteeData.listTaskData(utype).subscribe((data: any) => {
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




  DeleteData() {
    let test = null;
    if (this.selectedTab == 0 && this.selection.selected.length) {
      test = this.selection.selected.map(s => s.taskId);
    } else if (this.selectedTab == 1 && this.selection1.selected.length) {
      test = this.selection1.selected.map(s => s.taskId);

    } else if (this.selectedTab == 2 && this.selection2.selected.length) {
      test = this.selection2.selected.map(s => s.taskId);
    }
    if (test) {
      const dialogRef = this.dialog.open(DeleteTaskComponent, {
        width: "30%",
        data: { taskId: test, action: "multiple" }
      });

      dialogRef.afterClosed().subscribe(() => this.taskListData());

    } else {
      this._snackBar.open('Select any task', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',

        panelClass: ['black-snackbar']
      });

    }
  }

  deleteTask(taskIdsingle: number) {
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      width: "30%",
      data: { taskId: taskIdsingle, action: "single" }
    });

    dialogRef.afterClosed().subscribe(() => this.taskListData());
  }

  openDialogView(data: any) {
    this.selectedTaskEditId = null;
    this.selectedTaskView = data.taskId
    const dialogRef = this.dialog.open(CreateEditTaskComponent, {
      width: "50%",
      data: { id: this.selectedTaskView, action: 'VIEW' },
    });

    // dialogRef.afterClosed().subscribe(() => this.taskListData());

  }

  onEditTask(data: any) {
    this.selectedTaskView = null;
    this.selectedTaskEditId = data.taskId
    const dialogRef = this.dialog.open(CreateEditTaskComponent, {
      width: "50%",
      data: { id: this.selectedTaskEditId, action: 'EDIT' },
    });

    dialogRef.afterClosed().subscribe(() => this.taskListData());
  }

}
