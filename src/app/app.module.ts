import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { LogBackendService } from './core/services/log/log-backend/log-backend.service';
import { BrowserLogService } from './core/services/log/impl/browser-log/browser-log.service';
import { CacheService } from './core/services/cache/cache.service';
import { InMemoryCacheService } from './core/services/cache/impl/in-memory-cache/in-memory-cache.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: LogBackendService,
      useClass: BrowserLogService
    },
    {
      provide: CacheService,
      useClass: InMemoryCacheService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
