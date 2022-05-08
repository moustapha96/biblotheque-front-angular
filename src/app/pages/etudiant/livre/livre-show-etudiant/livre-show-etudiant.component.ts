import { Component, OnInit } from "@angular/core";
import { Livre } from "src/app/models/livre/livre";
import { LivreService } from "src/app/services/livre/livre.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-livre-show-etudiant",
  templateUrl: "./livre-show-etudiant.component.html",
  styleUrls: ["./livre-show-etudiant.component.scss"],
})
export class LivreShowEtudiantComponent implements OnInit {
  livre: any;
  constructor(
    public livreService: LivreService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      // alert(params["livreId"]);
      this.livreService.find(parseInt(params["livreId"])).subscribe(
        (livre) => {
          this.livre = livre;
        },
        (error) => {
          alert("probleme");
        }
      );
    });
  }
}
