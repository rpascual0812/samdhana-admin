import { NgModule } from '@angular/core';
import { ConfigurationComponent } from './configuration.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ProvinceModule } from './province/province.module';
import { CityModule } from './city/city.module';
import { AreaModule } from './area/area.module';
import { EmailTemplatesModule } from './email-templates/email-templates.module';

@NgModule({
    declarations: [
        ConfigurationComponent,
    ],
    imports: [
        AccordionModule.forRoot(),
        ProvinceModule,
        CityModule,
        AreaModule,
        EmailTemplatesModule
    ]
})
export class ConfigurationModule { }
