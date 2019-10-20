import { TestBed } from '@angular/core/testing';
import * as SpyHelper from '../../../../../../mock/spy-helper.util';
import { PokemonPageResolver } from './pokemon-page-resolver.service';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('PokemonPageResolver', () => {
  let service: PokemonPageResolver;
  let pokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpyHelper.provideMagicalMock(PokemonService),
        PokemonPageResolver
      ]
    });

    service = TestBed.get(PokemonPageResolver);
    pokemonService = TestBed.get(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map NaN or undefined page param to 0', () => {
    const fakeNaNSnapshot = {
      queryParams: {
        page: 'adfgs'
      }
    } as unknown as ActivatedRouteSnapshot;
    const fakeUndefinedSnapshot = {
      queryParams: {}
    } as unknown as ActivatedRouteSnapshot;

    service.resolve(fakeNaNSnapshot);
    expect(pokemonService.getPage).toHaveBeenCalledWith(0);

    service.resolve(fakeUndefinedSnapshot);
    expect(pokemonService.getPage).toHaveBeenCalledWith(0);
  });
});
