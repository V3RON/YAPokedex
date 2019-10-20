import {
  AfterContentInit,
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
export class ListViewComponent implements OnInit, OnDestroy, AfterContentInit {
  cols = 2;
  @Input()
  pageSize = 10;
  @Input()
  length: number;
  @Output()
  page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @ContentChild(TemplateRef, {static: true}) itemTemplate: TemplateRef<Element>;
  private breakpointObserverSub: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private changeDetRef: ChangeDetectorRef
  ) {
  }

  // tslint:disable-next-line:variable-name
  private _items: unknown[] = [];

  get items() {
    return this._items;
  }

  @Input()
  set items(value: unknown[]) {
    if (value != null) {
      this._items = value;
    }
  }

  // tslint:disable-next-line:variable-name
  private _pageIndex = 0;

  get pageIndex() {
    return this._pageIndex;
  }

  @Input()
  set pageIndex(value: number) {
    if (value != null && !Number.isNaN(value)) {
      this._pageIndex = value;
    }
  }

  ngOnInit(): void {
    this.breakpointObserverSub = this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Large])
      .pipe(map(result => result.breakpoints))
      .subscribe(result => {
        if (result[Breakpoints.Medium]) {
          this.cols = 3;
        } else if (result[Breakpoints.Large]) {
          this.cols = 4;
        } else {
          this.cols = 2;
        }
        this.changeDetRef.markForCheck();
      });
  }

  ngAfterContentInit(): void {
    if (!this.itemTemplate) {
      throw new Error('[ListViewComponent] Missing item template!');
    }
  }

  ngOnDestroy(): void {
    this.breakpointObserverSub.unsubscribe();
  }

  pageChanged(event: PageEvent): void {
    this.page.emit(event);
  }
}
