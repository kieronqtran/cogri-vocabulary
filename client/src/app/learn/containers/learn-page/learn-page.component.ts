import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../reducers';
import { Observable, of } from 'rxjs';
import { Word } from '@app/admin/word/models/word';
import { LoadLearnApis } from '@app/learn/actions/learn-api.actions';

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
    this.words$ = this.store.pipe(select(fromStore.selectRandomWordAll));
  }

  onSelectionChange(event: Word) {
    console.log(event);
  }

  onClickDone() {
    console.log('Done clicked');
  }
}
