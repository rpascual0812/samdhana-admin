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
import { HomeModule } from '@pages/home/home.module';
import { ChatSupportModule } from '@pages/chat-support/chat-support.module';
import { ConfigurationModule } from '@pages/configuration/configuration.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MainLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TexteditorModule,
        HomeModule,
        UsersModule,
        BannersModule,
        NewsModule,
        AgreementModule,
        FaqModule,
        CompaintsModule,
        ChatSupportModule,
        ConfigurationModule,
        FeedbackModule,
        TabsModule.forRoot()
    ],
    declarations: [
        SupportComponent,
        ProfileComponent
    ],

})
export class MainLayoutModule { }
