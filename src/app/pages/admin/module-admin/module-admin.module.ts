import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ModuleAdminRoutingModule } from "./module-admin-routing.module";
import { CategorieIndexAdminComponent } from "../categorie/categorie-index-admin/categorie-index-admin.component";
import { CategorieCreateAdminComponent } from "../categorie/categorie-create-admin/categorie-create-admin.component";
import { CategorieEditAdminComponent } from "../categorie/categorie-edit-admin/categorie-edit-admin.component";
import LivreIndexAdminComponent from "../livre/livre-index-admin/livre-index-admin.component";
import { LivreCreateAdminComponent } from "../livre/livre-create-admin/livre-create-admin.component";
import { LivreShowAdminComponent } from "../livre/livre-show-admin/livre-show-admin.component";
import { LivreEditAdminComponent } from "../livre/livre-edit-admin/livre-edit-admin.component";
import { EmpruntIndexAdminComponent } from "../emprunt/emprunt-index-admin/emprunt-index-admin.component";
import { EmpruntShowAdminComponent } from "../emprunt/emprunt-show-admin/emprunt-show-admin.component";
import { UserIndexAdminComponent } from "../user/user-index-admin/user-index-admin.component";
import { UserShowAdminComponent } from "../user/user-show-admin/user-show-admin.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmpruntCreateAdminComponent } from "../emprunt/emprunt-create-admin/emprunt-create-admin.component";
import { HeaderAdminComponent } from "../header-admin/header-admin.component";
import { EmpruntEditAdminComponent } from "../emprunt/emprunt-edit-admin/emprunt-edit-admin.component";
import { HomeComponent } from "../home/home.component";
import { UserCreateAdminComponent } from "../user/user-create-admin/user-create-admin.component";
import { UserEditAdminComponent } from "../user/user-edit-admin/user-edit-admin.component";
import { RechercheAdminComponent } from "../recherche/recherche-admin/recherche-admin.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { DataTablesModule } from "angular-datatables";
import { CatalogueComponent } from "../categorie/catalogue/catalogue.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxPaginationModule } from "ngx-pagination";
import { CategorieAdminComponent } from "../categorie/categorie-admin/categorie-admin.component";


@NgModule({
  declarations: [
    CategorieIndexAdminComponent,
    CategorieCreateAdminComponent,
    CategorieEditAdminComponent,

    LivreIndexAdminComponent,
    LivreCreateAdminComponent,
    LivreShowAdminComponent,
    LivreEditAdminComponent,

    EmpruntIndexAdminComponent,
    EmpruntShowAdminComponent,
    EmpruntCreateAdminComponent,
    EmpruntEditAdminComponent,

    UserIndexAdminComponent,
    UserShowAdminComponent,
    UserCreateAdminComponent,
    UserEditAdminComponent,

    HeaderAdminComponent,
    HomeComponent,
    CatalogueComponent,
    
    CategorieAdminComponent,
    RechercheAdminComponent,
  ],
  imports: [
    CommonModule,
    ModuleAdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DataTablesModule,Ng2SmartTableModule,
    NgxPaginationModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModuleAdminModule {}
