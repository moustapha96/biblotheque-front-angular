import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordService } from 'src/app/services/reset-pasword/reset-password.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  resetForm!: FormGroup;
  token: string = '';
  constructor(private resetService: ResetPasswordService, 
    private activatedRoute: ActivatedRoute,private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
    console.log(this.token);
    this.resetForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Confirm: new FormControl('', [Validators.required, PasswordValidation.MatchPassword ])
    })
  }

  get f() {
    return this.resetForm.controls;
  }

  submit(): void {
    console.log(this.resetForm.value);
    let password = this.resetForm.value.password;
    let body = JSON.stringify({
      'password': password,
      'token': this.token
    })
     
    this.resetService.sendResetPassword(body).subscribe(res =>{
      this.toast.success("mot de passe enregistrer avec succes ");
      this.router.navigateByUrl('/login');
    }, error =>{
      this.toast.error(error);
    }); 
  }

}

export class PasswordValidation {

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