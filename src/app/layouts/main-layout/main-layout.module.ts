import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { MainLayoutRoutes } from './main-layout.routing';
import { TexteditorModule } from '@components/texteditor/texteditor.module';
import { SupportComponent } from '@pages/support/support.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { UsersModule } from '@pages/users/users.module';
import { BannersModule } from '@pages/banners/banners.module';
import { NewsModule } from '@pages/news/news.module';
import { AgreementModule } from '@pages/agreement/agreement.module';
import { FaqModule } from '@pages/faq/faq.module';
import { CompaintsModule } from '@pages/compaints/compaints.module';
import { FeedbackModule } from '@pages/feedback/feedback.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MainLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TexteditorModule,
        UsersModule,
        BannersModule,
        NewsModule,
        AgreementModule,
        FaqModule,
        CompaintsModule,
        FeedbackModule,
        TabsModule.forRoot()
    ],
    declarations: [
        SupportComponent,
        ProfileComponent
    ],

})
export class MainLayoutModule { }
