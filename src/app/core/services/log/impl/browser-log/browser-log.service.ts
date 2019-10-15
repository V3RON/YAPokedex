import { Injectable } from '@angular/core';
import { LogBackendService } from '../../log-backend/log-backend.service';

@Injectable()
export class BrowserLogService extends LogBackendService {
  constructor() {
    super();
  }

  debug(msg: string): void {
    console.debug(msg);
  }

  info(msg: string): void {
    console.info(msg);
  }

  error(msg: string): void {
    console.error(msg);
  }
}
