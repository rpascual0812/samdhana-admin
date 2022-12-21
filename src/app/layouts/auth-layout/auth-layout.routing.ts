import { Routes } from '@angular/router';

import { LoginComponent } from '@pages/auth/login/login.component';
import { RegisterComponent } from '@pages/auth/register/register.component';
import { ForgotPasswordComponent } from '@pages/auth/forgot-password/forgot-password.component';
import { LogoutComponent } from '@pages/auth/logout/logout.component';
import { NonAuthGuard } from '@guards/non-auth.guard';
import { ResetPasswordComponent } from '@pages/auth/reset-password/reset-password.component';

export const AuthLayoutRoutes: Routes = [
    { path: '', component: LoginComponent, canActivate: [NonAuthGuard] },
    { path: 'logout', component: LogoutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password/:token', component: ResetPasswordComponent },
];
