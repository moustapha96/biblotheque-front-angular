import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livre } from 'src/app/models/livre/livre';
import { LivreService } from '../../../../services/livre/livre.service';

@Component({
  selector: 'app-livre-show-admin',
  templateUrl: './livre-show-admin.component.html',
  styleUrls: ['./livre-show-admin.component.scss']
})
export class LivreShowAdminComponent implements OnInit {

  livre!: Livre;
  id!: number;

  constructor(public livreService: LivreService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['livreId'];
    this.livreService.find(this.id).subscribe((res) => {
      this.livre = res;
    });

  }

}
