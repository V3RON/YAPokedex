import { Stat } from './stat.model';

export interface PokemonStat {
    stat: Stat,
    effort: number,
    base_stat: number
}