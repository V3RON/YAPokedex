import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewComponent } from './list-view.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule, MatPaginator, MatPaginatorModule } from '@angular/material';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: '<poke-list-view><ng-template let-item><div class="testing-item">{{item}}</div></ng-template></poke-list-view>'
})
class TestComponent {
}

describe('ListViewComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListViewComponent,
        TestComponent
      ],
      providers: [],
      imports: [
        LayoutModule,
        MatPaginatorModule,
        MatGridListModule,
      ]
    })
      .compileComponents();
  }));

  it('should warn about missing item template', () => {
    const fixture: ComponentFixture<ListViewComponent> = TestBed.createComponent(ListViewComponent);
    expect(() => fixture.detectChanges()).toThrowError('[ListViewComponent] Missing item template!');
  });

  it('should emit event when page is changed', (done: DoneFn) => {
    const fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
    const component: ListViewComponent = fixture.debugElement.query(By.directive(ListViewComponent)).componentInstance;
    component.page.subscribe(() => done());
    component.pageIndex = 1;
    component.pageSize = 10;
    component.length = 100;
    fixture.detectChanges();

    const paginator = fixture.debugElement.query(By.directive(MatPaginator)).componentInstance as MatPaginator;
    paginator.firstPage();
  });

  it('should use provided template to display items', () => {
    const fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
    const component: ListViewComponent = fixture.debugElement.query(By.directive(ListViewComponent)).componentInstance;
    component.items = ['a', 'b', 'c'];
    fixture.detectChanges();

    const itemsRendered = fixture.debugElement.queryAll(By.css('.testing-item'));
    expect(itemsRendered.length).toEqual(3);
    expect(itemsRendered.map(item => item.nativeElement.innerText)).toEqual(['a', 'b', 'c']);
  });
});
