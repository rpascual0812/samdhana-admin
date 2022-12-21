import { Routes } from '@angular/router';
import { NotFoundComponent } from '@pages/errors/not-found/not-found.component';

export const PublicLayoutRoutes: Routes = [
    // { path: 'terms', component: TermsComponent },
    // { path: 'privacy', component: PrivacyComponent },
    // { path: 'contact-us', component: ContactUsComponent },
    { path: '404', component: NotFoundComponent },
];
