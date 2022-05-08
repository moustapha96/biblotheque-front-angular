import { Injectable } from '@angular/core';
import { TokenDecoder } from '../models/token/token.model';

@Injectable()
export class VariablesGlobales {
    nbrLogin: number = 0;
    token: string = '';
    tokenDecoder!: TokenDecoder;

    constructor(  ){
      this.tokenDecoder  = {
        exp : 0,
        iat: 0,
        roles: [],
        username: ''
        };
    }

    isTokenExpired( ): boolean {
        let expiryTime   = this.tokenDecoder.exp != null ? this.tokenDecoder.exp: 0;
        if (expiryTime) {
          return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
        } else {
          return false;
        }
      }
    
}

