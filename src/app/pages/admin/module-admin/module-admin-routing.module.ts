import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategorieIndexAdminComponent } from "../categorie/categorie-index-admin/categorie-index-admin.component";
import { CategorieEditAdminComponent } from "../categorie/categorie-edit-admin/categorie-edit-admin.component";
import { CategorieCreateAdminComponent } from "../categorie/categorie-create-admin/categorie-create-admin.component";
import LivreIndexAdminComponent from "../livre/livre-index-admin/livre-index-admin.component";
import { LivreShowAdminComponent } from "../livre/livre-show-admin/livre-show-admin.component";
import { LivreEditAdminComponent } from "../livre/livre-edit-admin/livre-edit-admin.component";
import { LivreCreateAdminComponent } from "../livre/livre-create-admin/livre-create-admin.component";
import { EmpruntIndexEtudiantComponent } from "../../etudiant/emprunt/emprunt-index-etudiant/emprunt-index-etudiant.component";
import { EmpruntIndexAdminComponent } from "../emprunt/emprunt-index-admin/emprunt-index-admin.component";
import { EmpruntShowAdminComponent } from "../emprunt/emprunt-show-admin/emprunt-show-admin.component";
import { UserIndexAdminComponent } from "../user/user-index-admin/user-index-admin.component";
import { UserShowAdminComponent } from "../user/user-show-admin/user-show-admin.component";
import { EmpruntCreateAdminComponent } from "../emprunt/emprunt-create-admin/emprunt-create-admin.component";
import { EmpruntEditAdminComponent } from "../emprunt/emprunt-edit-admin/emprunt-edit-admin.component";
import { HomeComponent } from "../home/home.component";
import { UserCreateAdminComponent } from "../user/user-create-admin/user-create-admin.component";
import { UserEditAdminComponent } from "../user/user-edit-admin/user-edit-admin.component";
import { RechercheAdminComponent } from "../recherche/recherche-admin/recherche-admin.component";
import { CatalogueComponent } from "../categorie/catalogue/catalogue.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  // les routes pour l'accueil admin
  { path: "home", component: HomeComponent },
  { path: "categorie", redirectTo: "categorie/index", pathMatch: "full" },
  { path: "categorie/index" , component: CategorieIndexAdminComponent },
  //{path: 'categorie/:categorieId/view', component: ViewComponent},
  { path: "categorie/create", component: CategorieCreateAdminComponent },
  { path: "categorie/:categorieId/edit",  component: CategorieEditAdminComponent},
  { path: "categorie/catalogue",  component: CatalogueComponent},

  //les routes pour livre
  { path: "livre", redirectTo: "livre/index", pathMatch: "full" },
  { path: "livre/index", component: LivreIndexAdminComponent },
  { path: "livre/:livreId/view", component: LivreShowAdminComponent },
  { path: "livre/create", component: LivreCreateAdminComponent },
  { path: "livre/:livreId/edit", component: LivreEditAdminComponent },

  // les routes pour emprunts
  { path: "emprunt", redirectTo: "livre/index", pathMatch: "full" },
  { path: "emprunt/index", component: EmpruntIndexAdminComponent },
  { path: "emprunt/create", component: EmpruntCreateAdminComponent },
  { path: "emprunt/:empruntId/view", component: EmpruntShowAdminComponent },
  { path: "emprunt/:empruntId/edit", component: EmpruntEditAdminComponent },

  //les routes pour users
  { path: "user", redirectTo: "user/index", pathMatch: "full" },
  { path: "user/index", component: UserIndexAdminComponent },
  { path: "user/:userId/view", component: UserShowAdminComponent },
  { path: "user/create", component: UserCreateAdminComponent },
  { path: "user/:userId/edit", component: UserEditAdminComponent },

  { path: "recherche", component: RechercheAdminComponent  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleAdminRoutingModule { }
