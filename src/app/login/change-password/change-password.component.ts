import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/service/api-service.service";
import { AuthServiceService } from "src/app/Auth/auth-service.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class changePasswordComponent implements OnInit {
  change = new FormGroup({
    oldPassword: new FormControl("", [
      Validators.required,
      Validators.pattern(
        "(?!.*)(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$"
      ),
    ]),
    newPassword: new FormControl("", [
      Validators.required,
      Validators.pattern(
        "(?!.*)(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$"
      ),
    ]),
    confirmPassword: new FormControl("", [Validators.required]),
  });

  oldPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);

  newPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);

  confirmPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);

  changePasswordForm = this.formBuilder.group(
    {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    },
    {
      validator: this.ConfirmedValidator("newPassword", "confirmPassword"),
    }
  );
  email: any;
  showMsg: boolean = false;
  errorMessage: string = "";

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  hide = true;
  hideconfirmPassword = true;
  hidenewPassword = true;
  display = false;

  users: any;
  // resetPasswordForm: any;
  constructor(
    private apiservice: ApiServiceService,
    private formBuilder: FormBuilder,
    private AuthServiceService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.route.queryParams.subscribe((params) => {
      this.email = params["email"];
    });
  }

  ngOnInit(): void {}

  getErroessagePassword() {
    if (this.changePasswordForm.controls.newPassword.hasError("required")) {
      return "You must enter the password";
    }
    return this.changePasswordForm.controls.newPassword.hasError("password")
      ? "Not a valid password"
      : "";
  }

  onSubmit() {
    
    const userJson = localStorage.getItem("currentUser");
    let data = userJson !== null ? JSON.parse(userJson) : null;
    let payload = {
      email: data?.email,
      oldPassword: btoa(this.changePasswordForm.get("oldPassword")?.value),
      newPassword: btoa(this.changePasswordForm.get("newPassword")?.value),
      confirmPassword: btoa(
        this.changePasswordForm.get("confirmPassword")?.value
      ),
    };
    console.log("Working  reset  User");
    this.apiservice
      .change("user/changePassword", payload)
      .subscribe((result: any) => {
        this.errorMessage = "";
        if (result.code == 0) {
          this.snackBar.open(result.message, "", {
            duration: 1000,
            verticalPosition: "top",
            horizontalPosition: "end",
            panelClass: ["green-snackbar"],
          });

          this.AuthServiceService.logout();
        }
      });
    (_error: any) => {
      console.error("Request failed with error");
    };

    console.log(this.changePasswordForm);
    if (!this.changePasswordForm?.valid) {
      return;
    }
  }

  get formControl() {
    return this.changePasswordForm.controls;
  }
}
