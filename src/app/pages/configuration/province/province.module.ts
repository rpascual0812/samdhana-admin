import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgToggleModule } from 'ng-toggle-button';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProvinceComponent } from './province.component';
import { ProvinceModalComponent } from './province-modal/province-modal.component';



@NgModule({
    declarations: [
        ProvinceComponent,
        ProvinceModalComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BsDatepickerModule.forRoot(),
        NgToggleModule.forRoot(),
        NgxPaginationModule
    ],
    exports: [
        ProvinceComponent
    ]
})
export class ProvinceModule { }
