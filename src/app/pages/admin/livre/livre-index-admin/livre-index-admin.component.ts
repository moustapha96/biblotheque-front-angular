import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LivreService } from "../../../../services/livre/livre.service";
import { Livre } from "../../../../models/livre/livre";
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { LocalDataSource } from "ng2-smart-table";
import { ThisReceiver } from "@angular/compiler";
import { FormControl, FormGroup } from "@angular/forms";
import { LoadingScreenService } from "src/app/services/loading-screen/loading-screen.service";

@Component({
  selector: "app-livre-index-admin",
  templateUrl: "./livre-index-admin.component.html",
  styleUrls: ["./livre-index-admin.component.scss"],
})
export default class LivreIndexAdminComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  form!: FormGroup;
  livres: Livre[] = [];
  config: any;

  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: '<--',
      nextLabel: '-->',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  
  settings = {
    pager: {
      display: true,
      perPage: 5,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,

      custom: [
        {
          name: 'view',
          title: ' <a class="btn btn-outline-dark btn-sm"> <i class="fa fa-eye " title="show"></i>  </a>'
        },
        {
          name: 'edit',
          title: '  <a class="btn btn-outline-info btn-sm"> <i class="fa fa-edit "></i>  </a> '
        },
        {
          name: 'delete',
          title: '<a class="btn btn-outline-danger btn-sm"> <i class="fa fa-trash" title="delete"></i>  </a>'
        }
      ],
      position: 'right'
    },
    columns: {
      code: {
        title: 'CODE'
      },
      isbn: {
        title: 'ISBN'
      },
      titre: {
        title: 'TITRE'
      },
      maison_edition: {
        title: 'MAISON EDITION'
      },
      quantite: {
        title: 'QUANTITE', filter: false
      },
      emprunte: {
        title: 'EMPRUNTE', filter: false
      }

    }
  };
  constructor(
    private loadingScreenService: LoadingScreenService,
    private livresService: LivreService,
    private route: Router,
    public authService: AuthenticationService,
    private toastr: ToastrService, private router: Router
  ) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.livres.length
    };
  }
  pageChanged(event: any){
    this.config.currentPage = event;
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      isbn: new FormControl('') ,
      code: new FormControl(''),
      maison_edition: new FormControl(''),
      titre: new FormControl(''),
    });

    
    this.livresService.getAll().subscribe((cate: Livre[]) => {
      this.livres = cate;
      console.log(this.livres);
      this.livres.forEach(li => {
        console.log(li.emprunts);
      });
      this.dtTrigger.next(this.livres);
    });
  }

  onCustom(event: any) {

    if (event.action == 'view') {
      this.router.navigate(['/admin/livre/' + event.data.id + '/view']);
    } else if (event.action == 'edit') {
      this.router.navigate(['/admin/livre/' + event.data.id + '/edit']);
    } else if (event.action == 'delete') {
      if (event.data.emprunte > 0) {
       this.toastr.warning('impossible de supprimé un livre emprunté ');
      } else {
        this.deleteLivre(event.data.id);

      }
    }
  }


  deleteLivre(id: number) {
    this.livresService.delete(id).subscribe(
      (res) => {
        this.livres = this.livres.filter((item) => item.id !== id);
        this.toastr.success("Votre suppression a ete effectue avec succes");
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
  get f(){
    return this.form.controls;
  }

  async onSubmit() {

    this.loadingScreenService.startLoading();
    await this.delay(1000);
    this.loadingScreenService.stopLoading();
 
    let body = {
      'code': this.form.value.code,
      'titre': this.form.value.titre,
      'isbn': this.form.value.isbn,
      'maison_edition': this.form.value.maison_edition
    }
    console.log(this.form.value);
    this.livres = [];
    this.livresService.searchCritere(body).subscribe((res: Livre[]) =>{
        this.livres = res;
        console.log(res);
    },  error =>{
          this.toastr.error(error);
      }
    );
   
  }

  

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
