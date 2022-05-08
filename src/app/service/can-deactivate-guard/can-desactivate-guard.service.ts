import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/pages/connexion/login/login.component';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { VariablesGlobales } from 'src/app/_helpers/variable.global';




@Injectable({
  providedIn: 'root'
})
export class CanDesactivateGuardService implements CanDeactivate<LoginComponent> {

  temoin: number | any;

  constructor(
    private _router: Router,
    private _location: Location,
    private authService: AuthenticationService,
    private param: VariablesGlobales

  ) {  }

  canDeactivate(component: LoginComponent): boolean {
    console.log(this.param.nbrLogin);
    if (this.param.nbrLogin == 3) {
      console.log( 'dans can desactive  '+this.param.nbrLogin );
      return false;
    }
    return true;
  }



}
