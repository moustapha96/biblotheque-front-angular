import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
  RoutesRecognized,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { VariablesGlobales } from 'src/app/_helpers/variable.global';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  public token: any;
  valide = false;
  constructor(
    private param: VariablesGlobales,
    private userService: UserService,
    private _router: Router, private _location: Location,
    private authService: AuthenticationService,
    private toast: ToastrService,
  ) {
    console.log(this.token);
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
    console.log(' token sur guard expirer ' + this.param.isTokenExpired()  );



    //  let currentUrl = this._router.url;
    // let back = this._location.back();
    // console.log(back);

    // if (currentUrl == '/login') {
    //   localStorage.removeItem('token')
    //   this.authService.logout();
    //   location.reload();
    // }


    // this._router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     let previousUrl = currentUrl;
    //     currentUrl = event.url;
    //     if (previousUrl != '/login' && currentUrl == '/login' && this.token != '') {
    //       console.log('vous vener de ' + previousUrl);
    //       console.log('vous etes sur  ' + currentUrl);
    //       this.valide = true;
    //     }
    //     if ( currentUrl == '/login' && this.token != '' ) {
    //       console.log('vous ete connecter  ' + currentUrl);
    //       console.log('votre token est  ' + this.token);
    //       this.token = null;
    //       // localStorage.removeItem('token');
    //       this.valide = true;
    //     }
    //   };
    // });

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.token == null) {
      this._router.navigate(['login']);
    }
    if (this.param.isTokenExpired() == true) {
      this.toast.clear();
      this.toast.info('votre token est expirer , recoonecter-vous');
      this._router.navigate(['login']);
    }

    return true;
  }
}
