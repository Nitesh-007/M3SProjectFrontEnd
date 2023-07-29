import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { LayoutModule } from './layout/layout.module';
import { LoginModule } from './login/login.module';
import { MenteeModule } from './mentee/mentee.module';
import { MentorModule } from './mentor/mentor.module';
import { TaskModule } from './task/task.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { ApiServiceService } from 'src/service/api-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import{MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { HttpInterceptor } from '@angular/common/http';
import { ErrorInterceptor } from './interceptor/http-error.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { MatCardModule } from '@angular/material/card';
import {DatePipe} from '@angular/common';   


// import { MatCardContentModule }
// import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component'


@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    // SpinnerOverlayComponent,
  ],
  imports: [
    MatIconModule,
    MatFormFieldModule ,
    BrowserModule,
    RouterModule,
    FormsModule , 
    CommonModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    AdminModule,
    LayoutModule,
    LoginModule,
    MenteeModule,
    MentorModule,
    TaskModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,HttpClientModule,RouterModule,
    HighchartsChartModule,
    MatSnackBarModule,
    MatGridListModule,HttpClientModule,RouterModule, BrowserAnimationsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,MatCardModule

  ],
  providers: [ApiServiceService, CookieService,DatePipe,
  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
  },
  {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
  },
  {
    provide:HTTP_INTERCEPTORS,
    useClass:LoadingInterceptor,
    multi:true
  }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
