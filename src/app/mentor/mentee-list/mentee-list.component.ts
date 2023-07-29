import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { ActivatedRoute, Data, Router } from "@angular/router";
import { FormDialogComponent } from "src/app/layout/form-dialog/form-dialog.component";
import { MatDialog } from "@angular/material/dialog";


@Component({
  selector: 'app-mentee-list',
  templateUrl: './mentee-list.component.html',
  styleUrls: ['./mentee-list.component.css']
})
export class MenteeListComponent implements OnInit {

  searchText: any;

  menteesData: any;

  constructor(private menteeData: ServiceService, private router: Router) {

    var emp_type = JSON.parse(localStorage.getItem("currentUser") || '{}');
    const utype = emp_type.email;
    this.menteeData.menteesList(utype).subscribe((data: any) => {
      this.menteesData = data.data.assigneeList;
    })
  }

  onMouseEnter(hoverName: HTMLElement) {
    hoverName.style.color = "blue";
  }
  onMouseOut(hoverName: HTMLElement) {
    hoverName.style.color = "black";
  }

  viewProfile(data: any) {
    console.log(data);

    this.router.navigate([
      "/profile",
      { email: data, userType: "MENTEE" },
    ]);
  }


  ngOnInit(): void {
  }

}
