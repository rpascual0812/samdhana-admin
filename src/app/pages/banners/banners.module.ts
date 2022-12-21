import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannersComponent } from './banners.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { BannersModalComponent } from './banners-modal/banners-modal.component';

@NgModule({
    declarations: [
        BannersComponent,
        BannersModalComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgxPaginationModule
    ]
})
export class BannersModule { }
