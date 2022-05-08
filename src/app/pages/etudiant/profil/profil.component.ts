import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  email: string | any = 0;
  user!: User;
  form!: FormGroup;

  dateNaissance: string | any;
  
  constructor(private userService: UserService, private toast: ToastrService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');

    this.userService.getUserByEmail(this.email).subscribe(res => {
      this.user = res;

      this.dateNaissance = this.datePipe.transform(this.user.dateNaissance, 'yyyy-MM-dd');

      console.log(this.user);
    }, error => {
      this.toast.error(error);
    });

    this.form = new FormGroup({
      prenom: new FormControl('', [Validators.required, Validators.minLength(1)]),
      nom: new FormControl('', [Validators.required, Validators.minLength(1)]),
      dateNaissance: new FormControl('', [Validators.required]),
      lieuNaissance: new FormControl('', [Validators.required, Validators.minLength(2)]),
      adresse: new FormControl('', [Validators.required, Validators.minLength(2)]),
      sexe: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      tel: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Confirm: new FormControl('', [Validators.required, PasswordValidation.MatchPassword ])
    });

  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    console.log(this.form.value.dateNaissance);
    console.log(this.form.value);
    this.userService.update(this.user.id, this.form.value).subscribe((res) => {
      this.toast.success(' profil modifié avec  succès !!');
    }, error => {
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