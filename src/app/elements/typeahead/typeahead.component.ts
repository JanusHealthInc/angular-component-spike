import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { map, Observable, of, OperatorFunction, switchMap } from 'rxjs';
import { withUniqueId } from '../mixins/with-unique-id';

const FILTER_BY_PREFIX = (filter: string) => (candidate: string) => {
  return candidate.toLowerCase().startsWith(filter.toLowerCase());
};

@Component({
  selector: 'janus-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeaheadComponent
  extends withUniqueId('janus-typeahead')
  implements ControlValueAccessor
{
  @Input() label = '';
  @Input() placeholder = '';
  @Input() optionsList?: string[];
  @Input() optionsLookup?: (filter: string) => Observable<string[]>;
  @Input() hint = '';

  onChange: any;
  onTouched: any;
  inputId = this.useId('input');
  model!: any;

  wrappedSearchFn: OperatorFunction<string, string[]> = (filter$) => {
    return filter$.pipe(
      switchMap((filter) => {
        if (!filter) {
          return of([]);
        }

        if (this.optionsList) {
          return of(this.optionsList.filter(FILTER_BY_PREFIX(filter)));
        } else if (this.optionsLookup) {
          return this.optionsLookup(filter);
        }

        return of([]);
      })
    );
  };

  onClearFilter(): void {
    this.model = undefined;
  }

  writeValue(obj: any): void {
    this.model = obj;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
}
