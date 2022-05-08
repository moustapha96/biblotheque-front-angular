import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Ng2SmartTableModule } from 'ng2-smart-table';


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./pages/template/footer/footer.component";
import { ModuleAdminModule } from "./pages/admin/module-admin/module-admin.module";
import { HttpClientModule } from "@angular/common/http";
import { ModuleEtudiantModule } from "./pages/etudiant/module-etudiant/module-etudiant.module";
import { APP_BASE_HREF, DatePipe } from "@angular/common";
import { LoginComponent } from "./pages/connexion/login/login.component";
import { InscriptionComponent } from "./pages/connexion/inscription/inscription.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthGuardGuard } from "./service/guard/auth-guard.guard";
import { AuthenticationService } from "./services/auth/authentication.service";
import { EmpruntCreateAdminComponent } from "./pages/admin/emprunt/emprunt-create-admin/emprunt-create-admin.component";
import { HeaderAdminComponent } from "./pages/admin/header-admin/header-admin.component";
import { HeaderUserComponent } from "./pages/etudiant/header-user/header-user.component";
import { EmpruntEditAdminComponent } from "./pages/admin/emprunt/emprunt-edit-admin/emprunt-edit-admin.component";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RechercheEtudiantComponent } from './pages/etudiant/recherche/recherche-etudiant/recherche-etudiant.component';
import { LoadingScreenComponent } from './pages/loading-screen/loading-screen.component';
import { LoadingScreenInterceptor } from "./services/loading-screen/loading.interceptor";
import { CatalogueComponent } from './pages/admin/categorie/catalogue/catalogue.component';
import { ResetPasswordComponent } from './pages/connexion/reset-password/reset-password.component';
import { NewPasswordComponent } from './pages/connexion/new-password/new-password.component';
import { CanDesactivateGuardService } from "./service/can-deactivate-guard/can-desactivate-guard.service";
import { VariablesGlobales } from "./_helpers/variable.global";
import jwtDecode from "jwt-decode";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { CategorieAdminComponent } from './pages/admin/categorie/categorie-admin/categorie-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    InscriptionComponent,
    LoadingScreenComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModuleAdminModule,
    HttpClientModule,
    ModuleEtudiantModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    ToastrModule.forRoot(),
    RouterModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  
  ],
  providers: [AuthGuardGuard, AuthenticationService, DatePipe,CanDesactivateGuardService,VariablesGlobales,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true
    },
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
   
  ],
  // providers: [{provide: APP_BASE_HREF, useValue: '/assets/'}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
