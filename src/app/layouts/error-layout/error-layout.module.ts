import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PublicLayoutRoutes } from './error-layout.routing';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(PublicLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class ErrorLayoutModule { }
