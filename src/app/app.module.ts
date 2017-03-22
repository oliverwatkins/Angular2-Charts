import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroesComponent }      from './heroes.component';
import { HeroService }          from './hero.service';

import { AppRoutingModule }     from './app-routing.module';
import {BarChartComponent} from "./components/bar.component";
import {PieChartComponent} from "./components/pie.component";
import {PieChartComponentForm} from "./components/pie-form.component";
import {SharedService} from "./components/shared.service";
import {LoggedService} from "./components/logged.service";

import {ChartsModule} from "ng2-charts";

import {ColorPickerModule} from 'angular2-color-picker';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ChartsModule,
    ColorPickerModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    BarChartComponent,
    PieChartComponent,
    PieChartComponentForm
  ],
  providers: [ HeroService, SharedService, LoggedService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
