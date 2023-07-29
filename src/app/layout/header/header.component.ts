import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/Auth/auth-service.service';
import { DataService } from 'src/service/data.service';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit,OnDestroy {
  utype: any;
  uimg!:any;
   e_Name!:any

  message!:string;
  subscription!: Subscription;
  userdetail = 
    {
      
      img: "assets/sid.jpeg",
      
    }

    logout() {
      this.auth.logout();
      this.router.navigate(['/login']);
  }

 

  
  ngOnInit(): void {

    localStorage.setItem("userdetail", JSON.stringify(this.userdetail));
    var user_img=JSON.parse(localStorage.getItem("userdetail")||'{}');
    this.uimg=user_img.img;
    // console.log(this.uimg);


    
    var Employee_data=JSON.parse(localStorage.getItem("currentUser")||'{}');
    this.e_Name=Employee_data.employeeName;
    // console.log(this.e_Name);  

  }

  constructor(private dialog: MatDialog , private data:DataService,private router:Router,private auth:AuthServiceService) {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message);


    var emp_type=JSON.parse(localStorage.getItem("currentUser")||'{}');
    this.utype=emp_type.employeeType;
    // console.log(this.utype)
  }

  openDialog() {
    this.dialog.open(FormDialogComponent, {
      width: "80%",
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



  public onClickSideNav(value:any) {
    this.data.changeMessage(value)
}

  


  


  
}
