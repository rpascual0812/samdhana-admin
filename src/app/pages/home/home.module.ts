import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { ChartModule } from 'angular2-chartjs';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        ChartModule
    ]
})
export class HomeModule { }
