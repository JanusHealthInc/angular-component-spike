import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { TagComponent } from './tag/tag.component';

@NgModule({
  imports: [CommonModule, FormsModule, NgbModule],
  declarations: [TypeaheadComponent, CardComponent, TagComponent],
  exports: [TypeaheadComponent, CardComponent, TagComponent],
})
export class ElementsModule {}
