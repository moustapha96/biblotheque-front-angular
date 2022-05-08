import { User } from "../user/user";
import { Livre } from "../livre/livre";

export interface Emprunt {
  id: number;
  date_emprunt: Date;
  date_retour: Date;
  date_retour_reel: Date| null;
  user: User;
  livre: Livre;
  created_at: Date
}
