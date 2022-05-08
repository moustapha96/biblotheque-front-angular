import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';
import { Livre } from 'src/app/models/livre/livre';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private apiURL = "http://127.0.0.1:8000/apiRest/password";
  constructor(private httpClient: HttpClient, private toast: ToastrService) { }


  sendEmailToResetPassword(body: any){
    return this.httpClient
      .post<any>(this.apiURL+ '/get-reset-url', body )
      .pipe(catchError(this.errorHandler));
  }
  sendNewpassword(body: any){
    return this.httpClient
    .post<any>(this.apiURL+ '/new-password', body )
    .pipe(catchError(this.errorHandler));
  }

  sendResetPassword(body: any){
    return this.httpClient
    .post<any>(this.apiURL+ '/reset', body )
    .pipe(catchError(this.errorHandler));
  }
  

  errorHandler(error: any) {
    return throwError(error.error.message);
  }
}

