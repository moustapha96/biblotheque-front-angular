import { Livre } from "../livre/livre";

export interface Categorie {
  id: number;
  nom: string;
  created_at: Date;
  livres: Livre[];
}
