import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TexteditorComponent } from './texteditor.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
@NgModule({
    declarations: [
        TexteditorComponent,
    ],
    imports: [
        CommonModule,
        ModalModule.forRoot(),
        EditorModule
    ],
    providers: [
        { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
    ],
    exports: [
        TexteditorComponent
    ]
})
export class TexteditorModule { }
