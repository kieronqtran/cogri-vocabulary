import { MultipleChoice } from '@app/learn/models/quiz.model';
import { Word } from '@app/admin/word/models/word';

export interface Learn {
  word: Word;
  quizOne: MultipleChoice;
  quizTwo: MultipleChoice;
}

export interface NewRecord {
  userId: string,
  wordId: string,
  timeStart: Date,
  timeEnd: Date,
  totalTime: number,
}
