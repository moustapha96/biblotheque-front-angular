import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Categorie } from "src/app/models/categorie/categorie";
import { Emprunt } from "src/app/models/emprunt/emprunt";
import { Livre } from "src/app/models/livre/livre";
import { User } from "src/app/models/user/user";
import { CategorieService } from "src/app/services/categorie/categorie.service";
import { EmpruntService } from "src/app/services/emprunt/emprunt.service";
import { LivreService } from "src/app/services/livre/livre.service";
import { UserService } from "src/app/services/user/user.service";
import { VariablesGlobales } from "src/app/_helpers/variable.global";
declare var $: any;
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  emprunts: Emprunt[] = [];
  etudiants: User[] = [];
  livres: Livre[] = [];
  categories: Categorie[] = [];

  constructor(private userService: UserService, private empruntService: EmpruntService,
    private param : VariablesGlobales,private router: Router,
    private livreService: LivreService, private categoriesService: CategorieService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    console.log(token);
    if(token == undefined ){
      window.location.reload();
    }
    
    this.userService.getAll().subscribe(result => {
      this.etudiants = result;
      
    });
    this.livreService.getAll().subscribe(res => {
      this.livres = res;
      this.livres.forEach(element => {
        console.log(element.emprunte);
    });
    });
    this.categoriesService.getAll().subscribe(res => {
      this.categories = res;
    });
    this.empruntService.getAll().subscribe(res=>{
        this.emprunts = res;
    });
  
  }

  pourcentage(livre:number, emprunt: number){
    return (livre*100)/emprunt;
  }
}
