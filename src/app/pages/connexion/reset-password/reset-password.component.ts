import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordService } from 'src/app/services/reset-pasword/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm!: FormGroup;

  constructor(private resetService: ResetPasswordService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required])
    })
  }

  get f() {
    return this.resetForm.controls;
  }

  submit(): void {
    console.log(this.resetForm.value.email);
    let email = this.resetForm.value.email;
    let body = JSON.stringify({
      'email': email,
      'uri': 'http://localhost:4200/new-password/'
    })
     
    this.resetService.sendEmailToResetPassword(body).subscribe(res =>{
          
            this.toast.success("E-mail de réinitialisation du mot de passe envoyé sur " + email);
            this.router.navigateByUrl('login');
    }, error =>{
      this.toast.error(error);
    }); 
  }
}
