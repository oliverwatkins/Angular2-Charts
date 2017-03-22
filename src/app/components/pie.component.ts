import {Component, OnInit, Input} from '@angular/core';
import {Subscription} from "rxjs";
import {LoggedService} from "./logged.service";
import {ChartInfo} from "./chart-info";


@Component({
    selector: 'pie-chart-component',
    template: `

        <div class="row">
        
        <div class="col-md-5">
            <pie-chart-component-form></pie-chart-component-form>
        </div>
        
        <div class="col-md-5">
        
            <div id="canvasTitle" >
                <h1 class="text-center">{{chartName}}</h1>
            </div>
            <!--<div id="canvasDiv" class="text-center">-->
        
                <canvas id="canvasDiv" baseChart
                  [data]="pieChartData"
                  [labels]="pieChartLabels"
                  [chartType]="pieChartType"
                  (chartHover)="chartHovered($event)"
                  (chartClick)="chartClicked($event)"></canvas>
            <!--</div>-->
        </div>
    </div>
  `,
    styles: [`

        div #canvasDiv {
          width: 450px;
          height: 450px;
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
