import { Injectable } from '@angular/core';
import { Page } from 'src/app/core/model/page.model';
import { Pokemon } from 'src/app/core/model/pokemon.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { LogService } from 'src/app/core/services/log/log.service';

@Injectable()
export class PokemonPageResolver implements Resolve<Page<Pokemon>> {
  constructor(
    private _pokemonService: PokemonService,
    private _log: LogService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page<Pokemon>> {
    const pageIndex = Number.isNaN(route.queryParams['page']) ? 0 : route.queryParams['page'];

    this._log.debug(`[PokemonPageResolver] Resolving page ${pageIndex}`);
    return this._pokemonService.getPage(pageIndex);
  }
}
