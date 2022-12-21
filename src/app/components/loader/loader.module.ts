import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';

@NgModule({
    declarations: [
        LoaderComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoaderComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoaderModule { }
