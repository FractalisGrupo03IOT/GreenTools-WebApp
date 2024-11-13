import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/pages/login/login.component';
import { RecoverPasswordComponent } from './public/pages/recover-password/recover-password.component';
import { CreateUserComponent } from './public/pages/recover-password-confirmation/recover-password-confirmation.component';
import { CropInventoryComponent } from './public/pages/crop-inventory/crop-inventory.component';
import { CropPlantsComponent } from './public/pages/crop-plants/crop-plants.component';
import { CropDataTableComponent } from './public/pages/crop-data-table/crop-data-table.component';
import { MembershipComponent } from "./account/components/membership/membership.component";
import { WelcomeUserComponent } from "./profile/components/welcome-user/welcome-user.component";
import {DataCropComponent} from "./cropStatus/components/data-crop/data-crop.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login/recover', component: RecoverPasswordComponent },
  { path: 'membership/upgrade', component: MembershipComponent },
  { path: 'crops/registration', component: CreateUserComponent },
  { path: 'crops/station', component: CropInventoryComponent },
  { path: 'crops/plants/:stationId', component: CropPlantsComponent },
  { path: 'crops/plants/:stationId/datos/:plantId', component: DataCropComponent },
  { path: 'crops/plants/report', component: CropDataTableComponent },
  { path: 'crops/profile', component: WelcomeUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
