
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/service/api-service.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  


  getErrorMessage() { 
    if (this.otpForm.controls.field1.hasError('required')) {
      return 'You must enter a value';
    }

    return this.otpForm.controls.field1.hasError('email') ? 'Not a valid email' : '';
   
  }
  errorMessage: string="";
  email : any;
  otpForm : FormGroup=new FormGroup({
    field1:new FormControl('', [Validators.required,Validators.pattern('[0-9]')]),
    field2:new FormControl('',[Validators.required,Validators.pattern('[0-9]')]),
    field3:new FormControl('',[Validators.required,Validators.pattern('[0-9]')]),
    field4:new FormControl('',[Validators.required,Validators.pattern('[0-9]')])
  });


  constructor(private apiservice: ApiServiceService, private router: Router , private route: ActivatedRoute,  private snackBar: MatSnackBar) { 
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      
    });
  }

  onMouseEnter(hoverName: HTMLElement) {
    hoverName.style.color = "blue";
  }
  onMouseOut(hoverName: HTMLElement) {
    hoverName.style.color = "black";
  }
  ngOnInit(): void {
  }
  move(e: any, p: any, c: any, n: any) {
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if (length == maxlength) {
      if (n != "") {
        n.focus();
      }
    }
    if (e.key === "Backspace") {
      if (p != "") {
        p.focus();
      }
    }
    // console.log(e)
  }



  userotp(){ 
    let payload={ 
      email:this.email,
      otp: this.otpForm.get("field1")?.value+
    this.otpForm.get("field2")?.value+
    this.otpForm.get("field3")?.value+
    this.otpForm.get("field4")?.value
      
     
    };
    console.log("Working  reset  User")
    this.apiservice.otp('user/validateOtp',payload)
    .subscribe((result: any)=>
    {

      this.errorMessage="";
      if(result.code==-1){
        this.snackBar.open(result.message,'',{
          duration:3000,
          verticalPosition:'top',
          horizontalPosition:'end',
          panelClass: ['red-snackbar']
        }
        );
      }else{if(result.code==0){
        this.snackBar.open(result.message,'',{
          duration:1000,
          verticalPosition:'top',
          horizontalPosition:'end',
          panelClass: ['green-snackbar']
        }
        );
        
      }
      {
        this.router.navigate(['/reset'] ,
        { queryParams: { email: this.email } }
        );
      }
    }    
  });
   (_error:any) => {                            
     console.error('Request failed with error')
     
    };
 } 


get formControl(){
  return this.otpForm.controls;
};
  

resendOtp() {
  let payload = {


    email: this.email

  };
  this.apiservice.otp('user/sendEmail', payload)
    .subscribe((result: any) => {

      if (result.code == -1) {
        this.snackBar.open(result.message, '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
         
        });
      } 
    });
  (_error: any) => {
    console.error('Request failed with error')

  };
}
}



