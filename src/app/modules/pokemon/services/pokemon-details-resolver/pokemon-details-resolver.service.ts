import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PokemonDetails } from 'src/app/core/model/pokemon.model';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { empty, Observable } from 'rxjs';
import { LogService } from 'src/app/core/services/log/log.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailsResolver implements Resolve<PokemonDetails> {
  constructor(private _pokemonService: PokemonService, private _log: LogService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PokemonDetails> {
    const pokemonId: number = Number(route.params.id);

    if (Number.isNaN(pokemonId)) {
      this._log.debug("Pokemon ID is not a number, restricting access");
      return empty();
    }

    return this._pokemonService.getEntity(pokemonId);
  }
}
