import { Component, HostListener, OnInit } from '@angular/core';
import { User } from "../../../models/user/user";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NavigationEnd, Router } from "@angular/router";
import { UserService } from "../../../services/user/user.service";
import { CategorieService } from 'src/app/services/categorie/categorie.service';
import { Categorie } from 'src/app/models/categorie/categorie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Livre } from '../../../models/livre/livre';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { VariablesGlobales } from 'src/app/_helpers/variable.global';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  disableLogin: boolean = true;

  user: User | any;
  errorMessage = '';
  name = '';
  Wdate: any;
  annee = 0;
  loginForm!: FormGroup;


  email = '';
  password = '';
  nbrLogin : number| any = 0 ;

  constructor(private router: Router, public location: Location, public categoriService: CategorieService, private toast: ToastrService,
    private userService: UserService, public httpClient: HttpClient, public authService: AuthenticationService,
    public fb: FormBuilder, private param : VariablesGlobales, private loadingScreenService: LoadingScreenService ) { }

  async ngOnInit(): Promise<void> {
    console.log('login page'+this.nbrLogin);
    this.nbrLogin = localStorage.getItem('nbrLogin') != null ? localStorage.getItem('nbrLogin'): 0  ;
    console.log('login page'+this.nbrLogin);

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

   
    if ( this.nbrLogin >= 3) {
      this.loadingScreenService.startLoading();
      await this.delay(20000);
      this.loadingScreenService.stopLoading();
      this.param.nbrLogin = 0;
      localStorage.setItem('nbrLogin', this.param.nbrLogin.toString() );
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  login(): void {
    
    const val = this.loginForm.value;
    console.log(val);

    this.authService.login(val.email, val.password);
  }

  register(): void {
    this.router.navigateByUrl('/inscription');
  }

  logOut(): void {
    this.userService.islogin = false;
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
