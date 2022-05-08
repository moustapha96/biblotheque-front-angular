import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Emprunt } from 'src/app/models/emprunt/emprunt';
import { Livre } from 'src/app/models/livre/livre';
import { User } from 'src/app/models/user/user';
import { EmpruntService } from 'src/app/services/emprunt/emprunt.service';
import { LivreService } from 'src/app/services/livre/livre.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-emprunt-edit-admin',
  templateUrl: './emprunt-edit-admin.component.html',
  styleUrls: ['./emprunt-edit-admin.component.scss']
})
export class EmpruntEditAdminComponent implements OnInit {

  id!: number;
  emprunt!: Emprunt;
  form!: FormGroup;
  dateMin = new Date().toISOString().slice(0, 10);
  livres!: Livre[];
  users!: User[];
  etudiants: User[]= [];

  livreId: number| any;
  userId: number| any;

  livreDispo: Livre[] = [];

  dateRetour: string | any;
  constructor(
    public empruntService: EmpruntService,
    private route: ActivatedRoute,
    private userService: UserService,
    private livreService: LivreService,
    private router: Router,
    private toast: ToastrService,
    private datePipe: DatePipe
  ) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['empruntId'];
    console.log(this.id);
    this.empruntService.find(this.id).subscribe((data: Emprunt) => {
      this.emprunt = data;
      console.log(this.emprunt);
      this.userId = this.emprunt.user.id;
      this.livreId = this.emprunt.livre.id;

      this.dateRetour = this.datePipe.transform(this.emprunt.date_retour, "yyyy-MM-dd");
      console.log(this.dateRetour);
      
    }, error => {
      this.toast.error(error);
    });

    this.userService.getAll().subscribe((us: User[]) => {
      this.users = us;
      this.users.forEach(user => {
          if (user.roles[0] == 'ROLE_USER'){
            this.etudiants.push(user);
          }
      });
      this.users = this.etudiants;
    }, error => {
      this.toast.error(error);
    });
    this.livreService.getAll().subscribe((livres: Livre[]) => {
      this.livres = livres;
        this.livres.forEach(livre => {
          if (livre.quantite > livre.emprunte){
            this.livreDispo.push(livre);
          }
      });
      this.livres = this.livreDispo;
      console.log(this.livres);

    }, error => {
      this.toast.error(error);
    });

    if (this.id) {
      this.empruntService.find(this.id).subscribe((res: Emprunt) => {
        this.emprunt = res;

      });
    }

    this.form = new FormGroup({
      user: new FormControl('', [Validators.required]),
      livre: new FormControl('', [Validators.required]),
      date_retour: new FormControl('', [Validators.required, Validators.minLength(3)]),

    });
  }

  get f() {
    return this.form.controls;
  }

  onChangeL(event:any){
    let liv = this.livres.find( livre => livre.titre == event.target.value );
    this.livreId =  liv?.id == undefined ? 0: liv.id;
    console.log( this.livreId) ;
}
onChangeU(event:any){
  let usr = this.users.find( user => user.email == event.target.value );
  this.userId =  usr?.id == undefined ? 0: usr.id;
  console.log( this.userId) ;
}

  submit() {

    console.log(this.form.value);
    this.form.controls['user'].setValue(this.userId);
    this.form.controls['livre'].setValue(this.livreId);
    
    let u = this.form.value.user;
    let l = this.form.value.livre;
    let d = this.form.value.date_retour;

    console.log(this.emprunt);

    let body = JSON.stringify({
      'date_retour': d,
      'user': u,
      'livre': l,
    });
    console.log(body);

    this.empruntService.update(this.emprunt.id, body).subscribe((res: any) => {
      this.toast.success('emprunt modify successfully!');
      this.router.navigateByUrl('emprunt/index');
    }, error => {
      this.toast.error(error);
    });

  }

}
