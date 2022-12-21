import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompaintsComponent } from './compaints.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { ComplaintsModalComponent } from './complaints-modal/complaints-modal.component';
import { TexteditorModule } from '@components/texteditor/texteditor.module';

import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
    declarations: [
        CompaintsComponent,
        ComplaintsModalComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgxPaginationModule,
        TexteditorModule,
        TabsModule.forRoot()
    ]
})
export class CompaintsModule { }
