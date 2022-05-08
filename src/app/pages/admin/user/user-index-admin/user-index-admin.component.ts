import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
import { User } from "src/app/models/user/user";
import { ToastrService } from "ngx-toastr";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Component({
  selector: "app-user-index-admin",
  templateUrl: "./user-index-admin.component.html",
  styleUrls: ["./user-index-admin.component.scss"],
})
export class UserIndexAdminComponent implements OnInit, OnDestroy {
  users: User[] = [];
  etudiant: User[] = [];
  etudiantId!: number;
  form!: FormGroup;
  
  dtOptions: DataTables.Settings = {
    ordering: false,
    columnDefs: [
      { targets: 'no-sort', orderable: false }
    ]
  }
  dtTrigger: Subject<any> = new Subject<any>();
 
  constructor(private userService: UserService, public toast: ToastrService, public router: Router) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }




  ngOnInit(): void {
    this.userService.getAll().subscribe((el) => {
      this.users = el;
      this.users.forEach(user => {
        if (user.roles[0] == 'ROLE_USER'){
          this.etudiant.push(user);
        }
      });

      this.users = this.etudiant;
      console.log(this.users);
      this.dtTrigger.next(this.users);
    });
    
  }

  block(){
    this.userService.block(this.etudiantId).subscribe((user: User)=>{
      console.log(user);
      this.toast.success("etudiant blocker avec success!!!");
      
      let currentUrl = this.router.url;
     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
     });

      
  });
  }

   unblock(){
    this.userService.unblock(this.etudiantId).subscribe((user: User)=>{
      console.log(user);
      this.toast.success("etudiant deblocker avec success!!!");
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
         this.router.navigate([currentUrl]);
      });
      });

  }
  
  enclencher(id: number){
   
      this.etudiantId = id;
      console.log(this.etudiantId);
  }

}
