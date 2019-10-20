import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CONFIG } from '../../../../core/config/config';

@Component({
  selector: 'poke-search-form',
  templateUrl: './pokemon-search-form.component.html',
  styleUrls: ['./pokemon-search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SearchFormComponent implements OnInit, OnDestroy {
  @Output()
  pokeSearch: EventEmitter<number> = new EventEmitter<number>();

  searchForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.min(1), Validators.max(CONFIG.pokemon.max), Validators.required])
  });

  private searchInputSubject: Subject<number> = new Subject<number>();
  private searchInputSub: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.searchInputSub = this.searchInputSubject.pipe(
      debounceTime(100),
      map(() => this.searchForm.value.id),
      map(id => parseInt(id, 10))
    ).subscribe(id => this.pokeSearch.emit(id));
  }

  ngOnDestroy(): void {
    this.searchInputSub.unsubscribe();
  }

  searchById(id: number) {
    this.searchInputSubject.next(id);
  }
}
