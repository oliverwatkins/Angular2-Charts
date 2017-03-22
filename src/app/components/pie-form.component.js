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
var forms_1 = require('@angular/forms');
var logged_service_1 = require("./logged.service");
var angular2_color_picker_1 = require('angular2-color-picker');
var PieChartComponentForm = (function () {
    function PieChartComponentForm(ls, cpService) {
        // this.pieItems.push({
        //     "Name": "itemName",
        //     "Percent": "Percent",
        //     "Color": "#4286f4"
        // })
        //
        // this.pieItems.push({
        //     "Name": "itemName2",
        //     "Percent": "Percent2",
        //     "Color": "#873269"
        // })
        this.ls = ls;
        this.cpService = cpService;
        this.pieItems = [];
        this.testItem = {
            "Name": "",
            "Percent": "",
            "Color": ""
        };
        this.logged = { email: '' };
        this.formErrors = {
            'name': '',
            'power': '',
            'newSlice': '',
            'newValue': ''
        };
        this.validationMessages = {
            'name': {
                'required': 'Name is required.',
                'minlength': 'Name must be at least 4 characters long.',
                'maxlength': 'Name cannot be more than 24 characters long.',
                'forbiddenName': 'Someone named "Bob" cannot be a hero.'
            },
            'power': {
                'required': 'Power is required.'
            },
            'newSlice': {
                'required': 'Slice is required.',
                'minlength': 'Name must be at least 4 characters long.',
                'maxlength': 'Name cannot be more than 24 characters long.',
                'forbiddenName': 'Someone named "Bob" cannot be a hero.'
            },
            'newValue': {
                'required': 'Name is required.',
                'minlength': 'Name must be at least 4 characters long.',
                'maxlength': 'Name cannot be more than 24 characters long.',
                'forbiddenName': 'Someone named "Bob" cannot be a hero.'
            },
        };
    }
    PieChartComponentForm.prototype.ngAfterViewChecked = function () {
        this.formChanged();
    };
    PieChartComponentForm.prototype.formChanged = function () {
        var _this = this;
        if (this.heroForm) {
            this.heroForm.valueChanges
                .subscribe(function (data) { return _this.onValueChanged(data); });
        }
    };
    PieChartComponentForm.prototype.onValueChanged = function (data) {
        if (!this.heroForm) {
            return;
        }
        var form = this.heroForm.form;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    PieChartComponentForm.prototype.addSlice = function () {
        var elems = this.pieItems;
        for (var i = 0; i < elems.length; i++) {
            if (this.testItem.Name === (elems[i].Name)) {
                alert('Slice with this name already exists');
                return;
            }
        }
        var obj2 = Object.assign({}, this.testItem);
        this.pieItems.push(obj2);
        this.testItem = { Name: "", Color: "", Percent: "" };
        this.heroForm.reset();
    };
    PieChartComponentForm.prototype.deleteClick = function (item) {
        alert('item ' + item);
    };
    PieChartComponentForm.prototype.ngOnInit = function () {
        // this.data = this._sharedService.dataArray;
    };
    PieChartComponentForm.prototype.keypress = function (chartTitle) {
        this.logged = { email: chartTitle, title: chartTitle };
        this.ls.setLogged(this.logged);
    };
    __decorate([
        core_1.ViewChild('heroForm'), 
        __metadata('design:type', forms_1.NgForm)
    ], PieChartComponentForm.prototype, "heroForm", void 0);
    PieChartComponentForm = __decorate([
        core_1.Component({
            selector: 'pie-chart-component-form',
            template: "\n        <div>\n            <div class=\"col-xs-7\">\n                <h3>Enter Chart Title Here : </h3>\n                <input #charttitle type=\"text\" class=\"form-control\" [(ngModel)]=\"chartName\" (keyup)=\"keypress(charttitle.value)\"/>\n            </div>\n\n            <div>\n\n                <form #heroForm=\"ngForm\" name=\"form\" class=\"css-form\">\n                <div class=\"col-xs-10\">\n                    <div class=\"col-xs-6\">\n                        <h3>Add Sections Here :</h3>\n                    </div>\n                </div>    \n                   <div class=\"input-group  col-xs-7\">\n                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n                        <input type=\"text\" class=\"form-control\" \n                        name=\"newSlice\" required [(ngModel)]=\"testItem.Name\" placeholder=\"Add Pie Slice Name\">\n                    </div>\n                    <div class=\"input-group col-xs-3\">\n                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-plus\"></i></span>\n                        <input type=\"number\" class=\"form-control\" \n                        name=\"newValue\" required [(ngModel)]=\"testItem.Percent\" min=\"1\" max=\"5\" placeholder=\"Add valuee\">\n                    </div>\n                    <div class=\"input-group col-xs-3\">\n                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-tint\"></i></span>\n                        <input type=\"text\" class=\"form-control\" \n                        name=\"color\" [(ngModel)]=\"testItem.Color\" [(colorPicker)]=\"color\" [style.background]=\"color\"  placeholder=\"Choose Color\">\n                    </div>\n\n                    <button type=\"submit\" value=\"Add Slice\" class=\"button\" (click) = \"addSlice()\">Add Slice</button>\n                </form>\n            </div>\n    \n            <div>\n                <table>\n                    <tr *ngFor=\"let itm of pieItems\" >\n                        <td>Name :\n                            {{itm.Name}}\n                        </td>\n                        <td >\n                            Color :\n                            <div [style.background]=\"itm.Color\">\n                            {{itm.Color}}\n                            </div>\n                        </td>\n                        <td>\n                            Value :\n                            {{itm.Percent}}\n                        </td>\n                        <td>\n                            <button class=\"button\" (click)= \"deleteClick(item)\">Delete</button>\n                        </td>\n                    </tr>\n                </table>\n\n                 <div *ngIf=\"formErrors.newValue\" class=\"alert alert-danger\">\n                    {{ formErrors.newValue }}\n                    </div>\n                         <div *ngIf=\"formErrors.newSlice\" class=\"alert alert-danger\">\n                                {{ formErrors.newSlice }}\n                         </div>\n                    </div>\n\n        </div>\n  "
        }), 
        __metadata('design:paramtypes', [logged_service_1.LoggedService, angular2_color_picker_1.ColorPickerService])
    ], PieChartComponentForm);
    return PieChartComponentForm;
}());
exports.PieChartComponentForm = PieChartComponentForm;
//# sourceMappingURL=pie-form.component.js.map