import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonStatsViewComponent } from './pokemon-stats-view.component';

describe('PokemonStatsViewComponent', () => {
  let component: PokemonStatsViewComponent;
  let fixture: ComponentFixture<PokemonStatsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonStatsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonStatsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
