import { Injectable } from '@angular/core';
import { CacheService } from '../../cache.service';
import { LogService } from '../../../log/log.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class InMemoryCacheService extends CacheService {
  private _storage: Map<string, any> = new Map();

  constructor(private _log: LogService) {
    super();
  }

  getEntity<T>(type: string, id: number, fetch: () => Observable<T>): Observable<T> {
    const storageAddress = type + '.' + id.toString();

    if (this._storage.has(storageAddress)) {
      this._log.debug(`Entity: ${storageAddress} hit!`);
      return of(this._storage.get(storageAddress));
    }

    this._log.debug(`Entity: ${storageAddress} missed!`);
    return fetch();
  }
}
