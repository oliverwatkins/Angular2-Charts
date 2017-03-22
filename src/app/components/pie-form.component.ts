import {Component, OnInit, EventEmitter, ViewChild, AfterViewChecked} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoggedService} from "./logged.service";
import {ChartInfo} from "./chart-info";
import {PieItem} from "./pie-item";
import {ColorPickerService} from 'angular2-color-picker';

@Component({
    selector: 'pie-chart-component-form',
    template: `
        <div>
            <div class="col-xs-7">
                <h3>Enter Chart Title Here : </h3>
                <input #charttitle type="text" class="form-control" [(ngModel)]="chartName" (keyup)="keypress(charttitle.value)"/>
            </div>

            <div>

                <form #heroForm="ngForm" name="form" class="css-form">
                <div class="col-xs-10">
                    <div class="col-xs-6">
                        <h3>Add Sections Here :</h3>
                    </div>
                </div>    
                   <div class="input-group  col-xs-7">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                        <input type="text" class="form-control" 
                        name="newSlice" required [(ngModel)]="testItem.Name" placeholder="Add Pie Slice Name">
                    </div>
                    <div class="input-group col-xs-3">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-plus"></i></span>
                        <input type="number" class="form-control" 
                        name="newValue" required [(ngModel)]="testItem.Percent" min="1" max="5" placeholder="Add valuee">
                    </div>
                    <div class="input-group col-xs-3">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-tint"></i></span>
                        <input type="text" class="form-control" 
                        name="color" [(ngModel)]="testItem.Color" [(colorPicker)]="color" [style.background]="color"  placeholder="Choose Color">
                    </div>

                    <button type="submit" value="Add Slice" class="button" (click) = "addSlice()">Add Slice</button>
                </form>
            </div>
    
            <div>
                <table>
                    <tr *ngFor="let itm of pieItems" >
                        <td>Name :
                            {{itm.Name}}
                        </td>
                        <td >
                            Color :
                            <div [style.background]="itm.Color">
                            {{itm.Color}}
                            </div>
                        </td>
                        <td>
                            Value :
                            {{itm.Percent}}
                        </td>
                        <td>
                            <button class="button" (click)= "deleteClick(item)">Delete</button>
                        </td>
                    </tr>
                </table>

                 <div *ngIf="formErrors.newValue" class="alert alert-danger">
                    {{ formErrors.newValue }}
                    </div>
                         <div *ngIf="formErrors.newSlice" class="alert alert-danger">
                                {{ formErrors.newSlice }}
                         </div>
                    </div>

        </div>
  `
})
export class PieChartComponentForm implements OnInit, AfterViewChecked {

    chartName: string;
    pieItems: Array<PieItem> = []
    testItem: PieItem = {
        "Name": "",
        "Percent": "",
        "Color": ""
    }

    // heroForm: NgForm;
    @ViewChild('heroForm') heroForm: NgForm;

    private logged: ChartInfo = {email: ''};

    constructor(private ls: LoggedService, private cpService: ColorPickerService) {
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

    }


    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.heroForm) {
            this.heroForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }


    onValueChanged(data?: any) {
        if (!this.heroForm) {
            return;
        }
        const form = this.heroForm.form;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'name': '',
        'power': '',
        'newSlice': '',
        'newValue': ''
    };

    validationMessages = {
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


    addSlice() {
        var elems = this.pieItems;

        for (let i = 0; i < elems.length; i++) {
            if (this.testItem.Name === (elems[i].Name)) {
                alert('Slice with this name already exists')
                return;
            }
        }

        var obj2:any=Object.assign({},this.testItem);
        this.pieItems.push(obj2);

        this.testItem = {Name:"", Color:"", Percent:""};
        this.heroForm.reset();
    }

    deleteClick(item: any) {
        alert('item ' + item)
    }

    ngOnInit(): any {
        // this.data = this._sharedService.dataArray;
    }

    keypress(chartTitle: string): void {

        this.logged = {email: chartTitle, title: chartTitle};

        this.ls.setLogged(this.logged);
    }
}
