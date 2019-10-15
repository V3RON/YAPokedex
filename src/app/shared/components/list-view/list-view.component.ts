import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { PageEvent } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'poke-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ListViewComponent implements OnInit, OnDestroy {
  _items: unknown[] = [];
  _pageIndex: number = 0;
  _cols = 2;

  @Input()
  set items(value: unknown[]) {
    if (value != null) {
      this._items = value;
    }
  }
  get items() {
    return this._items;
  }

  @Input()
  set pageIndex(value: number) {
    if (value != null && !Number.isNaN(value)) {
      this._pageIndex = value;
    }
  }
  get pageIndex() {
    return this._pageIndex;
  }

  @Output('page')
  pageEventEmitter: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @ContentChild(TemplateRef, { static: false }) itemTemplate: TemplateRef<Element>;

  private _breakpointObserverSub: Subscription;

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _changeDetRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._breakpointObserverSub = this._breakpointObserver
      .observe([ Breakpoints.Medium, Breakpoints.Large ])
      .pipe(map(result => result.breakpoints))
      .subscribe(result => {
        if (result[Breakpoints.Medium]) {
          this._cols = 3;
        } else if (result[Breakpoints.Large]) {
          this._cols = 4;
        } else {
          this._cols = 2;
        }
        this._changeDetRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._breakpointObserverSub.unsubscribe();
  }

  pageChanged(event: PageEvent): void {
    this.pageEventEmitter.emit(event);
  }
}
