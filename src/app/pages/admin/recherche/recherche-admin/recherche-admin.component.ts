import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Livre } from 'src/app/models/livre/livre';
import { LivreService } from 'src/app/services/livre/livre.service';

@Component({
  selector: 'app-recherche-admin',
  templateUrl: './recherche-admin.component.html',
  styleUrls: ['./recherche-admin.component.scss']
})
export class RechercheAdminComponent implements OnInit {

  form!: FormGroup;

  livres: Livre[] = [];
  
  constructor(private livreService: LivreService,private toast: ToastrService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      isbn: new FormControl('') 
    });
  }

  get f(){
    return this.form.controls;
  }


  onSubmit() {
    this.livres = [];
    this.livreService.search(this.form.value).subscribe((res: Livre[]) =>{
        this.livres = res;
        console.log(res);
    },  error =>{
          this.toast.error(error);
      }
    );
  }
}
