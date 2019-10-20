import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchFormComponent } from '../../components/pokemon-search-form/pokemon-search-form.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, PageEvent } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ListViewComponent } from 'src/app/shared/components/list-view/list-view.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/core/model/pokemon.model';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  let routerSpy: jasmine.Spy;

  let listViewComp: ListViewComponent;
  let searchFormComp: SearchFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonListComponent, SearchFormComponent],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
    })
      .compileComponents();

    const router = TestBed.get(Router);
    routerSpy = spyOn(router, 'navigate');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;

    listViewComp = fixture.debugElement.query(By.directive(ListViewComponent)).componentInstance;
    searchFormComp = fixture.debugElement.query(By.directive(SearchFormComponent)).componentInstance;
    listViewComp.items = [{
      id: 69
    } as unknown as Pokemon];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to page selected in paginator', () => {
    const event: PageEvent = {
      pageIndex: 2,
      pageSize: 20,
      length: 10,
      previousPageIndex: 1
    };
    listViewComp.page.emit(event);

    expect(routerSpy).toHaveBeenCalledWith([], jasmine.objectContaining({
      queryParams: {
        page: 2
      }
    }));
  });

  it('should navigate to details page when searched', () => {
    searchFormComp.pokeSearch.emit(24);

    expect(routerSpy).toHaveBeenCalledWith(['/pokemons', 24], {queryParamsHandling: 'merge'});
  });

  it('should navigate to details page when clicked card', () => {
    fixture.debugElement.query(By.css('.pokemon-list__card')).nativeElement.click();

    expect(routerSpy).toHaveBeenCalledWith(['/pokemons', 69], {queryParamsHandling: 'merge'});
  });
});
