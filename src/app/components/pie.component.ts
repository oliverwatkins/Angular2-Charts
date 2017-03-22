import {Component, OnInit, Input} from '@angular/core';
import {Subscription} from "rxjs";
import {LoggedService} from "./logged.service";
import {ChartInfo} from "./chart-info";


@Component({
    selector: 'pie-chart-component',
    template: `

        <pie-chart-component-form></pie-chart-component-form>
        <div style="display: block">
        <div id="canvasTitle">{{chartName}}</div>
        <div id="canvasDiv">
        
          <canvas id="canvasDiv" baseChart
                  [data]="pieChartData"
                  [labels]="pieChartLabels"
                  [chartType]="pieChartType"
                  (chartHover)="chartHovered($event)"
                  (chartClick)="chartClicked($event)"></canvas>
          </div>

        </div>
  `,
    styles: [`
        /*canvas {*/
          /*width: 50px;*/
          /*height: 50px;*/
        /*}*/
        div #canvasDiv {
          width: 250px;
          height: 250px;
        }
        `]
})
export class PieChartComponent implements OnInit {

    // this.chartTitle = "asdf"
    chartName: string = "afsdfasdf";


    constructor(
        private ls: LoggedService){}

    ngOnInit():any {

        // Will fire everytime other component use the setter this.ls.setLogged()
        this.ls.getLogged().subscribe((logged: ChartInfo) => {
            this.chartName = logged.title;
            console.log('Welcome %s', logged.displayName);
        });
    }
    // Pie
    public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    public pieChartData:number[] = [300, 500, 104];
    public pieChartType:string = 'pie';

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
}
