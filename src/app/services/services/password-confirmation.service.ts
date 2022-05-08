import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { User } from 'src/app/models/user/user';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordConfirmationService {

  user!: User;

  constructor(private userService: UserService) { }

  static MatchPassword(AC: AbstractControl) {
    const formGroup = AC.parent;
    if (formGroup) {
         const passwordControl = formGroup.get('password'); // to get value in input tag
         const confirmPasswordControl = formGroup.get('Confirm'); // to get value in input tag

         if (passwordControl && confirmPasswordControl) {
             const password = passwordControl.value;
             const confirmPassword = confirmPasswordControl.value;
             if (password !== confirmPassword) { 
                 return { matchPassword: true };
             } else {
                 return null;
             }
         }
    }

    return null;
 }

}
