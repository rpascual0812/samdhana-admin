import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PhotoEditorComponent } from './photo-editor.component';
import { LoaderModule } from '@components/loader/loader.module';

@NgModule({
    declarations: [
        PhotoEditorComponent,
    ],
    imports: [
        CommonModule,
        ImageCropperModule,
        LoaderModule
    ],
    exports: [

    ]
})
export class PhotoEditorModule { }
