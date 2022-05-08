import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleEtudiantRoutingModule } from './module-etudiant-routing.module';
import { LivreShowEtudiantComponent } from '../livre/livre-show-etudiant/livre-show-etudiant.component';
import { LivreIndexEtudiantComponent } from '../livre/livre-index-etudiant/livre-index-etudiant.component';
import { EmpruntIndexEtudiantComponent } from '../emprunt/emprunt-index-etudiant/emprunt-index-etudiant.component';
import { EmpruntShowEtudiantComponent } from '../emprunt/emprunt-show-etudiant/emprunt-show-etudiant.component';
import { HeaderUserComponent } from '../header-user/header-user.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ProfilComponent } from '../profil/profil.component';
import { DataTablesModule } from 'angular-datatables';
import { RechercheEtudiantComponent } from '../recherche/recherche-etudiant/recherche-etudiant.component';

@NgModule({
  declarations: [
    LivreIndexEtudiantComponent,
    LivreShowEtudiantComponent,
    EmpruntIndexEtudiantComponent,
    EmpruntShowEtudiantComponent,
    ProfilComponent,
    HeaderUserComponent,
    RechercheEtudiantComponent,
  ],
  imports: [
    CommonModule,
    ModuleEtudiantRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModuleEtudiantModule { }
