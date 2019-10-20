import { NgModule } from '@angular/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressModule } from '@ngx-progressbar/core';

const MODULES = [
  NgProgressHttpModule
];

@NgModule({
  declarations: [],
  imports: [
    NgProgressModule.withConfig({
      color: '#8E2DE2'
    }),
    ...MODULES
  ],
  providers: [],
  exports: [
    NgProgressModule,
    ...MODULES,
  ]
})
export class CoreModule {
}
