import { TestBed } from '@angular/core/testing';
import * as SpyHelper from '../../../../../../mock/spy-helper.util';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { PokemonDetailsResolver } from './pokemon-details-resolver.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { EMPTY } from 'rxjs';

describe('PokemonDetailsResolver', () => {
  let service: PokemonDetailsResolver;
  let pokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpyHelper.provideMagicalMock(PokemonService),
        PokemonDetailsResolver
      ]
    });

    service = TestBed.get(PokemonDetailsResolver);
    pokemonService = TestBed.get(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should disallow access when invalid ID is present', () => {
    const fakeNaNSnapshot = {
      params: {
        id: 'asdasd'
      }
    } as unknown as ActivatedRouteSnapshot;

    const observable = service.resolve(fakeNaNSnapshot);
    expect(pokemonService.getEntity).toHaveBeenCalledTimes(0);
    expect(observable).toEqual(EMPTY);
  });
});
