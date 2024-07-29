import { Routes } from '@angular/router';
import { ProtectedUploadComponent } from './protected-upload-component/protected-upload.component';
import { AdminComponent } from './admin/admin.component';
import { ImprintComponent } from './imprint/imprint.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { DataPrivacyComponent } from './data-privacy/data-privacy.component';

export const routes: Routes = [
    {path: '', component: ProtectedUploadComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'impressum', component: ImprintComponent},
    {path: 'nutzungsbedingungen', component: TermsOfServiceComponent},
    {path: 'datenschutz', component: DataPrivacyComponent}
];
