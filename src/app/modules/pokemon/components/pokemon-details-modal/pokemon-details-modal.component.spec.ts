import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsModalComponent } from './pokemon-details-modal.component';
import { By } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatButtonModule, MatIconModule } from '@angular/material';
import { provideMagicalMock } from '../../../../../../mock/spy-helper.util';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PokemonDetailsModalComponent', () => {
  let component: PokemonDetailsModalComponent;
  let fixture: ComponentFixture<PokemonDetailsModalComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonDetailsModalComponent],
      providers: [
        provideMagicalMock(Router),
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            pokemon: {
              id: 100,
              name: 'lorem-ipsum',
              sprites: {
                front_default: 'http://localhost'
              }
            }
          }
        }
      ],
      imports: [MatButtonModule, MatIconModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    // OnPush components can only call detectChanges() once :<
    TestBed.overrideComponent(PokemonDetailsModalComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });

    routerSpy = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show pokemon name title cased', async () => {
    const displayedTitle = fixture.debugElement.query(By.css('.pokemon-details-modal__title')).nativeElement.innerText;
    expect(displayedTitle).toEqual('Lorem-ipsum');
  });

  describe('arrow navigation', () => {
    it('should disable left arrow when id is 1', () => {
      component.pokemon.id = 1;
      fixture.detectChanges();

      const arrow = fixture.debugElement.query(By.css('.pokemon-details-modal__arrow--left')).nativeElement;
      expect(arrow.getAttribute('disabled')).toBeTruthy();

      arrow.click();
      expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(0);
    });

    it('should disable right arrow when id is 100', () => {
      component.pokemon.id = 100;
      fixture.detectChanges();

      const arrow = fixture.debugElement.query(By.css('.pokemon-details-modal__arrow--right')).nativeElement;
      expect(arrow.getAttribute('disabled')).toBeTruthy();

      arrow.click();
      expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(0);
    });

    it('should change route to next pokemon when id is not 100', () => {
      component.pokemon.id = 50;
      fixture.detectChanges();

      const arrow = fixture.debugElement.query(By.css('.pokemon-details-modal__arrow--right')).nativeElement;
      expect(arrow.getAttribute('disabled')).toBeFalsy();

      arrow.click();
      expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(1);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/pokemons/' + (component.pokemon.id + 1));
    });

    it('should change route to previous pokemon when id is not 1', () => {
      component.pokemon.id = 50;
      fixture.detectChanges();

      const arrow = fixture.debugElement.query(By.css('.pokemon-details-modal__arrow--left')).nativeElement;
      expect(arrow.getAttribute('disabled')).toBeFalsy();

      arrow.click();
      expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(1);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/pokemons/' + (component.pokemon.id - 1));
    });
  });

  describe('keyboard navigation', () => {
    it('should disable left arrow key when id is 1', () => {
      component.pokemon.id = 1;
      fixture.detectChanges();

      const event = new KeyboardEvent('keyup', {
        key: 'ArrowLeft',
      });
      window.dispatchEvent(event);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(0);
    });

    it('should disable right arrow key when id is 100', () => {
      component.pokemon.id = 100;
      fixture.detectChanges();

      const event = new KeyboardEvent('keyup', {
        key: 'ArrowRight',
      });
      window.dispatchEvent(event);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(0);
    });

    it('should change route to next pokemon when id is not 100', () => {
      component.pokemon.id = 50;
      fixture.detectChanges();

      const event = new KeyboardEvent('keyup', {
        key: 'ArrowRight',
      });
      window.dispatchEvent(event);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(1);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/pokemons/' + (component.pokemon.id + 1));
    });

    it('should change route to previous pokemon when id is not 1', () => {
      component.pokemon.id = 50;
      fixture.detectChanges();

      const event = new KeyboardEvent('keyup', {
        key: 'ArrowLeft',
      });
      window.dispatchEvent(event);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(1);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/pokemons/' + (component.pokemon.id - 1));
    });
  });
});
