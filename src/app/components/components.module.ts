import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './navbar/user/user.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { FooterComponent } from './footer/footer.component';

import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownMenuComponent } from './dropdown/dropdown-menu/dropdown-menu.component';
import { MessagesComponent } from './navbar/messages/messages.component';
import { NotificationsComponent } from './navbar/notifications/notifications.component';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ImageCropperModule } from 'ngx-image-cropper';
import { LoaderModule } from './loader/loader.module';

import { PhotoEditorModule } from './photo-editor/photo-editor.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        // ImageCropperModule,
        ProgressbarModule.forRoot(),
        PhotoEditorModule,
        LoaderModule
    ],
    declarations: [
        NavbarComponent,
        UserComponent,
        SidebarComponent,
        MenuItemComponent,
        FooterComponent,

        DropdownComponent,
        DropdownMenuComponent,
        MessagesComponent,
        NotificationsComponent,
        // DocumentViewerComponent,
        FileUploaderComponent,
    ],
    exports: [
        NavbarComponent,
        UserComponent,
        SidebarComponent,
        MenuItemComponent,
        FooterComponent,

        DropdownComponent,
        DropdownMenuComponent,
        MessagesComponent,
        NotificationsComponent,

        // DocumentViewerComponent,
    ],
    providers: [

    ]
})
export class ComponentsModule { }
