import { Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { AgreementComponent } from '@pages/agreement/agreement.component';
import { BannersComponent } from '@pages/banners/banners.component';
import { ChatSupportComponent } from '@pages/chat-support/chat-support.component';
import { CompaintsComponent } from '@pages/compaints/compaints.component';
import { FaqComponent } from '@pages/faq/faq.component';
import { FeedbackComponent } from '@pages/feedback/feedback.component';
import { NewsComponent } from '@pages/news/news.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { SupportComponent } from '@pages/support/support.component';
import { UsersComponent } from '@pages/users/users.component';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

export const MainLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'banners', component: BannersComponent, canActivate: [AuthGuard] },
    { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
    { path: 'chat', component: ChatSupportComponent, canActivate: [AuthGuard] },
    { path: 'agreement', component: AgreementComponent, canActivate: [AuthGuard] },
    { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard] },
    { path: 'complaints', component: CompaintsComponent, canActivate: [AuthGuard] },
    { path: 'faq', component: FaqComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];
