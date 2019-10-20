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
  private pokemonDataSub: Subscription;
  private lastModalRef: MatDialogRef<PokemonDetailsModalComponent>;
  private lastModalAfterClosedSub: Subscription;

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.pokemonDataSub = this.activatedRoute.params.pipe(
      map(params => params.id),
      distinctUntilChanged(),
      switchMap(id => this.pokemonService.getEntity(id)),
    ).subscribe(pokemon => this.openPokemonDialog(pokemon));
  }

  ngOnDestroy() {
    if (this.pokemonDataSub) {
      this.pokemonDataSub.unsubscribe();
    }
    if (this.lastModalAfterClosedSub) {
      this.lastModalAfterClosedSub.unsubscribe();
    }
  }

  openPokemonDialog(pokemon: PokemonDetails) {
    if (this.lastModalRef) {
      this.lastModalAfterClosedSub.unsubscribe();
      this.lastModalRef.close();
    }

    this.lastModalRef = this.dialog.open(PokemonDetailsModalComponent, {data: {pokemon}, ...DIALOG_CONFIG});
    this.lastModalAfterClosedSub = this.lastModalRef.afterClosed()
      .subscribe(() => this.router.navigate(['/pokemons'], {queryParamsHandling: 'preserve'}));
  }
}
