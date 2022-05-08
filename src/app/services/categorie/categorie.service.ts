import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Categorie } from "../../models/categorie/categorie";
import { map } from 'rxjs/operators';
import { VariablesGlobales } from 'src/app/_helpers/variable.global';
import { LoadingScreenService } from '../loading-screen/loading-screen.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiURL = 'http://127.0.0.1:8000/apiRest/categories';

  token = localStorage.getItem('token');
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${this.token}`
    })
  }
  errorMessage: any;

  constructor(private httpClient: HttpClient, private param: VariablesGlobales, private loadingScreenService: LoadingScreenService) {
    this.token = localStorage.getItem('token');
  }

  getAll(): Observable<Categorie[]>  {
    if (this.param.token == '') {
      this.loadingScreenService.startLoading();
      this.loadingScreenService.stopLoading();
     
    }
    return this.httpClient.get<Categorie[]>(this.apiURL, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  create(nom_a: string): Observable<any> {
    const body = { nom: nom_a };

    return this.httpClient.post<Categorie>(this.apiURL, JSON.stringify(nom_a), this.httpOptions);
  }

  find(id: number): Observable<Categorie> {
    // @ts-ignore
    return this.httpClient.get<Categorie>(this.apiURL + '/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: number, nom: string): Observable<any> {
    var data = {
      'nom': nom
    }
    return this.httpClient.put(this.apiURL + '/' + id, data, this.httpOptions);
  }

  delete(id: number) {
    return this.httpClient.delete<Categorie>(this.apiURL + '/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {

    return throwError(error.error.message);
  }
}
