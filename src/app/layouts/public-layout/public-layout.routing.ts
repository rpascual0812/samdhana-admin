import { Routes } from '@angular/router';
import { ContactUsComponent } from '@pages/contact-us/contact-us.component';
import { PrivacyComponent } from '@pages/privacy/privacy.component';
import { TermsComponent } from '@pages/terms/terms.component';

export const PublicLayoutRoutes: Routes = [
    { path: 'terms', component: TermsComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'contact-us', component: ContactUsComponent },
];
