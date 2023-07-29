import { Component, OnInit } from "@angular/core";
import { DataService } from "src/service/data.service";
import { ApiServiceService } from "src/service/api-service.service";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { FormDialogComponent } from "src/app/layout/form-dialog/form-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, Subscription, interval } from "rxjs";
import { DeleteFormComponent } from "src/app/layout/delete-form/delete-form.component";

@Component({
  selector: "app-mentees-list",
  templateUrl: "./mentees-list.component.html",
  styleUrls: ["./mentees-list.component.css"],
})
export class MenteesListComponent implements OnInit {
  message!: string;
  subscription!: any;
  mentees!: any;
  searchText!: any;
  value!: any;

  constructor(
    private _snackBar: MatSnackBar,
    private data: DataService,
    private api: ApiServiceService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  onMouseEnter(hoverName: HTMLElement) {
    hoverName.style.color = "blue";
  }
  onMouseOut(hoverName: HTMLElement) {
    hoverName.style.color = "black";
  }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(
      (message) => (this.message = message)
    );

    this.api.refreshneeded.subscribe(() => {
      this.menteesList();
    });

    this.menteesList();
  }

  menteesList() {
    this.api.mentee().subscribe((data: any) => {
      this.mentees = data;

      console.log(this.mentees);
    });
  }

  deleteEmployeeDetails(data: any) {
    this.dialogBox(data);

    // this.api.deletementee(email).subscribe((data: any) => {

    //   this.menteesList();
    // })

    // this._snackBar.open('User Delete Successfully','', {
    //   duration: 5000,
    //   verticalPosition: 'top',
    //   horizontalPosition: 'center',

    //   panelClass: ['green-snackbar']
    // });
  }

  openDialog(data: any) {
    data.employeeType = "MENTEE";
    this.dialog
      .open(FormDialogComponent, {
        width: "80%",
        data: data,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === "Add") {
          this.menteesList();
        }
      });
  }
  viewProfile(data: any) {
    this.router.navigate([
      "/profile",
      { email: data.email, userType: "MENTEE" },
    ]);
  }

  dialogBox(data: any) {
    data.employeeType = "MENTEE";
    this.dialog.open(DeleteFormComponent, {
      width: "30%",
      data: data,
    });
  }
}
