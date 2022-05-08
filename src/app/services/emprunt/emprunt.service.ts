import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Emprunt } from "../../models/emprunt/emprunt";
import { User } from "src/app/models/user/user";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class EmpruntService {
  private apiURL = "http://127.0.0.1:8000/apiRest/emprunts";

  token = localStorage.getItem("token");
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      // 'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  getAll(): Observable<Emprunt[]> {
    return this.httpClient
      .get<Emprunt[]>(this.apiURL, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  create(emprunt: any): Observable<Emprunt> {
    return this.httpClient
      .post<Emprunt>(this.apiURL, emprunt, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getUserByEmail(email: string) {
    return this.httpClient
      .get<User>(
        "http://127.0.0.1:8000/apiRest/users/email/" + email,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<Emprunt> {
    return this.httpClient
      .get<Emprunt>(this.apiURL + "/" + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  findUserEmprunt(id: number): Observable<Emprunt[]> {
    return this.httpClient
      .get<Emprunt[]>(this.apiURL + "/user/" + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }



  update(id: number, emprunt: any): Observable<Emprunt> {
    return this.httpClient
      .put<Emprunt>(this.apiURL + "/" + id, emprunt, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete<Emprunt>(this.apiURL + "/" + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  annuler(id: number): Observable<Emprunt> {
    return this.httpClient
      .get<Emprunt>(this.apiURL + "/annuler/" + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  rendrelivre(id: number, body: any): Observable<Emprunt> {
    console.log(JSON.stringify(body));
    return this.httpClient
      .put<Emprunt>(this.apiURL + "/rendre/" + id, body, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  emprunterLivre(idLivre: number, idUser: number) {
    return this.httpClient
      .post<Emprunt>(
        this.apiURL + "/emprunter/",
        JSON.stringify({
          idUser: idUser,
          idLivre: idLivre,
        }),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  EmprunterrorHandler(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      this.toastr.error("Vous avez deja emprunte ce livre");
    }
    return throwError(errorMessage);
  }
  errorHandler(error: any) {
    return throwError(error.error.message);
  }
}
