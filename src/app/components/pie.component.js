"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var logged_service_1 = require("./logged.service");
var PieChartComponent = (function () {
    function PieChartComponent(ls) {
        this.ls = ls;
        // this.chartTitle = "asdf"
        this.chartName = "afsdfasdf";
        // Pie
        this.pieChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
        this.pieChartData = [300, 500, 104];
        this.pieChartType = 'pie';
    }
    PieChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Will fire everytime other component use the setter this.ls.setLogged()
        this.ls.getLogged().subscribe(function (logged) {
            _this.chartName = logged.title;
            console.log('Welcome %s', logged.displayName);
        });
    };
    // events
    PieChartComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    PieChartComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    PieChartComponent = __decorate([
        core_1.Component({
            selector: 'pie-chart-component',
            template: "\n\n        <pie-chart-component-form></pie-chart-component-form>\n        <div style=\"display: block\">\n        <div id=\"canvasTitle\">{{chartName}}</div>\n        <div id=\"canvasDiv\">\n        \n          <canvas id=\"canvasDiv\" baseChart\n                  [data]=\"pieChartData\"\n                  [labels]=\"pieChartLabels\"\n                  [chartType]=\"pieChartType\"\n                  (chartHover)=\"chartHovered($event)\"\n                  (chartClick)=\"chartClicked($event)\"></canvas>\n          </div>\n\n        </div>\n  ",
            styles: ["\n        /*canvas {*/\n          /*width: 50px;*/\n          /*height: 50px;*/\n        /*}*/\n        div #canvasDiv {\n          width: 250px;\n          height: 250px;\n        }\n        "]
        }), 
        __metadata('design:paramtypes', [logged_service_1.LoggedService])
    ], PieChartComponent);
    return PieChartComponent;
}());
exports.PieChartComponent = PieChartComponent;
//# sourceMappingURL=pie.component.js.map