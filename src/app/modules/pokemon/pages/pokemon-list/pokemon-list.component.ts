import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/core/model/pokemon.model';
import { distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';
import { MatSnackBar, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PathUtils } from 'src/app/core/utils/path.util';

@Component({
  selector: 'poke-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PokemonListComponent implements OnInit {
  pokemons$: Observable<Pokemon[]>;
  pageIndex$: Observable<number>;

  constructor(
    private _pokemonService: PokemonService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _matSnackbar: MatSnackBar
  ) {}

  // FIX RESOLVER
  ngOnInit(): void {
    this.pageIndex$ = this._activatedRoute.queryParams.pipe(
      map(params => params.page),
      filter(page => !!page),
      startWith(0),
      distinctUntilChanged()
    );
    this.pokemons$ = this.pageIndex$.pipe(
      switchMap(pageNumber => this._pokemonService.getPage(pageNumber)),
      map(page => page.results.map(pokemon => ({ ...pokemon, id: Number(PathUtils.getLastSegment(pokemon.url)) }))),
    );
  }

  pageChanged(page: PageEvent): void {
    this._router.navigate([], { relativeTo: this._activatedRoute, queryParams: { page: page.pageIndex }});
  }

  showPokemonModal(id: number): void {
    this._router.navigate(['/pokemons', id], { queryParamsHandling: 'merge' });
  }
}
