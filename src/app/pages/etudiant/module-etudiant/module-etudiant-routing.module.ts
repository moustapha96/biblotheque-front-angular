import { EmpruntShowEtudiantComponent } from "./../emprunt/emprunt-show-etudiant/emprunt-show-etudiant.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LivreIndexEtudiantComponent } from "../livre/livre-index-etudiant/livre-index-etudiant.component";
import { LivreShowEtudiantComponent } from "../livre/livre-show-etudiant/livre-show-etudiant.component";
import { EmpruntIndexEtudiantComponent } from "../emprunt/emprunt-index-etudiant/emprunt-index-etudiant.component";
import { ProfilComponent } from "../profil/profil.component";

const routes: Routes = [
  //les routes pour livre
  { path: "", redirectTo: "livre/index", pathMatch: "full" },
  { path: "livre/index", component: LivreIndexEtudiantComponent },
  { path: "livre/:livreId/view", component: LivreShowEtudiantComponent },

  // les routes pour emprunts
  { path: "emprunt", redirectTo: "livre/index", pathMatch: "full" },
  { path: "emprunt/index", component: EmpruntIndexEtudiantComponent },
  { path: "emprunt/:empruntId/view", component: EmpruntShowEtudiantComponent },

  { path: "profil", component: ProfilComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleEtudiantRoutingModule {}
