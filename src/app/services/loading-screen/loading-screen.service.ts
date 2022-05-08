import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { VariablesGlobales } from 'src/app/_helpers/variable.global';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {


  private _loading: boolean = false;
  constructor(private param: VariablesGlobales) { }


  loadingStatus: Subject<boolean> = new Subject();

  get loading():boolean {
    return this._loading;
  }

  set loading(value) {
    this._loading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
       console.log('function stop A ' + this.param.nbrLogin);
       let nbre =  localStorage.getItem('nbrLogin');
       if(nbre &&  Number(nbre) > 3 ){
          this.param.nbrLogin = 0;
          localStorage.setItem('nbrLogin', this.param.nbrLogin.toString() );
       }
      
      console.log('function stop apres '+ this.param.nbrLogin);
  }
}
