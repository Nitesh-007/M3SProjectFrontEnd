import { Component, OnInit, ViewChild } from "@angular/core";
import { FormDialogComponent } from "src/app/layout/form-dialog/form-dialog.component";
import { ApiServiceService } from "src/service/api-service.service";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DeleteFormComponent } from "src/app/layout/delete-form/delete-form.component";

@Component({
  selector: "app-mentor-list",
  templateUrl: "./mentor-list.component.html",
  styleUrls: ["./mentor-list.component.css"],
})
export class MentorListComponent implements OnInit {
  searchText!: any;
  mentorData!: any;
  editMentor!: any;
  delete!: any;

  onMouseEnter(hoverName: HTMLElement) {
    hoverName.style.color = "blue";
  }
  onMouseOut(hoverName: HTMLElement) {
    hoverName.style.color = "black";
  }

  constructor(
    private api: ApiServiceService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.api.refreshneeded.subscribe(() => {
      this.getMentorList();
    });

    this.getMentorList();
  }

  getMentorList() {
    this.api.mentor().subscribe((data: any) => {
      this.mentorData = data;
    });
  }

  deleteEmployeeDetails(email: string) {
    this.dialogBox(email);
  }

  viewProfile(data: any) {
    this.router.navigate([
      "/profile",
      { email: data.email, userType: "MENTOR" },
    ]);
  }

  openDialog(data: any) {
    data.employeeType = "MENTOR";
    this.dialog
      .open(FormDialogComponent, {
        width: "80%",
        data: data,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === "Add") {
          this.getMentorList();
        }
      });
  }

  dialogBox(data: any) {
    data.employeeType = "MENTOR";
    this.dialog.open(DeleteFormComponent, {
      width: "30%",
      data: data,
    });
  }
}
