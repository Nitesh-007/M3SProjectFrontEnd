import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/service/api-service.service';


import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {

  hide = true;
  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9.]{2,}@[a-zA-Z]{3,}[.]{1}[a-zA_Z]{2,6}$')])
  });
  users: any;
  http: any;
  email: any;
  errorMessage: string = "";
  ForgotForm: any;
  submitted=false

  constructor(private apiservice: ApiServiceService, private router: Router, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
  }


  getErrorMessage() {
    if (this.forgotForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.forgotForm.controls.email.hasError('email') ? 'Not a valid email' : '';

  }

  forgotUser() {
    
    
    if(this.forgotForm.valid){
      this.submitted = true
      let payload = {


        email: this.forgotForm.get("email")?.value
  
      };
      console.log("Working  Login User")
      this.apiservice.forgot('user/sendEmail', payload)
        .subscribe((result: any) => {
  
          this.errorMessage = "";
          if (result.code == -1) {
            this.snackBar.open(result.message, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
              panelClass: ['red-snackbar']
  
            });
  
          }else if (result.code == 0) {
            this.router.navigate(
              ['/otp'],
              { queryParams: { email: result.email } }
            );
          }
        });
      (_error: any) => {
        console.error('Request failed with error')
  
      };
    }else{

      let key=Object.keys(this.forgotForm.controls);
        // console.log(key)
        key.filter(data=>{
          // console.log(data)
          let control=this.forgotForm.controls[data];
          if(control.errors!=null){
            control.markAsTouched()
            this.snackBar.open('Required Field must be  field','', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end',

              panelClass: ['red-snackbar']
            });
          }
        })

      
      
    }
    
  }


  get formControl() {
    return this.forgotForm.controls;
  }
}




