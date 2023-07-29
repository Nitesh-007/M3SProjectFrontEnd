import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from 'src/app/login/reset-password/reset-password.component';
import { MatGridListModule } from '@angular/material/grid-list';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import { OtpComponent } from './otp/otp.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { changePasswordComponent } from './change-password/change-password.component';
import { Base64 } from 'js-base64';



@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    OtpComponent,
    changePasswordComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTabsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    FormsModule,
    
  ],
  exports:[LoginComponent,
    LogoutComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    OtpComponent,
  changePasswordComponent
  ]
})
export class LoginModule {
  
 }
