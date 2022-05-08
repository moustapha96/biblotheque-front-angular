import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { catchError, Observable, throwError } from "rxjs";
import { AuthenticationService } from "../services/auth/authentication.service";
import { VariablesGlobales } from "./variable.global";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,  
             private toast: ToastrService , private param: VariablesGlobales, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let exper: boolean = this.param.isTokenExpired();

    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401  || exper == true ) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        this.toast.clear();
        this.toast.info('token expirer , recoonecter vous ');
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
