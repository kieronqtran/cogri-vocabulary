import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { WordListEffects } from './word-list.effects';

describe('WordListEffects', () => {
  let actions$: Observable<any>;
  let effects: WordListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordListEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.get(WordListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
