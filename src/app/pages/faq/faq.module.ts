import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaqComponent } from './faq.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FaqModalComponent } from './faq-modal/faq-modal.component';
import { TexteditorModule } from '@components/texteditor/texteditor.module';

@NgModule({
    declarations: [
        FaqComponent,
        FaqModalComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        AccordionModule.forRoot(),
        TexteditorModule
    ]
})
export class FaqModule { }
