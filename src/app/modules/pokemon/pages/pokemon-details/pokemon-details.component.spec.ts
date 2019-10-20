import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsComponent } from './pokemon-details.component';
import { provideMagicalMock } from '../../../../../../mock/spy-helper.util';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { PokemonDetails } from 'src/app/core/model/pokemon.model';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let matDialog: jasmine.SpyObj<MatDialog>;
  let dialogConfig: any;
  const dialogClosedSubject: Subject<boolean> = new Subject();
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonDetailsComponent],
      providers: [
        provideMagicalMock(Router),
        provideMagicalMock(PokemonService),
        provideMagicalMock(MatDialog),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 12
            })
          }
        }
      ],
      imports: []
    })
      .compileComponents();

    router = TestBed.get(Router);

    const pokemonService: jasmine.SpyObj<PokemonService> = TestBed.get(PokemonService);
    pokemonService.getEntity.and.callFake(id => of(({
      id,
      name: 'Test',
      sprites: null,
      stats: []
    } as unknown as PokemonDetails)));

    matDialog = TestBed.get(MatDialog);
    matDialog.open.and.callFake((comp, config) => {
      dialogConfig = config;
      return {
        afterClosed: () => dialogClosedSubject.asObservable()
      } as unknown as MatDialogRef<any, any>;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show pokemon modal with id 12', async () => {
    await fixture.whenStable();
    expect(matDialog.open).toHaveBeenCalledTimes(1);
    expect(dialogConfig.data).toBeDefined();
    expect(dialogConfig.data.pokemon).toBeDefined();
    expect(dialogConfig.data.pokemon.id).toEqual(12);
  });

  it('should go back to list when dialog is closed', async () => {
    await fixture.whenStable();
    expect(matDialog.open).toHaveBeenCalledTimes(1);
    dialogClosedSubject.next(true);
    await fixture.whenStable();
    expect(router.navigate).toHaveBeenCalledWith(['/pokemons'], {queryParamsHandling: 'preserve'});
  });
});
