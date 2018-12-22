import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Word } from '@app/admin/word/models/word';

const API = `${environment.apiUrl}/word/v1`;

@Injectable({
  providedIn: 'root',
})
export class LearnService {
  constructor(private httpClient: HttpClient) {}

  getRandom(): Observable<Word[]> {
    return this.httpClient.get<Word[]>(`${API}/random`);
  }
}
