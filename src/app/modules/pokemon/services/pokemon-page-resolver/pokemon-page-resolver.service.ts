import { Injectable } from '@angular/core';
import { Page } from 'src/app/core/model/page.model';
import { Pokemon } from 'src/app/core/model/pokemon.model';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';

@Injectable()
export class PokemonPageResolver implements Resolve<Page<Pokemon>> {
  constructor(
    private pokemonService: PokemonService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Page<Pokemon>> {
    const pageIndex = isNaN(route.queryParams.page) ? 0 : Number(route.queryParams.page);
    return this.pokemonService.getPage(pageIndex);
  }
}
