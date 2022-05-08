import { Component, OnInit, ViewChild } from "@angular/core";
import { Livre } from "src/app/models/livre/livre";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LivreService } from "src/app/services/livre/livre.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Categorie } from "src/app/models/categorie/categorie";
import { CategorieService } from "src/app/services/categorie/categorie.service";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
@Component({
  selector: "app-livre-edit-admin",
  templateUrl: "./livre-edit-admin.component.html",
  styleUrls: ["./livre-edit-admin.component.scss"],
})
export class LivreEditAdminComponent implements OnInit {
  id: number | any;
  livre!: Livre;
  form!: FormGroup;
  categorie!: Categorie;
  categories: Categorie[] = [];
  categoriId!: number;
  dateParution: string| any;



  constructor(
    private livreService: LivreService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categorieService: CategorieService,
    private toast: ToastrService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('livreId');
    console.log(this.id);

    this.livreService.find(this.id).subscribe(data => {
      console.log(data.categorie.id);
      this.livre = data;
      this.dateParution = this.datePipe.transform(this.livre.date_parution, 'yyyy-MM-dd');
      this.categoriId = this.livre.categorie.id;
    }, error =>{
      this.toast.error(error);
    });

    this.categorieService.getAll().subscribe((elem) => {
      this.categories = elem;
    }, error =>{
      this.toast.error(error);
    });

    this.form = new FormGroup({
      titre: new FormControl("", [Validators.required, Validators.minLength(3)]),
      code: new FormControl("", [Validators.required, Validators.minLength(3)]),
      isbn: new FormControl("", [Validators.required, Validators.minLength(3)]),
      quantite: new FormControl("", [Validators.required]),
      maison_edition: new FormControl("", [Validators.required]),
      date_parution: new FormControl("", [Validators.required]),
      categorie: new FormControl("", [Validators.required]),
    });
   
  }


  getSelectedD(lic: number,cid: number){
    console.log(lic);
    return lic == cid ? 'selected': '';
  }


  get f() {
    return this.form.controls;
  }


  onChange(event:any){
        let cat = this.categories.find( category => category.nom == event.target.value );
        this.categoriId =  cat?.id == undefined ? 0: cat.id;
        console.log( this.categoriId) ;
    }

  submit() {
    console.log(this.form.value);
    this.form.controls['categorie'].setValue(this.categoriId);
    
    console.log(this.form.value);
    this.livreService
      .update(this.id, this.form.value)
      .subscribe((res: any) => {
        console.log(res);
        this.toast.success(' modification enregistrer avec succès !!');
        this.router.navigateByUrl("livre/index");
      }, error =>{
        this.toast.error(error);
      }
      );
  }
}
