import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatPaginatorModule } from '@angular/material';
import { ListViewComponent } from './components/list-view/list-view.component';
import { DashReplacerPipe } from './pipes/dash-replacer.pipe';
import { DigitOnlyModule } from '@uiowa/digit-only';

const MATERIAL_MODULES = [
  MatPaginatorModule,
  MatGridListModule
];

const COMPONENTS = [
  ListViewComponent
];

const PIPES = [
  DashReplacerPipe
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  imports: [
    CommonModule,
    DigitOnlyModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
    DigitOnlyModule
  ]
})
export class SharedModule { }
