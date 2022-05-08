import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmpruntService} from "../../../../services/emprunt/emprunt.service";
import {Emprunt} from "../../../../models/emprunt/emprunt";
import { Location } from '@angular/common';
@Component({
  selector: 'app-emprunt-show-admin',
  templateUrl: './emprunt-show-admin.component.html',
  styleUrls: ['./emprunt-show-admin.component.scss']
})
export class EmpruntShowAdminComponent implements OnInit {

  id!: number;
  emprunt!: Emprunt;

  constructor(
    private location : Location,
    public empruntService: EmpruntService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['empruntId'];
    console.log(this.id);
    this.empruntService.find(this.id).subscribe((data: Emprunt) => {
      console.log(data);
      this.emprunt = data;
    });

  }

  back(): void {
    this.location.back();
  }

}
