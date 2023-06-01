import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaComponent } from './area.component';
import { AreaModalComponent } from './area-modal/area-modal.component';



@NgModule({
    declarations: [
        AreaComponent,
        AreaModalComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [AreaComponent]
})
export class AreaModule { }
