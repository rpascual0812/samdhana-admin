import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthLayoutRoutes } from './auth-layout.routing';

import { LoginComponent } from '../../pages/auth/login/login.component';
import { ForgotPasswordComponent } from '../../pages/auth/forgot-password/forgot-password.component';
import { RegisterComponent } from '@pages/auth/register/register.component';
import { PhoneMaskDirective } from '@/directives/phone-mask.directive';
import { DateMaskDirective } from '@/directives/date-mask.directive';
import { ResetPasswordComponent } from '@pages/auth/reset-password/reset-password.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        LoginComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        RegisterComponent,
        PhoneMaskDirective,
        DateMaskDirective
    ],
    exports: [
        PhoneMaskDirective,
        DateMaskDirective
    ]
})
export class AuthLayoutModule { }
