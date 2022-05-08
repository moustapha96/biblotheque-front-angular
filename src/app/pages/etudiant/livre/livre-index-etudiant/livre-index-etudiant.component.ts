import { Component, OnDestroy, OnInit } from "@angular/core";
import { Livre } from "src/app/models/livre/livre";
import { LivreService } from "../../../../services/livre/livre.service";
import { NavigationEnd, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "src/app/models/user/user";
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { EmpruntService } from "src/app/services/emprunt/emprunt.service";
import { ToastrService } from "ngx-toastr";
import { Location } from "@angular/common";
import { Subject } from "rxjs";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: "app-livre-index-etudiant",
  templateUrl: "./livre-index-etudiant.component.html",
  styleUrls: ["./livre-index-etudiant.component.scss"],
})
export class LivreIndexEtudiantComponent implements OnInit , OnDestroy{
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  
  livres: Livre[] = [];
  user!: User;

  id!: number;
  dateMin = new Date().toISOString().slice(0, 10);
  form!: FormGroup;

  formSearch!: FormGroup;

  dateRetour: string = '';

  constructor(
    public livreService: LivreService,
    private authService: AuthenticationService,
    private empruntService: EmpruntService,
    public router: Router,
    private toastr: ToastrService,
    private location: Location,
    private userService:UserService
  ) { 

     
  }

  ngOnInit(): void {
    
    let token = localStorage.getItem('token');
     console.log(token);
     if(token == undefined ){
       window.location.reload();
     }

    
    this.form = new FormGroup({
      date_retour: new FormControl('', [Validators.required]),

    });

    this.formSearch = new FormGroup({
      isbn: new FormControl('')
    });
    this.empruntService
      .getUserByEmail(localStorage.getItem("email")!)
      .subscribe((res) => {
        this.user = res;
      });
    this.livreService.getAll().subscribe((el) => {
      this.livres = el;
      this.dtTrigger.next(this.livres);
    });


    this.user = this.authService.user;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  get fS() {
    return this.formSearch.controls;
  }

  onChangeDateValue(event: any) {
    console.log(event.target.value);
    this.dateRetour = event.target.value;
    console.log(this.dateRetour);

  }
  onSubmit() {
    console.log(this.formSearch.value);
    this.livres = [];
    this.livreService.search(this.formSearch.value).subscribe((res: Livre[]) => {
      this.livres = res;
      console.log(res);
    }, error => {
      this.toastr.error(error);
    }
    );
  }

  get f() {
    return this.form.controls;
  }
  getId() {
    return this.id;
  }


  empruntEnclencher(id: number) {
    this.id = id;
  }
  

  submit() {

    console.log(this.dateRetour);

    let d = this.form.value.date_retour;
    let body = JSON.stringify({
      'date_retour': this.dateRetour,
      user: this.user.id,
      livre: this.id,
    });
    console.log(body);
    this.empruntService.create(body).subscribe(
      (res: any) => {
        this.toastr.success("Votre emprunt a ete effectue avec succes");
        this.router.navigateByUrl("/etudiant/emprunt/index");
      },
      (error) => {
        this.toastr.error("Vous avez deja emprunté ce livre");
      }
    );

  }
}
