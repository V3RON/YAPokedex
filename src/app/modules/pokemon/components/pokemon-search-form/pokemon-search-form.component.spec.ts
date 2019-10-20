import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './pokemon-search-form.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { CONFIG } from '../../../../core/config/config';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('should not emit pokeSearch event when ID is empty', () => {
    let dataEmitted;

    beforeEach(() => {
      component.searchForm.setValue({
        id: ''
      });
      component.pokeSearch.subscribe(() => dataEmitted = true);
      fixture.detectChanges();
    });

    it('using submit button', async () => {
      fixture.debugElement.query(By.css('.poke-search-form__submit')).nativeElement.click();
      await fixture.whenStable();
      expect(dataEmitted).toBeUndefined();
    });

    it('using enter key', async () => {
      const event = new KeyboardEvent('keyup', {
        key: 'Enter',
      });
      fixture.debugElement.query(By.css('.poke-search-form__form')).nativeElement.dispatchEvent(event);
      await fixture.whenStable();
      expect(dataEmitted).toBeUndefined();
    });
  });

  describe('should not emit pokeSearch event when ID is lower than 1', () => {
    let dataEmitted;

    beforeEach(() => {
      component.searchForm.setValue({
        id: '0'
      });
      component.pokeSearch.subscribe(() => dataEmitted = true);
      fixture.detectChanges();
    });

    it('using submit button', async () => {
      fixture.debugElement.query(By.css('.poke-search-form__submit')).nativeElement.click();
      await fixture.whenStable();
      expect(dataEmitted).toBeUndefined();
    });

    it('using enter key', async () => {
      const event = new KeyboardEvent('keyup', {
        key: 'Enter',
      });
      fixture.debugElement.query(By.css('.poke-search-form__form')).nativeElement.dispatchEvent(event);
      await fixture.whenStable();
      expect(dataEmitted).toBeUndefined();
    });
  });

  describe(`should not emit pokeSearch event when ID is greater than ${CONFIG.pokemon.max}`, () => {
    let dataEmitted;

    beforeEach(() => {
      dataEmitted = undefined;
      component.searchForm.setValue({
        id: String(CONFIG.pokemon.max) + 1
      });
      component.pokeSearch.subscribe(() => dataEmitted = true);
      fixture.detectChanges();
    });

    it('using submit button', async () => {
      fixture.debugElement.query(By.css('.poke-search-form__submit')).nativeElement.click();
      await fixture.whenStable();
      expect(dataEmitted).toBeUndefined();
    });

    it('using enter key', async () => {
      const event = new KeyboardEvent('keyup', {
        key: 'Enter',
      });
      fixture.debugElement.query(By.css('.poke-search-form__form')).nativeElement.dispatchEvent(event);
      await fixture.whenStable();
      expect(dataEmitted).toBeUndefined();
    });
  });

  describe('should transform xxx number format to x (ie. 001 -> 1)', () => {
    [{expected: 1, data: '001'}, {expected: 21, data: '021'}, {expected: 98, data: '098'}].forEach(obj => {
      it(`should transform ${obj.data} to ${obj.expected}`, async () => {
        let searchId;
        component.searchForm.setValue({
          id: obj.data
        });
        component.pokeSearch.subscribe(id => searchId = id);
        fixture.detectChanges();
        fixture.debugElement.query(By.css('.poke-search-form__submit')).nativeElement.click();
        await fixture.whenStable();
        expect(searchId).toEqual(obj.expected);
      });
    });
  });
});
