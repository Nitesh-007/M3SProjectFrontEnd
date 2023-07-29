import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MenteeServiceService } from 'src/app/services/mentee-service.service';
// import {TaskReviewComponent} from "../../mentor/task-review"

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {

  multiDelete: any;
  singleDelete: any;

  constructor(
    private menteeData: MenteeServiceService,
    private _snackBar: MatSnackBar,
    private dilogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (this.data.action === "multiple") {
      this.multiDelete = this.data.action;
    }
    else {
      this.singleDelete = this.data.action;
    }

  }





  ngOnInit(): void {
  }

  deleteTask() {
    this.menteeData.deleteTask(this.data.taskId).subscribe((res: any) => {
      this.dilogRef.close("Yes");
      this.menteeData.filter("Yes");
      this._snackBar.open('Deleted successfully', '', {
        duration: 4000,
        verticalPosition: 'top',
        horizontalPosition: 'center',

        panelClass: ['green-snackbar']
      });
    })
  }

  multiDeleteTask() {
    this.menteeData.deleteAllTask(this.data.taskId).subscribe(result => {
      this.dilogRef.close("Yes");
      this.menteeData.filter("Yes");
      this._snackBar.open('Deleted successfully', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',

        panelClass: ['green-snackbar']
      });
    });


  }

}
