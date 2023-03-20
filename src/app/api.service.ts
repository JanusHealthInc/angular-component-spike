import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import POKEMON from './pokemon';

@Injectable()
export class ApiService {
  getAll(): string[] {
    return POKEMON;
  }

  filterSuggestions(filter: string): string[] {
    return POKEMON.filter((name) => {
      return name.toLowerCase().startsWith(filter.toLowerCase());
    });
  }

  filterSuggestionsAsync(value: string, delayBy = 0): Observable<string[]> {
    return of(this.filterSuggestions(value)).pipe(delay(delayBy));
  }
}
