import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiServiceService } from "src/service/api-service.service";
import { FormDialogComponent } from "../form-dialog/form-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-delete-form",
  templateUrl: "./delete-form.component.html",
  styleUrls: ["./delete-form.component.css"],
})
export class DeleteFormComponent implements OnInit {
  constructor(
    private api: ApiServiceService,
    private _snackBar: MatSnackBar,
    private DilogRef: MatDialogRef<DeleteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public menteeData: any
  ) {}

  ngOnInit(): void {
    // this.deleteuser();
  }

  deleteuser() {
    console.log(this.menteeData);

    if (this.menteeData) {
      let api: any = null;
      if (this.menteeData.employeeType == "MENTOR") {
        api = this.api.deletementor(this.menteeData.email);
      } else if (this.menteeData.employeeType == "MENTEE") {
        api = this.api.deletementee(this.menteeData.email);
      }
      api.subscribe((response: any) => {
        console.log(response);
      });
      this._snackBar.open("User Delete Successfully", "", {
        duration: 4000,
        verticalPosition: "top",
        horizontalPosition: "center",

        panelClass: ["green-snackbar"],
      });
    }
  }
}
