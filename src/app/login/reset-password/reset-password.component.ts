import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { btoa } from 'js-base64';
import { ApiServiceService } from 'src/service/api-service.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {



  Reset = new FormGroup({

    newPassword: new FormControl('', [Validators.required, Validators.pattern('(?!.*[\s])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$')]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern('(?!.*[\s])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$')])

  })


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

  resetPasswordForm = this.formBuilder.group(
    {
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    },
    {
      validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
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



  hidenewPassword = true
  hideConfirmPassword = true
  display = false
  
  users: any;
  // resetPasswordForm: any;
  constructor(private apiservice: ApiServiceService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    })
  };

  ngOnInit(): void {
  }

  getErroessagePassword() {
    if (this.resetPasswordForm.controls.newPassword.hasError('required')) {
      return 'You must enter the password';

    }
    return this.resetPasswordForm.controls.newPassword.hasError('password') ? 'Not a valid password' : '';
  }

  onSubmit() {
    let payload = {

      email: this.email,
      newPassword: btoa(this.resetPasswordForm.get("newPassword")?.value),

      confirmPassword: btoa(this.resetPasswordForm.get("confirmPassword")?.value)


    };
    console.log("Working  reset  User")
    this.apiservice.reset('user/reset', payload)
      .subscribe((result: any) => {

        this.errorMessage = "";
        if (result.code == 0) {
          this.snackBar.open(result.message, '', {
            duration: 1000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: ['green-snackbar']
            

          });
          {
            setTimeout(()=>{this.router.navigate(['/login'],
            { queryParams: { email: result.email } });
          this.showMsg = true;},1000);
            
          }
        }
        

        // console.warn("result", result)

        // {
        //   this.router.navigate(['/login'],
        //     { queryParams: { email: result.email } });
        //   this.showMsg = true;
        // }
      });
    (_error: any) => {
      console.error('Request failed with error')

    };


    console.log(this.resetPasswordForm);
    if (!this.resetPasswordForm?.valid) {
      return;
    }
  }


  get formControl() {
    return this.resetPasswordForm.controls;
  }
}




