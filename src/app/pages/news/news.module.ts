import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { NewsComponent } from './news.component';
import { NewsModalComponent } from './news-modal/news-modal.component';



@NgModule({
    declarations: [
        NewsComponent,
        NewsModalComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgxPaginationModule
    ]
})
export class NewsModule { }
