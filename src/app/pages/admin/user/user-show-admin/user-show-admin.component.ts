import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-show-admin',
  templateUrl: './user-show-admin.component.html',
  styleUrls: ['./user-show-admin.component.scss']
})
export class UserShowAdminComponent implements OnInit {

  userId: string | any;
  user!: User;
  constructor(private userService: UserService, private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.userId = this.activeRoute.snapshot.paramMap.get('userId');
    this.userService.find(this.userId).subscribe(res => {
      console.log(res);
      this.user = res;
    });
  }

}
