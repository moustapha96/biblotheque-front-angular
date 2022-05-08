import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user/user";
import { Location } from '@angular/common';
import { UserService } from "src/app/services/user/user.service";
import { AuthenticationService } from "src/app/services/auth/authentication.service";
declare var $: any;
@Component({
  selector: "app-header-admin",
  templateUrl: "./header-admin.component.html",
  styleUrls: ["./header-admin.component.scss"],
})
export class HeaderAdminComponent implements OnInit {

  user!: User;
   email = localStorage.getItem('email') ;
  constructor(public userService: UserService, private location: Location , private authService: AuthenticationService ) { }

  ngOnInit(): void {
      
      this.userService.getUserByEmail(this.email).subscribe(res => {
        
         this.user = res;
         console.log(this.user)
      });
  }

  back(){
    return this.location.back();
  }
  logout(){
    this.authService.logout();
  }
}
