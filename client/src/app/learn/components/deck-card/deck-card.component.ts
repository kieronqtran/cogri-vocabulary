import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Word } from '@app/admin/word/models/word';

@Component({
  selector: 'anms-deck-card',
  templateUrl: './deck-card.component.html',
  styleUrls: ['./deck-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class DeckCardComponent implements OnInit {
  @Input() word: Word;
  constructor() { }

  ngOnInit() {
  }

}
