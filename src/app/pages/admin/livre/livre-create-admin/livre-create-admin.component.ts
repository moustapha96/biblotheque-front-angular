import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CategorieService } from "../../../../services/categorie/categorie.service";
import { Router } from "@angular/router";
import { LivreService } from "../../../../services/livre/livre.service";
import { Categorie } from "../../../../models/categorie/categorie";
import { Livre } from "src/app/models/livre/livre";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-livre-create-admin",
  templateUrl: "./livre-create-admin.component.html",
  styleUrls: ["./livre-create-admin.component.scss"],
})
export class LivreCreateAdminComponent implements OnInit {
  form!: FormGroup;
  livre!: Livre;
  categorie!: Categorie;
  categories: Categorie[] = [];
  constructor(
    private livreService: LivreService,
    private router: Router,
    private categorieService: CategorieService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.categorieService.getAll().subscribe((elem) => {
      this.categories = elem;
      console.log(this.categorie);
    });
    this.form = new FormGroup({
      titre: new FormControl("", [Validators.required,Validators.minLength(3)]),
      code: new FormControl("", [Validators.required, Validators.minLength(3)]),
      isbn: new FormControl("", [Validators.required, Validators.minLength(3)]),
      quantite: new FormControl("", [Validators.required]),
      maison_edition: new FormControl("", [Validators.required]),
      date_parution: new FormControl("", [Validators.required]),
      categorie: new FormControl("", [Validators.required]),
    });
  }
  get f() {
    return this.form.controls;
  }
  
  submit() {
    console.log(this.form.value);

    this.livreService.create(this.form.value).subscribe((res: any) => {
      this.toastr.success("creation du livre effectue avec success");
      this.router.navigateByUrl("livre/index");
    }, error =>{
      this.toastr.error(error);
    });
  }
}
