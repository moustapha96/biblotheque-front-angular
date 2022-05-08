import {User} from "../user/user";
import {Categorie} from "../categorie/categorie";
import { Emprunt } from "../emprunt/emprunt";

export interface Livre {
  id: number;
  isbn: string;
  code: string;
  titre: string
  maison_edition: string;
  date_parution: Date;
  image: string;
  categorie: Categorie;
  quantite: number;
  created_at: Date;
  emprunte: number;
  emprunts: Emprunt[];
}
