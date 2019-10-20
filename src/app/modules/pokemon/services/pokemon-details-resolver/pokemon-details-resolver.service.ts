import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { PokemonDetails } from 'src/app/core/model/pokemon.model';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailsResolver implements Resolve<PokemonDetails> {
  constructor(
    private pokemonService: PokemonService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PokemonDetails> {
    const pokemonId: number = Number(route.params.id);

    if (isNaN(pokemonId)) {
      return EMPTY;
    }

    return this.pokemonService.getEntity(pokemonId);
  }
}
