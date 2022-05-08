import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {InscriptionComponent} from "./pages/connexion/inscription/inscription.component";
import {LoginComponent} from "./pages/connexion/login/login.component";
import { NewPasswordComponent } from './pages/connexion/new-password/new-password.component';
import { ResetPasswordComponent } from './pages/connexion/reset-password/reset-password.component';
import { CanDesactivateGuardService } from './service/can-deactivate-guard/can-desactivate-guard.service';
import { AuthGuardGuard } from './service/guard/auth-guard.guard';


const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent },
  {path: 'inscription', component: InscriptionComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'new-password/:token', component: NewPasswordComponent },

  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/module-admin/module-admin.module').then(
        (m) => m.ModuleAdminModule
      ),canActivate : [AuthGuardGuard]
  },
  {
    path: 'etudiant',
    loadChildren: () =>
      import('./pages/etudiant/module-etudiant/module-etudiant.module').then(
        (m) => m.ModuleEtudiantModule
      ),canActivate : [AuthGuardGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
