import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatSupportComponent } from './chat-support.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { TexteditorModule } from '@components/texteditor/texteditor.module';

import { TabsModule } from 'ngx-bootstrap/tabs';



@NgModule({
    declarations: [
        ChatSupportComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgxPaginationModule,
        TexteditorModule,
        TabsModule.forRoot()
    ]
})
export class ChatSupportModule { }
