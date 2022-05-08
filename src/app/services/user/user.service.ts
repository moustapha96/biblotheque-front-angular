import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { User } from "../../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public islogin = false;
  public isAdmin = true;
  public isUser = false;

  private apiURL = 'http://127.0.0.1:8000/apiRest';

  private apiUrlLogin = 'http://127.0.0.1:8000/apiRest/login';

  token = localStorage.getItem('token');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${this.token}`
    })
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

  constructor(private httpClient: HttpClient) {
  }



  login(email: string, password: string) {
    return this.httpClient.post(`${this.apiUrlLogin}`, { email, password });
  }

  register(data: any): Observable<User> {
    return this.httpClient.post<User>('http://127.0.0.1:8000/apiRest/users', JSON.stringify(data))
    .pipe(
      catchError(this.errorHandler)
    )
  }


  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURL + '/users/', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(data: any): Observable<User> {

    return this.httpClient.post<User>(this.apiURL + '/users',
      JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id: number): Observable<User> {
    return this.httpClient.get<User>(this.apiURL + '/users/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getUserByEmail(email: any): Observable<User> {
    console.log(email);
    return this.httpClient.get<User>(this.apiURL + '/users/email/' + email, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getUserEmail(email: string, tok: string) {
    return this.httpClient.get(this.apiURL + '/users/email/' + email, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: number, user: any): Observable<User> {
    return this.httpClient.patch<User>(this.apiURL + '/users/' + id, JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: number) {
    return this.httpClient.delete<User>(this.apiURL + '/users/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  //blocker un user
  block(id: number) {
    return this.httpClient.get<User>(this.apiURL + '/users/block/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  //unblocker un user
  unblock(id: number) {
    return this.httpClient.get<User>(this.apiURL + '/users/unblock/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  errorHandler(error: any) {
    return throwError(error.error.message);
  }


}
