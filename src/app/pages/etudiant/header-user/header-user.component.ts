import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Livre } from 'src/app/models/livre/livre';
import { User } from 'src/app/models/user/user';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { LivreService } from 'src/app/services/livre/livre.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss']
})
export class HeaderUserComponent implements OnInit {

  user!: User;
   email = localStorage.getItem('email') ;
   formSearch!: FormGroup;
   livres: Livre[]= [];

  constructor(public userService: UserService,private livreService: LivreService, 
        private authService: AuthenticationService,private toast: ToastrService) { }

  ngOnInit(): void {
      
      this.userService.getUserByEmail(this.email).subscribe(res => {
         this.user = res;
         console.log(this.user)
      });
      this.formSearch = new FormGroup({
        isbn: new FormControl('')
      });
  }
  
  onSubmit() {
    console.log(this.formSearch.value);
    this.livres = [];
    this.livreService.search(this.formSearch.value).subscribe((res: Livre[]) => {
      this.livres = res;
      console.log(res);
    }, error => {
      this.toast.error(error);
    }
    );
  }


  logout(){
    this.authService.logout();
  }
}
