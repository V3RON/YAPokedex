import { ChangeDetectionStrategy, Component, HostListener, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PokemonDetails } from 'src/app/core/model/pokemon.model';
import { Router } from '@angular/router';

@Component({
  selector: 'poke-pokemon-details-modal',
  templateUrl: './pokemon-details-modal.component.html',
  styleUrls: ['./pokemon-details-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PokemonDetailsModalComponent {
  pokemon: PokemonDetails;

  constructor(
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.pokemon = this.data.pokemon;
  }

  @HostListener('window:keyup', ['$event'])
  keyboardKeyClicked(event) {
    if (event.keyCode === 37) {
      this.moveToNextPokemon();
    }

    if (event.keyCode === 39) {
      this.moveToPreviousPokemon();
    }
  }

  moveToNextPokemon(): void {
    const nextPokemonId: number = this.pokemon.id + 1;
    if (nextPokemonId > 100) {
      return;
    }

    this._router.navigateByUrl('/pokemons/' + nextPokemonId);
  }

  moveToPreviousPokemon(): void {
    const prevPokemonId: number = this.pokemon.id - 1;
    if (prevPokemonId <= 0) {
      return;
    }

    this._router.navigateByUrl('/pokemons/' + prevPokemonId);
  }
}
