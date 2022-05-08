import { Component, OnInit } from '@angular/core';
import { Emprunt } from 'src/app/models/emprunt/emprunt';
import { ActivatedRoute } from '@angular/router';
import { EmpruntService } from '../../../../services/emprunt/emprunt.service';

@Component({
  selector: 'app-emprunt-show-etudiant',
  templateUrl: './emprunt-show-etudiant.component.html',
  styleUrls: ['./emprunt-show-etudiant.component.scss']
})
export class EmpruntShowEtudiantComponent implements OnInit {


  id!: number;
  emprunt!: Emprunt;
  constructor(private route: ActivatedRoute, private empruntService: EmpruntService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['empruntId'];
    console.log(this.id);
    this.empruntService.find(this.id).subscribe((data: Emprunt) => {
      console.log(data);
      this.emprunt = data;
    });

  }

  //fonction rendre livre
  // rendreLivre(id: number) {
  //   this.empruntService.rendrelivre(id).subscribe((res) => {
  //     alert(res);

  //   });
  // }

}
