import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Word } from '../../models/word';

@Component({
  selector: 'anms-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordFormComponent implements OnInit {
  @Input() data: Word;

  @Output() submit = new EventEmitter<Word>();

  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    const similarWordsForm = this.data.similarWords.map(e =>
      this.fb.control(e),
    );
    const examplesForm = this.data.examples.map(e => this.fb.control(e));
    this.form = this.fb.group({
      id: [this.data.id],
      word: [this.data.word],
      vietnameseMeaning: [this.data.vietnameseMeaning],
      similarWords: this.fb.array(similarWordsForm),
      examples: this.fb.array(examplesForm),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    }
  }
}
