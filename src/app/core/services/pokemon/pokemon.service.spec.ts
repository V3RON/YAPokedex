import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PokemonService } from './pokemon.service';
import { environment } from 'src/environments/environment';
import { Pokemon, PokemonDetails, PokemonSprite } from '../../model/pokemon.model';
import { Page } from '../../model/page.model';

describe('PokemonService', () => {
  let httpMock: HttpTestingController;
  let service: PokemonService;

  const items: Page<Pokemon> = {
    count: 3,
    next: null,
    previous: null,
    results: [
      {
        name: 'Test#1',
        url: 'http://localhost/1'
      },
      {
        name: 'Test#2',
        url: 'http://localhost/2'
      },
      {
        name: 'Test#3',
        url: 'http://localhost/3'
      }
    ]
  };

  const item: PokemonDetails = {
    id: 12,
    name: 'Lorem ipsum',
    sprites: {} as unknown as PokemonSprite,
    stats: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PokemonService
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call list API and use page param', (done: DoneFn) => {
    service.getPage(0).subscribe(page => {
      expect(page).toEqual(items);
      done();
    });

    const req = httpMock.expectOne(requ => requ.method === 'GET' && requ.url === `${environment.apiUrl}/pokemon`);
    expect(req.request.params.get('offset')).toEqual('0');
    expect(req.request.params.get('limit')).toEqual('10');
    req.flush(items);
    httpMock.verify();
  });

  it('should call list API and use page and offset param', (done: DoneFn) => {
    service.getPage(2, 20).subscribe(page => {
      expect(page).toEqual(items);
      done();
    });

    const req = httpMock.expectOne(requ => requ.method === 'GET' && requ.url === `${environment.apiUrl}/pokemon`);
    expect(req.request.params.get('offset')).toEqual('40');
    expect(req.request.params.get('limit')).toEqual('20');
    req.flush(items);
    httpMock.verify();
  });

  it('should call details API with ID', (done: DoneFn) => {
    service.getEntity(12).subscribe(pokemon => {
      expect(pokemon).toEqual(item);
      done();
    });

    const req = httpMock.expectOne(requ => requ.method === 'GET' && requ.url === `${environment.apiUrl}/pokemon/12`);
    req.flush(item);
    httpMock.verify();
  });
});
