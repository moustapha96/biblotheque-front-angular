import { Component, OnDestroy, OnInit } from "@angular/core";
import { Categorie } from "../../../../models/categorie/categorie";
import { CategorieService } from "../../../../services/categorie/categorie.service";
import { Router } from "@angular/router";
import { EmpruntService } from "../../../../services/emprunt/emprunt.service";
import { Emprunt } from "../../../../models/emprunt/emprunt";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-emprunt-index-admin",
  templateUrl: "./emprunt-index-admin.component.html",
  styleUrls: ["./emprunt-index-admin.component.scss"],
})
export class EmpruntIndexAdminComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  id!: number;
  dateMin = new Date().toISOString().slice(0, 10);
  form!: FormGroup;
  dateRetour: string = '';
  

  emprunts: Emprunt[] = [];
  constructor(private empruntService: EmpruntService, private route: Router, public toast: ToastrService) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  ngOnInit(): void {
    this.empruntService.getAll().subscribe((empr: Emprunt[]) => {
      this.emprunts = empr;
      console.log(this.emprunts);
      
      this.dtTrigger.next(this.emprunts);
    });
  }

  deleteEmprunt(id: number) {
    this.empruntService.delete(id).subscribe((res) => {
      
      this.toast.success('livre rendu avec succee');
        let currentUrl = this.route.url;
         this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
         this.route.navigate([currentUrl]);
      });
    }, error =>{
      this.toast.error(error);
    });
  }

  annulerEmprunt(id: number){
    this.empruntService.annuler(id).subscribe((res) => {
      
      this.toast.success('emprunt annule avec succee');
        let currentUrl = this.route.url;
         this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
         this.route.navigate([currentUrl]);
      });
    }, error =>{
      this.toast.error(error);
    });
  }


  empruntEnclencher(id: number) {
    this.id = id;
  }

  onChangeDateValue(event: any) {
    console.log(event.target.value);
    this.dateRetour = event.target.value;
    console.log(this.dateRetour);

  }

  submit() {
    let body = JSON.stringify({
      "date_retour_reel": this.dateRetour
    });
    this.empruntService.rendrelivre(this.id,body).subscribe(
      (res: any) => {
        console.log(res);
        this.toast.success('livre rendu avec succee');
        let currentUrl = this.route.url;
         this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
         this.route.navigate([currentUrl]);
      });
      },error =>{
        this.toast.error(error);
      });
  }



}
