import {Component, OnInit  } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiServiceService } from 'src/service/api-service.service';
import { DataService } from 'src/service/data.service';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
require('highcharts/modules/heatmap')(Highcharts);
require('highcharts/modules/treemap')(Highcharts);
require('highcharts/modules/funnel')(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit{

 mentees!:any
 tasks!:any
 chart:any[]=[]

  
  Highcharts = Highcharts;
  donutChartOptions: any = null
  pieColors = this.setPieColors();



  

  constructor( private api:ApiServiceService ,private data: DataService) {
   
  }

  public onClickSideNav(value:any) {
    this.data.changeMessage(value)
}

  ngOnInit(): void {
    this.api.menteesList().subscribe((data:any)=>{
      this.mentees=data
    })


    this.api.task().subscribe((data:any)=>{
      this.tasks=data
    })

    this.api.chartData().subscribe((data:any)=>{
      this.chart=data[0].data
      this.chart.map((e : any )=> {e.y =parseInt(e.count)});
      this.setTotalMentorChart();
    })
 
  }

  public setPieColors() {
    


    let colors= [{
      linearGradient: {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 1
      },
      stops: [
        [0, '#0067b4'],
        [1, '#16cabd']
      ]
    }, {
      linearGradient: {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 1
      },
      stops: [
        [0, '#3c0096'],
        [1, '#7b3dd9']
      ]
    },{
      linearGradient: {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 1
      },
      stops: [
        [0, '#cf4a00'],
        [1, '#ff9d00']
      ]
    },{
      linearGradient: {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 1
      },
      stops: [
        [0, '#6cff00'],
        [1, '#00ff04']
      ]
    },{
      linearGradient: {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 1
      },
      stops: [
        [0, '#ff0000'],
        [1, '#ff4800']
      ]
    }
  ]
    
    return colors;
  }


  public setTotalMentorChart() {
    this.donutChartOptions = {
      chart: {
        plotBackgroundColor: null,
        backgroundColor: 'transparent',
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        margin:0,
        padding:0,
        options3d: {
          enabled: true,
          alpha: 45
        },
        style: {
          margin: '0 0 0px 0'
        },
        height: 300
      },
      title: {
        text: 'Total<br>Mentors<br>',
        align: 'center',
        verticalAlign: 'middle',
        // y:20,
        x:-140
    },
      subtitle: {
        
        useHTML: true,
      },

      legend: {

        enabled: true,
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
        squareSymbol: false,
        symbolHeight: 10,
        symbolWidth: 20,
        symbolRadius: 5,
        itemMarginTop: 24,
        itemMarginBottom: 7,
        itemDistance: 0,
        useHTML: true,
        x:-50,
        // labelFormatter: function () {
        //   return '<span style="float: right; font-weight: bold;">(' + this.y + ')</span> ' + this.name;
        // }
        // labelFormatter :function () {
        //   return this.y + "<br/>" + this.name + "<br/>"
        // }

      },
      plotOptions: {
        pie: {
          pointPadding: 0,
          borderWidth:3.5,
          // borderColor: 'red',
          slicedOffset: 10,
          allowPointSelect: true,
          cursor: 'pointer',
          colors: this.pieColors,
          dataLabels: {
            enabled: false,
          },
          innerSize: "50%",
           depth: 30,
           size: "100%",
           center :['25%', '50%']
        },
      },
      series: [{ 
        minPointSize: 10,
        groupPadding:0,
         pointPadding :0,
            zMin: 0,
            name: 'Mentors',
        
            //           data:this.chart.data,
        data: this.chart.map((item: any) => {
          return {
            name: item.domain + "       " + item.count,// Use the "domain" value as the legend name
            y: parseInt(item.count)
          };
        }),
            
        showInLegend: true
      // }
      }],
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        borderWidth:2,
        borderRadius:12,

        // formatter: function () {
        //       return "<span>" + GermanFormatter(this.point.percentage.toFixed(2)) + '%' + "</span><br/><span>" + this.key + "</span>"
        //     },
      }, credits: {
        enabled: false
      }
    }
  }


  


 

  


  
  

 



}



