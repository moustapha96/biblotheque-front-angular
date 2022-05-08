import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Livre } from "../../models/livre/livre";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class LivreService {
  private apiURL = "http://127.0.0.1:8000/apiRest/books";

  token = localStorage.getItem("token");
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    }),
  };
  constructor(private httpClient: HttpClient, private toast: ToastrService) { }

  getAll(): Observable<Livre[]> {
    return this.httpClient.get<Livre[]>(this.apiURL, this.httpOptions);
  }

  create(livre: any): Observable<Livre> {
    // @ts-ignore
    return this.httpClient
      .post<Livre>(this.apiURL, JSON.stringify(livre), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<Livre> {
    return this.httpClient
      .get<Livre>(this.apiURL + '/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, livre: Livre): Observable<Livre> {
    return this.httpClient
      .patch<Livre>(this.apiURL + '/' + id, JSON.stringify(livre), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete<Livre>(this.apiURL + '/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  search(isbn: any): Observable<Livre[]> {
    return this.httpClient
      .post<Livre[]>(this.apiURL + '/search', JSON.stringify(isbn), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  searchCritere(body: any): Observable<Livre[]> {
    return this.httpClient
      .post<Livre[]>(this.apiURL + '/searchCritere', body, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }


  errorHandler(error: any) {
    return throwError(error.error.message);
  }
}
function isbn(isbn: any): any {
  throw new Error("Function not implemented.");
}

