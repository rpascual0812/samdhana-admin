import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannersComponent } from './banners.component';

import { NgxPaginationModule } from 'ngx-pagination';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { SortableModule } from 'ngx-bootstrap/sortable';

import { BannersModalComponent } from './banners-modal/banners-modal.component';
import { MaxDigitsDirective } from '@/directives/max-digit.directive';

@NgModule({
    declarations: [
        BannersComponent,
        BannersModalComponent,
        MaxDigitsDirective
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgxPaginationModule,
        SortableModule.forRoot(),
        DragDropModule
    ]
})
export class BannersModule { }
