import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from 'src/app/login/reset-password/reset-password.component';
import { AuthGardGuard } from '../Auth/auth-gard.guard';
import { changePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { OtpComponent } from './otp/otp.component';


const routes: Routes = [
   { path: '', redirectTo: 'loginpage',pathMatch: 'full' },
    {
      path: 'loginpage',
      component:LoginComponent,
      
     
    },
    {
      path: 'forgot',
      component: ForgotPasswordComponent
    },
    {
      path: 'reset',
      component: ResetPasswordComponent
    },
    {
      path: 'logout',
      component:LogoutComponent
    },
    {
      path:'otp',
      component:OtpComponent
    },
    {
      path:'change',
      component:changePasswordComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }


/* canActivate:[AuthGardGuard]  */