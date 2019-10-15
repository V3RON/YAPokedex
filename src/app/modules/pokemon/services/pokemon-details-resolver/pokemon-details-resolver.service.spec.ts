import { TestBed } from '@angular/core/testing';

import { PokemonDetailsResolver } from './pokemon-details-resolver.service';

describe('PokemonDetailsResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokemonDetailsResolver = TestBed.get(PokemonDetailsResolver);
    expect(service).toBeTruthy();
  });
});
