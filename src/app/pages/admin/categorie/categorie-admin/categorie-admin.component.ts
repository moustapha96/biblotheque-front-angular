import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Categorie } from 'src/app/models/categorie/categorie';
import { CategorieService } from 'src/app/services/categorie/categorie.service';

@Component({
  selector: 'app-categorie-admin',
  templateUrl: './categorie-admin.component.html',
  styleUrls: ['./categorie-admin.component.scss']
})
export class CategorieAdminComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  
  categories: Categorie[] = [];
  constructor(private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.categorieService.getAll().subscribe(cate =>{
        this.categories = cate;
        this.categories.forEach(category=>{
          this.dtTrigger.next(category.livres);
        });
       
    });
  }
}
