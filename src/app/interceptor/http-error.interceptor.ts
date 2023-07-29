import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthServiceService } from "../Auth/auth-service.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthServiceService,
    private _snackBar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => { 
        if (err.status === 401) { 
          this.auth.logout();
          location.reload();
        } 
        else if (err.status === 409  ||  err.status === 500 ) {
          this._snackBar.open(err.error.message, "", {
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["red-snackbar"],
          });
        } else if (err.status === 500 ) {
          this._snackBar.open(err.error, "", {
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["red-snackbar"],
          });
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
