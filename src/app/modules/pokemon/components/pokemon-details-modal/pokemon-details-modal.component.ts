import { ChangeDetectionStrategy, Component, HostListener, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PokemonDetails } from 'src/app/core/model/pokemon.model';
import { Router } from '@angular/router';
import { CONFIG } from '../../../../core/config/config';

@Component({
  selector: 'poke-pokemon-details-modal',
  templateUrl: './pokemon-details-modal.component.html',
  styleUrls: ['./pokemon-details-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PokemonDetailsModalComponent implements OnInit {
  pokemon: PokemonDetails;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
  }

  ngOnInit(): void {
    this.pokemon = this.data.pokemon;
  }

  @HostListener('window:keyup', ['$event'])
  keyboardKeyClicked(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.moveToNextPokemon();
    } else if (event.key === 'ArrowLeft') {
      this.moveToPreviousPokemon();
    }
  }

  moveToNextPokemon(): void {
    const nextPokemonId: number = this.pokemon.id + 1;
    if (nextPokemonId > CONFIG.pokemon.max) {
      return;
    }

    this.router.navigateByUrl('/pokemons/' + nextPokemonId);
  }

  moveToPreviousPokemon(): void {
    const prevPokemonId: number = this.pokemon.id - 1;
    if (prevPokemonId <= 1) {
      return;
    }

    this.router.navigateByUrl('/pokemons/' + prevPokemonId);
  }
}
