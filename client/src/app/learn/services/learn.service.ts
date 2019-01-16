import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Word } from '@app/admin/word/models/word';
import { NewRecord } from '../models/learn.model';

const API = `${environment.apiUrl}/learner`;

@Injectable({
  providedIn: 'root',
})
export class LearnService {
  constructor(private httpClient: HttpClient) {}

  getLearningWords(mode: string, userId: string): Observable<Word[]> {
    if (mode === 'random') {
      return this.httpClient.get<Word[]>(`${API}/randomWords/${userId}`);
    }
    if (mode === 'sequence') {
      return this.httpClient.get<Word[]>(`${API}/sequenceWords/${userId}`);
    }
    return of([]);
  }

  createRecord(record: NewRecord) {
    return this.httpClient.post(`${API}/addRecord`, record);
  }
}
