import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PokemonDetailsModalComponent } from '../../components/pokemon-details-modal/pokemon-details-modal.component';
import { PokemonDetails } from 'src/app/core/model/pokemon.model';
import { PokemonService } from '../../../../core/services/pokemon/pokemon.service';

const DIALOG_CONFIG: MatDialogConfig = {
  minHeight: '420px',
  width: '520px',
  maxWidth: '90%',
  closeOnNavigation: true,
  autoFocus: false
};

@Component({
  selector: 'poke-pokemon-details',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {
  private _pokemonDataSub: Subscription;
  private _lastModalRef: MatDialogRef<PokemonDetailsModalComponent>;
  private _lastModalAfterClosedSub: Subscription;

  constructor(
    private _pokemonService: PokemonService,
    private _activatedRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit() {
    this._pokemonDataSub = this._activatedRoute.params.pipe(
      map(params => params.id),
      distinctUntilChanged(),
      switchMap(id => this._pokemonService.getEntity(id)),
    ).subscribe(pokemon => this.openPokemonDialog(pokemon));
  }

  ngOnDestroy() {
    this._pokemonDataSub.unsubscribe();
    if (this._lastModalAfterClosedSub) {
      this._lastModalAfterClosedSub.unsubscribe();
    }
  }

  openPokemonDialog(pokemon: PokemonDetails) {
    if (this._lastModalRef) {
      this._lastModalAfterClosedSub.unsubscribe();
      this._lastModalRef.close();
    }

    this._lastModalRef = this._dialog.open(PokemonDetailsModalComponent, { data: { pokemon }, ...DIALOG_CONFIG });
    this._lastModalAfterClosedSub = this._lastModalRef.afterClosed()
      .subscribe(() => this._router.navigate(['/pokemons'], { queryParamsHandling: 'preserve' }));
  }
}
