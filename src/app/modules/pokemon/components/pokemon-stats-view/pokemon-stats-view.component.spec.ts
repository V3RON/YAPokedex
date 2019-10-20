import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonStatsViewComponent } from './pokemon-stats-view.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PokemonStat } from 'src/app/core/model/pokemon-stat.model';
import { DebugElement, SimpleChanges } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { from, Observable } from 'rxjs';
import { filter, map, toArray } from 'rxjs/operators';

describe('PokemonStatsViewComponent', () => {
  let component: PokemonStatsViewComponent;
  let fixture: ComponentFixture<PokemonStatsViewComponent>;
  let debugElem: DebugElement;

  // BreakpointObserver should be generalized and extracted later
  const matchObj = [
    {matchStr: Breakpoints.Medium, result: false},
    {matchStr: Breakpoints.Large, result: false}
  ];
  const fakeObserve = (s: string[]): Observable<BreakpointState> => from(matchObj).pipe(
    filter(obj => obj.result === true),
    toArray(),
    map(matches => ({
      matches: true,
      breakpoints: matches.map(obj => obj.matchStr).reduce((arr, val) => (arr[val] = true) && arr, {})
    } as BreakpointState))
  );
  const bpSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);
  bpSpy.observe.and.callFake(fakeObserve);

  function resize(width: number): void {
    matchObj[0].result = (width > 960 && width < 1280) ? true : false;
    matchObj[1].result = (width > 1280 && width < 1920) ? true : false;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonStatsViewComponent],
      imports: [MatGridListModule, SharedModule],
      providers: [
        {
          provide: BreakpointObserver,
          useValue: bpSpy
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonStatsViewComponent);
    component = fixture.componentInstance;
    debugElem = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render as many cards as stats in model', () => {
    const stats: PokemonStat[] = Array.from({length: 16}, (val, ind) => ({
      stat: {
        id: ind,
        name: 'Test#' + ind
      },
      base_stat: 12,
      effort: 12
    }));

    component.stats = stats;
    component.ngOnChanges({stats: {currentValue: stats, previousValue: null, firstChange: true}} as unknown as SimpleChanges);
    expect(component.plainStats.length).toEqual(16);
    fixture.detectChanges();

    const innerElems = debugElem.queryAll(By.css('.pokemon-stats-view__card'));
    expect(innerElems.length).toEqual(16);
    innerElems.forEach((elem, ind) => expect(elem.nativeElement.innerText).toEqual(stats[ind].stat.name + '\n' + stats[ind].base_stat));
  });

  describe('should react to browser viewport changes', () => {
    it('should show one column on small screens', () => {
      resize(700);
      fixture.detectChanges();
      expect(component.cols).toEqual(1);
    });

    it('should show two columns on medium screens', () => {
      resize(1000);
      fixture.detectChanges();
      expect(component.cols).toEqual(2);
    });

    it('should show three columns on large screens', () => {
      resize(1400);
      fixture.detectChanges();
      expect(component.cols).toEqual(3);
    });
  });
});
