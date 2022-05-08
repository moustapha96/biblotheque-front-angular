import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { Component, OnInit } from "@angular/core";
import { EmpruntService } from "../../../../services/emprunt/emprunt.service";
import { Router } from "@angular/router";
import { Emprunt } from "src/app/models/emprunt/emprunt";
import { User } from "src/app/models/user/user";

@Component({
  selector: "app-emprunt-index-etudiant",
  templateUrl: "./emprunt-index-etudiant.component.html",
  styleUrls: ["./emprunt-index-etudiant.component.scss"],
})
export class EmpruntIndexEtudiantComponent implements OnInit {
  user!: User;
  email!: string | any;
  emprunts: Emprunt[] = [];
  constructor(
    private authService: AuthenticationService,
    private empruntService: EmpruntService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.email = localStorage.getItem("email");
    this.empruntService
      .getUserByEmail(this.email)
      .subscribe((res) => {
        this.user = res;
        this.empruntService
          .findUserEmprunt(this.user.id)
          .subscribe((res: Emprunt[]) => {
            this.emprunts = res;
          });
      });
  }

  
}
