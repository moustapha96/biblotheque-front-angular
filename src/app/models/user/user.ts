import { Livre } from "../livre/livre";
import { Emprunt } from '../emprunt/emprunt';

export interface User {
  id: number;
  prenom: string;
  nom: string;
  adresse: string;
  tel: string;
  sexe: string;
  lieuNaissance: string;
  email: string;
  password: string;
  dateNaissance: Date;
  avatar: string;
  roles: string[];
  active: boolean;
  emprunts: Emprunt[];
  code: string;
}
