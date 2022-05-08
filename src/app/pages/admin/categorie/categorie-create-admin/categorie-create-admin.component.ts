import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CategorieService } from "../../../../services/categorie/categorie.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-categorie-create-admin",
  templateUrl: "./categorie-create-admin.component.html",
  styleUrls: ["./categorie-create-admin.component.scss"],
})
export class CategorieCreateAdminComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private categoriesService: CategorieService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      nom: new FormControl("", [Validators.required, Validators.minLength(3)]),
    });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.value.nom);
    this.categoriesService.create(this.form.value.nom).subscribe(
      (res: any) => {
        this.toastr.success("Categorie ajoutee avec succes ");
        this.router.navigateByUrl("admin/categorie/index");
      },
      (error) => {
        this.toastr.error("Categorie deja ajoutee");
      }
    );
  }

}
