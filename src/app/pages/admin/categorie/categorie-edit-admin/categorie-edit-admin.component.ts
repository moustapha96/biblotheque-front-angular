import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Categorie } from "../../../../models/categorie/categorie";
import { ActivatedRoute, Router } from "@angular/router";
import { CategorieService } from "../../../../services/categorie/categorie.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-categorie-edit-admin",
  templateUrl: "./categorie-edit-admin.component.html",
  styleUrls: ["./categorie-edit-admin.component.scss"],
})
export class CategorieEditAdminComponent implements OnInit {
  id!: number;
  categorie!: Categorie;
  form!: FormGroup;
  constructor(
    public categorieService: CategorieService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["categorieId"];
    this.categorieService.find(this.id).subscribe((data: Categorie) => {
      this.categorie = data;
    });

    this.form = new FormGroup({
      nom: new FormControl("", [Validators.required, Validators.minLength(3)]),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value.nom);
    this.categorieService
      .update(this.id, this.form.value.nom)
      .subscribe((res: any) => {
        console.log(res);
        this.toastr.success("modification effectue avec succes");
        this.router.navigateByUrl("categorie/index");
      });
  }
  
}
