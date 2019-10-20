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
  name: string;
  value: number;
}

@Component({
  selector: 'poke-pokemon-stats-view',
  templateUrl: './pokemon-stats-view.component.html',
  styleUrls: ['./pokemon-stats-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PokemonStatsViewComponent implements OnInit, OnDestroy, OnChanges {
  plainStats: PlainPokemonStat[];
  cols = 1;

  @Input()
  stats: PokemonStat[];

  private breakpointObserverSub: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private changeDetRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.breakpointObserverSub = this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Large])
      .pipe(map(result => result.breakpoints))
      .subscribe(result => {
        if (result[Breakpoints.Medium]) {
          this.cols = 2;
        } else if (result[Breakpoints.Large]) {
          this.cols = 3;
        } else {
          this.cols = 1;
        }
        this.changeDetRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    if (this.breakpointObserverSub) {
      this.breakpointObserverSub.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.stats) {
      this.plainStats = this.stats.map(stat => ({name: stat.stat.name, value: stat.base_stat}));
    }
  }
}
