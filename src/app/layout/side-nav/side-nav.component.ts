import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/service/data.service';

@Component({
selector: 'app-side-nav',
templateUrl: './side-nav.component.html',
styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
utype: any;






constructor(private data: DataService) { 
    var emp_type=JSON.parse(localStorage.getItem("currentUser")||'{}');
    this.utype=emp_type.employeeType;
    // console.log(this.utype)

}

ngOnInit(): void {
   

    
    
}


public onClickSideNav(value:any) {
    this.data.changeMessage(value)
}
}