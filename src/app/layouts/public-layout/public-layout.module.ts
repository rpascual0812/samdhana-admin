import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PublicLayoutRoutes } from './public-layout.routing';
import { ContactUsComponent } from '@pages/contact-us/contact-us.component';
import { TexteditorModule } from '@components/texteditor/texteditor.module';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PublicLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        TexteditorModule,
    ],
    declarations: [
        ContactUsComponent
    ],
})
export class PublicLayoutModule { }
