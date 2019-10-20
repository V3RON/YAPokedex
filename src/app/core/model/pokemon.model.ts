import { PokemonStat } from './pokemon-stat.model';

export interface Pokemon {
  id?: number;
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: PokemonSprite;
  stats: PokemonStat[];
}

export interface PokemonSprite {
  front_default: string;
}
