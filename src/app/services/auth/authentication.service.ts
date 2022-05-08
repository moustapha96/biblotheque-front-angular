import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  catchError,
  throwError,
} from "rxjs";
import { User } from "src/app/models/user/user";
import { ToastrService } from "ngx-toastr";
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { VariablesGlobales } from "src/app/_helpers/variable.global";
import { LoadingScreenService } from "../loading-screen/loading-screen.service";
import jwt_decode from "jwt-decode";
import { TokenDecoder } from "src/app/models/token/token.model";


@Injectable({
  providedIn: "root",
})
export class AuthenticationService implements OnInit {
  public isloggedIn: boolean = false;

  public apiUrlLogin = "http://127.0.0.1:8000/apiRest/login";
  private apiURL = "http://127.0.0.1:8000/apiRest";
  public user!: User;
  private token: string | any = '';

  admin = false;
  etudiant = false;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      // 'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${this.token}`,
    }),
  };
  showHead: boolean = false;
  public showOverlay = true;

  nbrLogin: number | any = 0;
  constructor(private httpClient: HttpClient, public router: Router, private toast: ToastrService,
    private param: VariablesGlobales, private loadingScreenService: LoadingScreenService) {

  }

  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    console.log(this.param.nbrLogin);

  }

  async login(email: string, password: string) {
    this.nbrLogin = localStorage.getItem('nbrLogin');
    this.param.token = '';
    // localStorage.setItem("token", this.param.token);
    localStorage.removeItem('token');
    console.log('fonction auth ' + this.nbrLogin);

    if (this.nbrLogin == 3) {
      this.toast.clear();
      this.toast.error(
        "trop de tentatives échouées , veuillez réessayer dans quelques minutes !!",
      );
      this.loadingScreenService.startLoading();
      //environ 35 seconde
      await this.delay(20000);
      this.loadingScreenService.stopLoading();
      this.toast.clear();
    }

    return this.httpClient
      .post(`${this.apiUrlLogin}`, { email, password })
      .subscribe(async (res) => {

        var d = Object.values(res);
        this.token = d[0];
        this.param.token = d[0];
       
        localStorage.setItem("token", this.param.token);
        localStorage.setItem("email", email);
        this.isloggedIn = true;

        if (this.param.token != '') {
          var tokenDecoded : TokenDecoder;
          tokenDecoded = jwt_decode(this.param.token);
          this.param.tokenDecoder = tokenDecoded;
          
          this.getUserEmail(email, this.param.token);
          this.param.nbrLogin = 0;
          localStorage.setItem('token', this.param.token);
          localStorage.setItem('nbrLogin', this.param.nbrLogin.toString());
        } else {
          this.loadingScreenService.startLoading();
          this.loadingScreenService.stopLoading();
          this.toast.clear();
        }
      }, (error) => {
        this.param.nbrLogin++;
        localStorage.setItem('nbrLogin', this.param.nbrLogin.toString());
        localStorage.setItem('token', this.param.token);
        this.toast.clear();
        this.toast.error(
          "Veillez verifier votre email ou mot de passe",
          "Authentification invalide!"
        );
      });
  }

  getUserEmail(email: string, token: string) {

    localStorage.setItem("token", this.token); localStorage.setItem("email", email);

    return this.httpClient
      .get<User>(this.apiURL + "/users/email/" + email, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      })
      .subscribe((res) => {
        this.user = res;
        if (!res.active) {
          this.toast.error('votre compte a été bloqué ')
          return;
        }
        if (this.user.roles[0] == "ROLE_USER") {
          this.etudiant = true; this.router.navigateByUrl('/etudiant');
        } else {
          this.admin = true; this.router.navigateByUrl('/admin');
        }
      });
  }

  isUserLoggedIn(): boolean {
    return this.isloggedIn;
  }

  async logout(): Promise<void> {
    this.isloggedIn = false;
    // localStorage.removeItem("email");
    // localStorage.removeItem("token");
    this.param.token = '';
    
    this.router.navigateByUrl('/login');
  }

  errorHandler(error: any) {

    return throwError(error.error.message);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

