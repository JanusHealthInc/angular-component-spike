import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { delay, map, Observable, of, switchMap, tap } from 'rxjs';
import POKEMON from './pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  POKEMON = POKEMON;

  readonly minDelayHalfSec = 0;
  readonly maxDelayHalfSec = 3;

  delayFormControl = new FormControl<number>(this.minDelayHalfSec, {
    validators: [
      Validators.min(this.minDelayHalfSec),
      Validators.max(this.maxDelayHalfSec),
    ],
  });

  get delayMilliseconds(): number {
    return (this.delayFormControl.value ?? 0) * 500;
  }

  get delaySeconds(): number {
    return this.delayMilliseconds / 1000;
  }

  private getMatches(filter: string): string[] {
    return POKEMON.filter((name) => {
      return name.toLowerCase().startsWith(filter.toLowerCase());
    });
  }

  matStaticFilter = new FormControl<string>('');
  matSyncFilteredPokemon$ = this.matStaticFilter.valueChanges.pipe(
    map((filter) => this.getMatches(filter ?? ''))
  );

  matAsyncFilter = new FormControl<string>('');
  matAsyncFilteredPokemon$ = this.matAsyncFilter.valueChanges.pipe(
    switchMap((filter) => {
      return of(this.getMatches(filter ?? '')).pipe(
        delay(this.delayMilliseconds)
      );
    })
  );

  lookupPokemon = (filter: string): Observable<string[]> => {
    return of(this.getMatches(filter)).pipe(delay(this.delayMilliseconds));
  };
}
