import { Emprunt } from './../../../../models/emprunt/emprunt';
import { Component, OnInit } from '@angular/core';
import { EmpruntService } from 'src/app/services/emprunt/emprunt.service';
import { LivreService } from 'src/app/services/livre/livre.service';
import { UserService } from '../../../../services/user/user.service';
import { Router } from '@angular/router';
import { Livre } from 'src/app/models/livre/livre';
import { User } from 'src/app/models/user/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emprunt-create-admin',
  templateUrl: './emprunt-create-admin.component.html',
  styleUrls: ['./emprunt-create-admin.component.scss']
})
export class EmpruntCreateAdminComponent implements OnInit {

  livres: Livre[] = [];
  users: User[] = [];
  emprunt!: Emprunt;
  etudiants: User[] = [];
  livreLibre: Livre[]= [];
  dateMin = new Date().toISOString().slice(0, 10);

  form!: FormGroup;
  constructor(public empruntService: EmpruntService,public livreService : LivreService ,
              public userService: UserService, public router:Router, private toast: ToastrService ) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe((users: User[])=>{
      this.users = users;
      this.users.forEach(user => {
        if (user.roles[0] == 'ROLE_USER' && user.active == true){
          this.etudiants.push(user);
        }
    });
    this.users = this.etudiants;
      console.log(users);
    }, error =>{
      this.toast.error(error);
    });
    this.livreService.getAll().subscribe((livres: Livre[])=>{
      this.livres = livres;
      this.livres.forEach(li => {
        if (li.emprunte < li.quantite){
          this.livreLibre.push(li);
        }
    });
    this.livres = this.livreLibre;
      console.log(livres);
    }, error =>{
      this.toast.error(error);
    });

    this.form = new FormGroup({
      user: new FormControl('', [Validators.required]),
      livre: new FormControl('', [Validators.required ]),
      date_retour: new FormControl('', [Validators.required, Validators.minLength(3)]),

    });
  }

  get f(){
    return this.form.controls;
  }
  submit(){
   console.log(this.form.value);
   let u = this.form.value.user;
   let l = this.form.value.livre;
   let d = this.form.value.date_retour;

  let body = JSON.stringify({
    'date_retour': d,
    'user': u,
    'livre': l,
   });

    this.empruntService.create(body).subscribe((res:any) => {
      this.toast.success('emprunt created successfully!');
      this.router.navigateByUrl('emprunt/index');
    }, (error) => {
      this.toast.error(" cet etudiant a  deja emprunté ce livre");
    });

  }
}
