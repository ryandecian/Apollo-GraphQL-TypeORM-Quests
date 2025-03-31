//src/types/cartoon.type.ts
import { Personnage } from "./personnage.type";

export type CartoonType = {
  id: number;
  name: string;
  description: string;
  nb_of_episodes: number;
  nb_of_seasons: number;
  genres: string[];
  realisator: string;
  author: string;
  ft_diffusion: string;
  personnages: Personnage[];
};