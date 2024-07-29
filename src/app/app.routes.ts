import { Routes } from '@angular/router';
import { ProtectedUploadComponent } from './protected-upload-component/protected-upload.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {path: '', component: ProtectedUploadComponent},
    {path: 'admin', component: AdminComponent}
];
