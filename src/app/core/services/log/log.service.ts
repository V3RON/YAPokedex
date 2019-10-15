import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogBackendService } from './log-backend/log-backend.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private _logBackend: LogBackendService) {}

  debug(msg: string): void {
    if (!environment.production) {
      this._logBackend.debug(msg);
    }
  }

  info(msg: string): void {
    this._logBackend.info(msg);
  }

  error(msg: string): void {
    this._logBackend.error(msg);
  }
}
