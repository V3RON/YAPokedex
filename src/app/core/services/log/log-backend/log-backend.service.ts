import { Injectable } from '@angular/core';

@Injectable()
export abstract class LogBackendService {
  abstract debug(msg: string): void;
  abstract info(msg: string): void;
  abstract error(msg: string): void;
}
