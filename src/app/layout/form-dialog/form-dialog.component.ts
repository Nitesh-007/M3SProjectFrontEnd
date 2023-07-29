import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ApiServiceService } from "src/service/api-service.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { toBase64String } from "@angular/compiler/src/output/source_map";
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.css"],
  providers: [DatePipe]
})
export class FormDialogComponent implements OnInit {
  addUserForm!: FormGroup;
  userData: any = {};
  location!: any;
  techGroup!: any;
  designation: any;
  budetails: any;
  mentees!: any;
  mentorData!: any
  joining!: any
  join!: any
  association!: any

  constructor(
    public datepipe: DatePipe,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private api: ApiServiceService,
    private DilogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      employeeType: ["", Validators.required],
      employeeName: ["", [Validators.required, Validators.maxLength(32)]],
      employeeId: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "[A-Za-z0-9.]{2,}@[a-zA-Z]{3,}[.]{1}[com, in, org]{2,3}$"
          ),
        ],
      ],
      mobileNo: [
        "",
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
      location: ["", Validators.required],
      bussinessUnit: ["", Validators.required],
      designation: ["", Validators.required],
      techGroup: ["", Validators.required],
      reportingManager: ["", Validators.required],
      locationBlock: ["", Validators.required],
      joiningDate: ["", Validators.required],
      associationDate: ["", Validators.required],
      noticePeriod: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      totalMonthExperience: ["", Validators.required],
      totalYearExperience: ["", Validators.required],

    });

    if (this.data) {
      let api: any = null;
      if (this.data.employeeType == "MENTOR") {
        api = this.api.editmentor(this.data.email);
      } else if (this.data.employeeType == "MENTEE") {
        api = this.api.editmentee(this.data.email);
      }
      api.subscribe((data: any) => {
        this.userData = data.data;
        this.joining = new Date(data.data.joiningDate)
        this.association = new Date(data.data.associationDate)

        console.log(this.joining)
        console.log(this.association)

        this.get_location();
        this.get_BuData();
        this.get_designationData();


        for (let item of Object.keys(this.userData)) {
          if (this.addUserForm.controls[item] && this.userData[item]) {
            this.addUserForm.controls[item].setValue(
              this.userData[item].toString()
            );

          }
        }
        this.addUserForm.controls['joiningDate'].setValue(this.joining)
        this.addUserForm.controls['associationDate'].setValue(this.association)
      });

      this.addUserForm.controls['email'].disable();

    }

    this.get_location();
    this.get_BuData();
    this.get_designationData();
  }

  userAdd() {
    this.addUserForm.controls['employeeName'].setValue(this.addUserForm.controls['employeeName'].value.trim()) 
    console.log(this.addUserForm);
    console.log(this.addUserForm.value);

    if (this.addUserForm.valid) {
      this.addUserForm.value.joiningDate.toString();
      this.addUserForm.value.associationDate.toString();
      let api: any;
      if (this.data && this.data.employeeType == "MENTOR") {
        api = this.api.updatementorData(
          this.addUserForm.getRawValue(),
          this.addUserForm.controls['email'].value
        );
        api.subscribe({
          next: (res: any) => {
            this._snackBar.open(" Detail Updated Successfully", "", {
              duration: 5000,
              verticalPosition: "top",
              horizontalPosition: "center",

              panelClass: ["green-snackbar"],
            });
            this.addUserForm.reset();
            console.log(res);
            this.DilogRef.close("Add");
          },
        });
      } else if (this.data && this.data.employeeType == "MENTEE") {
        api = this.api.updatementeeData(
          this.addUserForm.getRawValue(),
          this.addUserForm.controls['email'].value
        );
        api.subscribe({

          next: (res: any) => {
            this._snackBar.open("Detail Updated  Successfully", "", {
              duration: 5000,
              verticalPosition: "top",
              horizontalPosition: "center",

              panelClass: ["green-snackbar"],
            });
            this.addUserForm.reset();
            console.log(res);
            this.DilogRef.close("Add");

          },
        });
      } else {
        api = this.api.addUserData(this.addUserForm.value);

        api.subscribe({

          next: (res: any) => {
            this._snackBar.open("User ADD Successful", "", {
              duration: 5000,
              verticalPosition: "top",
              horizontalPosition: "center",

              panelClass: ["green-snackbar"],
            });
            this.addUserForm.reset();
            console.log(res);
            this.DilogRef.close("Add");


          },
        });
      }
    } else {
      let key = Object.keys(this.addUserForm.controls);
      // console.log(key)
      key.filter((data) => {
        // console.log(data)
        let control = this.addUserForm.controls[data];
        if (control.errors != null) {
          control.markAsTouched();
          console.log(control.errors);

          this._snackBar.open("Please fill required field", "", {
            duration: 5000,
            verticalPosition: "top",
            horizontalPosition: "center",

            panelClass: ["red-snackbar"],
          });
        }
      });
    }
  }

  get_location() {
    this.api.getlocation().subscribe((data: any) => {
      this.location = [];
      this.location = data;

      console.log(this.location);
    });
  }

  get_techGroup() {
    console.log(this.budetails);

    this.api
      .getTechGroup(this.addUserForm.controls["bussinessUnit"].value)
      .subscribe((data: any) => {
        this.techGroup = [];
        this.techGroup = data;
        console.log(this.techGroup);
      });
  }

  get_BuData() {
    this.api.getBuDetails().subscribe((data: any) => {
      this.budetails = [];
      this.budetails = data;
      if (this.data) {
        this.get_techGroup();
      }
      console.log(this.budetails);
    });
  }

  get_designationData() {
    this.api.getDesignation().subscribe((data: any) => {
      this.designation = [];
      this.designation = data;
      console.log(this.designation);
    });
  }

  menteesList() {
    this.api.mentee().subscribe((data: any) => {
      this.mentees = [];
      this.mentees = data;

      console.log(this.mentees);
    });
  }
  getMentorList() {
    this.api.mentor().subscribe((data: any) => {
      this.mentorData = [];
      this.mentorData = data;

    });
  }

  /**
   * allowAlphabetsAndSpaces
   */
  public allowAlphabetsAndSpaces(event : any) {
    let inputValue= event.keyCode;
    console.log(inputValue);
    
    if(!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0 )|| (inputValue >=91 && inputValue<=96)){ 
      event.preventDefault(); 
  }
  }

}
