import { TestBed } from '@angular/core/testing';

import { PokemonPageResolver } from './pokemon-page-resolver.service';

describe('PokemonPageResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokemonPageResolver = TestBed.get(PokemonPageResolver);
    expect(service).toBeTruthy();
  });
});
