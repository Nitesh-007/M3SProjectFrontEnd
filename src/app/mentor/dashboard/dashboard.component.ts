import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ServiceService } from '../../services/service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  highcharts = Highcharts;
  taskSummary: any;
  weeklystore: any;
  isValue: number = 0; 

  chartOptions: Highcharts.Options;

  constructor(private menteeData: ServiceService) {
    this.chartOptions = {
      title: {
        text: ''
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Scores'
        }
      },
      chart: {
        type: 'column',
      },
      series: [
        {
          name: 'Weekly',
          type: 'column',
          data: []
        },
      ],
    };
  }

  ngOnInit(): void {
    this.getTaskData()
    this.weeklyData()

  }

  getTaskData() {
    var emp_type=JSON.parse(localStorage.getItem("currentUser")||'{}');
    const utype=emp_type.email;
    console.log(utype)
    this.menteeData.mentor(utype).subscribe((data: any) => {
      this.taskSummary = data.data;
    })
  }


  weeklyData() {
    var emp_type=JSON.parse(localStorage.getItem("currentUser")||'{}');
    const utype=emp_type.email;
    console.log(utype)
    
    return (this.menteeData.weekly(utype).subscribe((response: any) => {
      let finalData: any = [];
      response.forEach((element: any) => {
        finalData.push({ name: element.employeeName, y: element.employeeMarks })
      });
      this.isValue = 1;
      this.onWeek(finalData);
      
    }))
  }

  onWeek(data: any) {
    this.chartOptions = {
      title: {
        text: ''
      },
      xAxis: {
        categories:
          data.map((e: any) => { return e.name })

      },
      chart: {
        type: 'column',
      },
      series: [
        {
          name: 'Weekly',
          type: 'column',
          data: data
        },
      ],
    };
  }


  monthlyData() {
    var emp_type=JSON.parse(localStorage.getItem("currentUser")||'{}');
    const utype=emp_type.email;
    console.log(utype)
    return (this.menteeData.monthly(utype).subscribe((response:any) => {
      // this.onMonth(response);
      let finalData: any = [];
      response.forEach((element: any) => {
        finalData.push({ name: element.employeeName, y: element.employeeMarks })
      });
      this.isValue = 2;
      this.onMonth(finalData);
    }))
  }

  onMonth(data: any) {
    this.chartOptions = {
      title: {
        text: ''
      },
      xAxis: {
        categories:
          data.map((e: any) => { return e.name })

      },
      chart: {
        type: 'column',
      },
      series: [
        {
          name: 'Monthly',
          type: 'column',
          data: data
        },
      ],

    };
  }

}


