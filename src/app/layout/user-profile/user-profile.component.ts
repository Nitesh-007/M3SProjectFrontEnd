import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/models/userRole.model";
import { ApiServiceService } from "src/service/api-service.service";
import {
  FormArray,
  FormGroup,
  FormBuilder,
  FormControl,
  Validator,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  email: string = "";
  userType: string = "";
  userData: any = null;
  assignedMentees: any[] = [];
  MenteeToAssignList: any[] = [];
  assignmentee: any[] = [];
  Assignementee: string[] = [];
  someDateVar: any = [];

  form!: FormGroup;
  currentUser : any =null;



  constructor(
    private route: ActivatedRoute,
    private api: ApiServiceService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      Assignementee: this.fb.array([]),
    });
    console.log(this.Assignementee);
  }

  ngOnInit(): void {
    const userJson = localStorage.getItem("currentUser");
       this.currentUser = userJson !== null ? JSON.parse(userJson) : null;
    this.route.params.subscribe((params) => {
      if (params && params.userType && params.email) {
        this.userType = params["userType"];
        this.email = params["email"];

        this.userProfile();
      } else {
        this.userType = this.currentUser.employeeType;
        this.email = this.currentUser.email;
        this.userProfile();
      }
    });

    this.api.refreshneeded.subscribe(() => {
      this.userProfile();
    });

    this.userProfile();
  }

  userProfile() {
    let apiUrl: any;

    if (this.userType === "ADMIN") {
      apiUrl = this.api.AdminProfile(this.email);
      console.log(apiUrl);
    } else if (this.userType === "MENTOR") {
      apiUrl = this.api.mentorProfile(this.email);
      console.log(apiUrl);
    } else if (this.userType === "MENTEE") {
      apiUrl = this.api.mentorProfile(this.email);
      console.log(apiUrl);
    }
    apiUrl.subscribe((data: any) => {
      this.userData = data.data;
      this.assignedMentees = data.data.assignedMentees;
      console.log(this.assignedMentees)

      if (this.userType === "MENTOR" && this.currentUser.employeeType === "ADMIN") {
        console.log(this.userData);
        this.getMenteeListToAssign();
      }
    });
  }

  getMenteeListToAssign() {
    this.api.assignmenteeList(this.email).subscribe((data: any) => {
      if (!data.data) {
        this.MenteeToAssignList = [];
      } else {
        this.MenteeToAssignList = data.data;
      }
    });
  }

  submitForm() {
    console.log(this.fb);

    var payload = {
      mentorEmail: this.email,
      assignedMenteeEmail: this.Assignementee,
    };

    if (this.Assignementee.length == 0) {
      this._snackBar.open("please select mentees", "", {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "center",

        panelClass: ["red-snackbar"],
      });
    } else {
      this.api.AssigneMentee(payload).subscribe((res: any) => {
        this._snackBar.open("Mentee Assigne Sucessfully", "", {
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "center",

          panelClass: ["green-snackbar"],
        });
        this.Assignementee = [];
      });
    }
  }

  checkCheckBoxvalue(e: any) {
    if (e.checked) {
      this.Assignementee.push(e.source.value);
    } else {
      var i = 0;
      this.Assignementee.forEach((item: any) => {
        if (item == e.source.value) {
          this.Assignementee.splice(i, 1);
          return;
        }
        i++;
      });
    }
    console.log(this.Assignementee);
  }

  unassigne(email : string){
    
    var payload={

      mentorEmail: this.email,
      assignedMenteeEmail: [email]

    }
    this.api.unAssignementee(payload).subscribe((res: any) => {
      this._snackBar.open("Mentee Delete Sucessfully", "", {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "center",

        panelClass: ["green-snackbar"],
      });
      
    });


  }





}
