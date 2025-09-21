import { Component, OnInit, ViewChild } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { ApiServiceService } from "src/service/api-service.service";
import {MatSort} from '@angular/material/sort';
@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class TaskComponent implements OnInit {
  menteeData!: any;
  mentorData:any
  modal: any;
  searchText: any;
  element: any;
  data: any;
  forcheck!:any
  @ViewChild(MatSort) sort!:MatSort

  constructor(private api: ApiServiceService) {}
 

  ngOnInit(): void {
    this.api.menteesTaskData().subscribe((data: any) => {
      this.menteeData = data.data;
      console.log(this.menteeData)
      this.dataSources = new MatTableDataSource<any>(this.menteeData);

      console.log(this.menteeData);
    });



    this.api.mentorTaskData().subscribe((data: any) => {
      this.mentorData = data.data;
      console.log(this.mentorData)
      this.dataSource = new MatTableDataSource<any>(this.mentorData);

      console.log(this.mentorData);
    });


    this.dataSource.sort=this.sort





  }

  displayedColumns: string[] = [
    
    "Mentors",
    "Mentees",
    "CreateTask",
    "CompleteTask",
    "PendingTask",
    "Location",
    
  ];


  displayedColumns2: string[] = [
    
    "Mentees",
    "Mentors",
    "TotalTask",
    "CompleteTask",
    "PendingTask",
    "Location",
  ];




  dataSource = new MatTableDataSource<any>([]);
  dataSources = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  selections = new SelectionModel<any>(true, [])
  




/** Whether the number of selected elements matches the total number of rows. */
// isAllSelected() {
//   const numSelected = this.selection.selected.length;
//   const numRows = this.dataSource.data.length;
//   return numSelected === numRows;
//   }

  // isAllSelecte() {
  //   const numSelected = this.selections.selected.length;
  //   const numRows = this.dataSources.data.length;
  //   return numSelected === numRows;
  //   }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected()
  //     ? this.selection.clear()
  //     : this.dataSource.data.forEach((row) => this.selection.select(row));
  // }

  // masterToggles() {
  //   this.isAllSelecte()
  //     ? this.selections.clear()
  //     : this.dataSources.data.forEach((row) => this.selections.select(row));
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSources.filter = filterValue.trim().toLowerCase();
  }



  

}
