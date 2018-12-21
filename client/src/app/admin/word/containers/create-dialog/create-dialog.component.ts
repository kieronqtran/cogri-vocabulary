import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Word } from '../../models/word';
import {
  ActionWordPageOpenCreateDialog,
  ActionWordPageCreateOne,
} from '../../actions/word-page.actions';

@Component({
  selector: 'anms-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss'],
})
export class CreateDialogComponent implements OnInit {
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
    private readonly dialogRef: MatDialogRef<CreateDialogComponent>,
  ) {
    this.form = fb.group({
      word: [''],
      vietnameseMeaning: [''],
      similarWords: fb.array([fb.control('')]),
      examples: fb.array([fb.control('')]),
    });
  }

  ngOnInit() {}

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
        new ActionWordPageCreateOne({ entity: this.form.value }),
      );
      this.dialogRef.close();
    }
  }
}
