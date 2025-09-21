import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiServiceService } from 'src/service/api-service.service';
import { __String } from 'typescript';
import { AuthServiceService } from 'src/app/Auth/auth-service.service';
import { first } from 'rxjs/operators';
import { tokenName } from '@angular/compiler';
import { toBase64String } from '@angular/compiler/src/output/source_map';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  showSpinner = false;
  buttonDisabled: boolean = false;
  submitted = false;
  hide = true;
  data: any;
  userDetails: any;
  Httpclient: any;
  usertype: any;
  errorMessage: string = "";
  email: string = "";
  password:string=""

  constructor(private apiservice: ApiServiceService, private router: Router, private _snackBar: MatSnackBar, private CookieService: CookieService, private AuthServiceService: AuthServiceService) {}
   
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9.]{2,}@[a-zA-Z]{3,}[.]{1}[com, in, org]{2,3}$')]),
    
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$')])
  });

  ngOnInit(): void {
    this.autoLogin()
    console.log(this.loginForm)

  }

  autoLogin() {

    this.loginForm.controls['email'].setValue(this.CookieService.get('email'))
    this.loginForm.controls['password'].setValue(this.CookieService.get('password'))

  }

  getErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';

  }

  getErroessagePassword() {
    if (this.loginForm.controls.password.hasError('required')) {
      return 'You must enter the password';
    }
    return this.loginForm.controls.password.hasError('password') ? 'Not a valid password' : '';
  }

  loginUser() {

    if (this.loginForm.valid) {
      this.submitted = true
      this.showSpinner = true;
      // this.showSpinner = false;

      this.AuthServiceService.login(this.loginForm.get("email")?.value, this.loginForm.get("password")?.value)
        .pipe(first())
        .subscribe(
          data => {

            if (data.code == -1) {
              this._snackBar.open(data.message, '', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'end',

                panelClass: ['red-snackbar']
              });
            }



            else {
              
              if (data && data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(data));

                this.redirect(data)


              }
            }



          },
          error => {
            this.errorMessage = error;
            this.showSpinner = false;

          }
        );
    }
    else{

      let key=Object.keys(this.loginForm.controls);
        // console.log(key)
        key.filter(data=>{
          // console.log(data)
          let control=this.loginForm.controls[data];
          if(control.errors!=null){
            control.markAsTouched()
            this._snackBar.open('Required Field ','', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end',

              panelClass: ['red-snackbar']
            });
          }
        })

      
      
    }

  }


  checkCheckBoxvalue(e: any) {
    if (e.checked) {
      this.CookieService.set('email', this.loginForm.get("email")?.value);
      this.CookieService.set('password', this.loginForm.get("password")?.value);

    }



  }

  get formControl() {
    return this.loginForm.controls;
  }
  


  redirect(response: any) {
    if (response.employeeType =="ADMIN") {
      this.router.navigate(['/admin']);
    } else if (response.employeeType == "MENTOR") {
      this.router.navigate(['/mentor']);
    }
    else if (response.employeeType == "MENTEE") {
      this.router.navigate(['/mentee']);
    }
  }


}



