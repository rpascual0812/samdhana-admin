import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgreementComponent } from './agreement.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TexteditorModule } from '@components/texteditor/texteditor.module';

@NgModule({
    declarations: [
        AgreementComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        AccordionModule.forRoot(),
        TexteditorModule
    ]
})
export class AgreementModule { }
