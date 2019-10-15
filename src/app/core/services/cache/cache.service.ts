import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class CacheService {
  abstract getEntity<T>(type: string, id: number, fetch: () => Observable<T>): Observable<T>;
}
