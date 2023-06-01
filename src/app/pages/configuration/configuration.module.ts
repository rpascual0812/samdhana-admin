import { NgModule } from '@angular/core';
import { ConfigurationComponent } from './configuration.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ProvinceModule } from './province/province.module';
import { CityModule } from './city/city.module';
import { AreaModule } from './area/area.module';

@NgModule({
    declarations: [
        ConfigurationComponent,
    ],
    imports: [
        AccordionModule.forRoot(),
        ProvinceModule,
        CityModule,
        AreaModule
    ]
})
export class ConfigurationModule { }
