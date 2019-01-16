import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../reducers';
import { Observable, of } from 'rxjs';
import { Word } from '@app/admin/word/models/word';
import { LoadLearnApis } from '@app/learn/actions/learn-api.actions';
import { Learn } from '@app/learn/models/learn.model';
import { Router } from '@angular/router';
import { RecordWord } from '@app/learn/actions/learn.actions';

@Component({
  selector: 'anms-learn-page',
  templateUrl: './learn-page.component.html',
  styleUrls: ['./learn-page.component.scss'],
})
export class LearnPageComponent implements OnInit {
  words$: Observable<Word[]>;

  constructor(
    private store: Store<fromStore.State>,
    private router: Router,
  ) {}

  ngOnInit() {
    this.store.dispatch(new LoadLearnApis());
    this.words$ = this.store.pipe(select(fromStore.selectAllLearningWords));
  }

  onSelectionChange(record) {
    console.log(record);
    this.store.dispatch(new RecordWord(record));
  }

  onClickDone() {
    this.router.navigateByUrl('/learn');
  }
}
