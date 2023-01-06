import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';

import { ChartModule } from 'angular2-chartjs';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ChartModule,
        NgxPaginationModule
    ]
})
export class HomeModule { }
