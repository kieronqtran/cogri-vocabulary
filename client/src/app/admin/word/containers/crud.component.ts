import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { Observable, of, concat, from } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import { AppState as State } from '@app/core/core.state';
import { Word } from '../models/word';
import {
  ActionLoadNextPage,
  ActionLoadWordPage,
  ActionWordPageDeleteOne,
  ActionWordPageOpenUpdateDialog,
  ActionWordPageOpenCreateDialog,
  ActionWordPageOpenDeleteDialog,
} from '../actions/word-page.actions';
import { selectAllWords } from '../reducers';

@Component({
  selector: 'anms-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  words$: Observable<Word[]> = this.store.pipe(select(selectAllWords));

  constructor(public store: Store<State>, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.store.dispatch(new ActionLoadWordPage());
  }

  onClickCreate() {
    this.store.dispatch(new ActionWordPageOpenCreateDialog());
  }

  onClickDelete(id: number) {
    this.store.dispatch(new ActionWordPageOpenDeleteDialog({ id }));
  }

  onClickUpdate(id: number) {
    this.store.dispatch(new ActionWordPageOpenUpdateDialog({ id }));
  }

  nextCollection() {
    this.store.dispatch(new ActionLoadNextPage());
  }
}
