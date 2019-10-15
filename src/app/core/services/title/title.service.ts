import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(
    private _title: Title, 
    private _activatedRoute: ActivatedRoute
  ) {}
}
