import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Categorie} from "../../../../models/categorie/categorie";
import {CategorieService} from "../../../../services/categorie/categorie.service";
import {Router} from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorie-index-admin',
  templateUrl: './categorie-index-admin.component.html',
  styleUrls: ['./categorie-index-admin.component.scss']
})
export class CategorieIndexAdminComponent implements OnInit , OnDestroy{

  
  token : string | any = '' ;
  categories: Categorie[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor(private categoriesService: CategorieService, private route: Router, private toast: ToastrService) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {


     this.token = localStorage.getItem('token');
     this.categoriesService.getAll().subscribe(categories => {
       this.categories = categories;
       console.log(categories);
       this.dtTrigger.next(categories);
       
     });
  }

  deleteCategorie(id:number){
   
    this.categoriesService.delete(id).subscribe(res => {
    
      this.toast.success('categorie supprimer avec succes!!');
      let currentUrl = this.route.url;
         this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
         this.route.navigate([currentUrl]);
      });
    }, error =>{
      this.toast.error(error);
    });
  }
}
