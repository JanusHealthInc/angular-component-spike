import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'janus-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block shadow-sm p-3',
  },
})
export class CardComponent {
  @Input() filename = '';
  @Input() title = '';
}
