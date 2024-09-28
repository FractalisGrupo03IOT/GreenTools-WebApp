import { Routes } from '@angular/router';
import { RecoverPasswordComponent } from './public/pages/recover-password/recover-password.component';
import { RecoverPasswordConfirmationComponent } from './public/pages/recover-password-confirmation/recover-password-confirmation.component';
import {CropInventoryComponent} from "./public/pages/crop-inventory/crop-inventory.component";
import {CropPlantsComponent} from "./public/pages/crop-plants/crop-plants.component";
import {CropDataTableComponent} from "./public/pages/crop-data-table/crop-data-table.component";

export const routes: Routes = [
    { path: '', redirectTo: '/crops/station', pathMatch: 'full' },
    { path: 'membership/upgrade', component: RecoverPasswordComponent },
    { path: 'crops/notifications', component: RecoverPasswordConfirmationComponent },
    { path: 'crops/station', component: CropInventoryComponent },
    { path: 'crops/plants/:stationId', component: CropPlantsComponent },
    { path: 'crops/data', component: CropDataTableComponent },
];
