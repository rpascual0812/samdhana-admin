import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { OnboardingComponent } from './onboarding.component';
import { OnboardingModalComponent } from './onboarding-modal/onboarding-modal.component';



@NgModule({
    declarations: [
        OnboardingComponent,
        OnboardingModalComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgxPaginationModule
    ],
    exports: [
        OnboardingComponent
    ]
})
export class OnboardingModule { }
