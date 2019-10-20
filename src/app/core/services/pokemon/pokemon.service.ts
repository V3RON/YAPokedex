import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../../model/page.model';
import { Pokemon, PokemonDetails } from '../../model/pokemon.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(
    private http: HttpClient
  ) {
  }

  getPage(page: number = 0, size: number = 10): Observable<Page<Pokemon>> {
    const offset = page * size;
    const params = new HttpParams()
      .append('offset', offset.toString())
      .append('limit', size.toString());

    return this.http.get<Page<Pokemon>>(environment.apiUrl + '/pokemon', {params});
  }

  getEntity(id: number) {
    return this.http.get<PokemonDetails>(environment.apiUrl + '/pokemon/' + id);
  }
}
