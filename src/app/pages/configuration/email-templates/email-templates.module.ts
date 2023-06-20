import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailTemplatesComponent } from './email-templates.component';

import { TexteditorModule } from '@components/texteditor/texteditor.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        EmailTemplatesComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TexteditorModule
    ],
    exports: [
        EmailTemplatesComponent
    ]
})
export class EmailTemplatesModule { }
