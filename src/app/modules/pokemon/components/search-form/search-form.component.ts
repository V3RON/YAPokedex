import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'poke-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
// TODO: COMPONENT LOGIC TO BE GENERALIZED AND EXTRACTED
export class SearchFormComponent implements OnInit, OnDestroy {
  @Output('pokeSearch')
  searchEventEmitter: EventEmitter<number> = new EventEmitter<number>();

  searchForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.min(1), Validators.max(100), Validators.required])
  });

  private _searchInputSubject: Subject<number> = new Subject<number>();
  private _searchInputSub: Subscription;

  constructor() {}

  ngOnInit(): void {
    this._searchInputSub = this._searchInputSubject.pipe(
      debounceTime(100),
      map(() => this.searchForm.value.id)
    ).subscribe(id => this.searchEventEmitter.emit(id));
  }

  ngOnDestroy(): void {
    this._searchInputSub.unsubscribe();
  }

  searchById(id: number) {
    this._searchInputSubject.next(id);
  }
}
