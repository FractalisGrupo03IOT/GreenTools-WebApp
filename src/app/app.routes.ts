import { Routes } from '@angular/router';
import { RecoverPasswordComponent } from './public/pages/recover-password/recover-password.component';
import { RecoverPasswordConfirmationComponent } from './public/pages/recover-password-confirmation/recover-password-confirmation.component';
import { FlowerpotsListComponent } from './public/pages/flowerpots-list/flowerpots-list.component';


export const routes: Routes = [
    { path: '', redirectTo: '/flowerpots/list', pathMatch: 'full' },
    { path: 'recover/password', component: RecoverPasswordComponent },
    { path: 'recover/password/confirmation/:message', component: RecoverPasswordConfirmationComponent },
    { path: 'flowerpots/list', component: FlowerpotsListComponent },
];
