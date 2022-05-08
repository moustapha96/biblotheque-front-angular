import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  form!: FormGroup;
  constructor(private userService:UserService, private toast: ToastrService,private router:Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      prenom: new FormControl('', [Validators.required, Validators.minLength(3)]),
      nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
      dateNaissance: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lieuNaissance: new FormControl('', [Validators.required, Validators.minLength(3)]),
      adresse: new FormControl('', [Validators.required, Validators.minLength(3)]),
      sexe: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
      tel: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Confirm: new FormControl('', [Validators.required, PasswordValidation.MatchPassword ])
      })
  }

  get f(){
    return this.form.controls;
  }

  onSubmit(): void {
    console.log(this.form.value);
    
    this.userService.register(this.form.value).subscribe((res) => {
      this.toast.success(' étudiant ajouté avec  succès !!');
      this.router.navigateByUrl('login');
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