import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../reducers';
import { Observable, of } from 'rxjs';
import { Word } from '@app/admin/word/models/word';
import { LoadLearnApis } from '@app/learn/actions/learn-api.actions';
import { selectRandomWordAll } from '../../reducers/learn.reducer';

@Component({
  selector: 'anms-learn-page',
  templateUrl: './learn-page.component.html',
  styleUrls: ['./learn-page.component.scss'],
})
export class LearnPageComponent implements OnInit {
  words$: Observable<Word[]>;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.store.dispatch(new LoadLearnApis());
    this.words$ = this.store.pipe(select(selectRandomWordAll));
  }

  onSelectionChange(event: Word) {
    console.log(event);
  }

  onClickDone() {
    console.log('Done clicked');
  }
}

const EXAMPLE_DATA = [
  {
    id: 1,
    word: 'Tre',
    vietnameseMeaning: 'deserunt',
    similarWords: ['excepturi'],
    examples: [
      'Enim repudiandae asperiores.',
      'Ullam sit saepe molestias nisi.',
    ],
    createdAt: '2018-12-20T23:31:37.140Z',
    updatedAt: '2018-12-20T23:31:37.140Z',
  },
  {
    id: 2,
    word: '6bb0811c-7c0b-4cb1-b35d-94e9b3b61176_neque',
    vietnameseMeaning: 'et',
    similarWords: ['hic'],
    examples: [
      'Exercitationem id eius ut.',
      'Vitae enim deleniti rerum et ipsa ut sit.',
    ],
    createdAt: '2018-12-20T23:31:37.309Z',
    updatedAt: '2018-12-20T23:31:37.309Z',
  },
  {
    id: 3,
    word: 'omnis',
    vietnameseMeaning: 'autem',
    similarWords: ['soluta'],
    examples: [
      'Laborum doloribus et dignissimos rerum maiores id omnis veritatis.',
      'Consequuntur alias temporibus.',
    ],
    createdAt: '2018-12-20T23:29:18.489Z',
    updatedAt: '2018-12-20T23:29:18.489Z',
  },
];
