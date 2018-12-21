import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Word } from '../../models/word';
import { ActionWordPageUpdateOne } from '../../actions/word-page.actions';

@Component({
  selector: 'anms-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss'],
})
export class UpdateDialogComponent implements OnInit {
  form: FormGroup;

  get similarWords() {
    return this.form.get('similarWords') as FormArray;
  }

  get examples() {
    return this.form.get('examples') as FormArray;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<State>,
    private readonly dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Word,
  ) {
    this.form = fb.group({
      id: [data.id],
      word: [data.word],
      vietnameseMeaning: [data.vietnameseMeaning],
      similarWords: fb.array([]),
      examples: fb.array([]),
    });
    data.similarWords.forEach(e => {
      const list = this.form.controls.similarWords as FormArray;
      list.push(fb.control(e));
    });
    data.examples.forEach(e => {
      const list = this.form.controls.examples as FormArray;
      list.push(fb.control(e));
    });
  }

  ngOnInit(): void {}

  addNewSimilarWords() {
    this.similarWords.push(this.fb.control(''));
  }

  addNewExamples() {
    this.examples.push(this.fb.control(''));
  }

  deleteSimilarWord(index: number) {
    this.similarWords.removeAt(index);
  }

  deleteExample(index: number) {
    this.examples.removeAt(index);
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid) {
      this.store.dispatch(
        new ActionWordPageUpdateOne({ entity: this.form.value }),
      );
      this.dialogRef.close();
    }
  }
}
