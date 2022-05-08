import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { DatePipe, Location } from '@angular/common';

@Component({

  selector: 'app-user-edit-admin',
  templateUrl: './user-edit-admin.component.html',
  styleUrls: ['./user-edit-admin.component.scss']
})
export class UserEditAdminComponent implements OnInit {

  userId: number | any = 0;
  user!: User;
  form!: FormGroup;

  dateNaissance: string | any;

  constructor(public userService: UserService, public toast: ToastrService, 
        private datePipe: DatePipe,
      private _location: Location, public activeRoute: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.userId = this.activeRoute.snapshot.paramMap.get('userId');
    console.log(this.userId);

    this.userService.find(this.userId).subscribe(res => {
      this.user = res;
      console.log(this.user);
      this.dateNaissance = this.datePipe.transform(this.user.dateNaissance, "yyyy-MM-dd");
    }, error => {
      this.toast.error(error);
    });

    this.form = new FormGroup({
      prenom: new FormControl('', [Validators.required, Validators.minLength(1)]),
      nom: new FormControl('', [Validators.required, Validators.minLength(1)]),
      dateNaissance: new FormControl('', [Validators.required]),
      lieuNaissance: new FormControl('', [Validators.required, Validators.minLength(1)]),
      adresse: new FormControl('', [Validators.required, Validators.minLength(1)]),
      sexe: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
      tel: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [ Validators.minLength(5)]),
      Confirm: new FormControl('', [ PasswordValidation.MatchPassword ])
    });

  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    console.log(this.form.value);

    this.userService.update(this.userId, this.form.value).subscribe((res) => {
      this.toast.success(' étudiant modifié avec  succès !!');
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