import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
