import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../../model/page.model';
import { Pokemon, PokemonDetails } from '../../model/pokemon.model';
import { environment } from 'src/environments/environment';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(
    private _http: HttpClient,
    private _log: LogService
  ) {}

  getPage(page: number = 0, size: number = 10): Observable<Page<Pokemon>>  {
    const offset = page * size;
    const params = new HttpParams()
      .append('offset', offset.toString())
      .append('limit', size.toString());

    this._log.debug(`[PokemonService] Fetching for page ${page}, size ${size}`);
    return this._http.get<Page<Pokemon>>(environment.apiUrl + '/pokemon', { params });
  }

  getEntity(id: number) {
    this._log.debug(`[PokemonService] Fetching for entity ${id}`);
    return this._http.get<PokemonDetails>(environment.apiUrl + '/pokemon/' + id);
  }
}
