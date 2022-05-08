import { Component, OnInit } from '@angular/core';
import { CategorieService } from "./services/categorie/categorie.service";
import { Categorie } from "./models/categorie/categorie";
import { parseJson } from "@angular/cli/utilities/json-file";
import { UserService } from "./services/user/user.service";
import { AuthenticationService } from './services/auth/authentication.service';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Gestion bibliotheque ';
  showHead: boolean = false;

  public showOverlay = true;


  constructor(public authService: AuthenticationService, private router: Router,private userService: UserService) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  ngOnInit(): void {

    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }

}
