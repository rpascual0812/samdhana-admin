import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityComponent } from './city.component';
import { CityModalComponent } from './city-modal/city-modal.component';



@NgModule({
    declarations: [
        CityComponent,
        CityModalComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [CityComponent]
})
export class CityModule { }
