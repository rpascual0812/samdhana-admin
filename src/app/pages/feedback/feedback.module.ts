import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedbackComponent } from './feedback.component';



@NgModule({
    declarations: [
        FeedbackComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class FeedbackModule { }
