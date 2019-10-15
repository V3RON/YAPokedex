import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { PokemonStat } from 'src/app/core/model/pokemon-stat.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

interface PlainPokemonStat {
  name: string,
  value: number
}

@Component({
  selector: 'poke-pokemon-stats-view',
  templateUrl: './pokemon-stats-view.component.html',
  styleUrls: ['./pokemon-stats-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PokemonStatsViewComponent implements OnInit, OnDestroy, OnChanges {
  _plainStats: PlainPokemonStat[];
  _cols = 1;

  @Input()
  stats: PokemonStat[];

  private _breakpointObserverSub: Subscription;

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _changeDetRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._breakpointObserverSub = this._breakpointObserver
      .observe([ Breakpoints.Medium, Breakpoints.Large ])
      .pipe(map(result => result.breakpoints))
      .subscribe(result => {
        if (result[Breakpoints.Medium]) {
          this._cols = 2;
        } else if (result[Breakpoints.Large]) {
          this._cols = 3;
        } else {
          this._cols = 1;
        }
        this._changeDetRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._breakpointObserverSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._plainStats = this.stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat }));
  }
}
