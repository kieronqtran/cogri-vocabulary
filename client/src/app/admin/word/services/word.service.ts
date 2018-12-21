import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Word } from '../models/word';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { WordPaginate } from '../models/paginate';

const API = `${environment.apiUrl}/word/v1`;

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor(private httpClient: HttpClient) {}

  getById(id: string): Observable<Word> {
    return this.httpClient.get<Word>(`${API}/${id}`);
  }

  get({
    maxResults,
    nextPageToken,
  }: {
    maxResults?: number;
    nextPageToken?: string;
  }): Observable<WordPaginate> {
    const searchParams = new URLSearchParams();
    if (maxResults) {
      searchParams.append('maxResults', maxResults.toString());
    }

    if (nextPageToken) {
      searchParams.append('nextPageToken', nextPageToken);
    }

    const url = new URL(API);
    url.search = searchParams.toString();
    return this.httpClient.get<WordPaginate>(url.toString());
  }

  create(entity: Word): Observable<Word> {
    return this.httpClient.post<Word>(API, entity);
  }

  update(id: number, entity: Word): Observable<Word> {
    return this.httpClient.put<Word>(`${API}/${id}`, entity);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${API}/${id}`);
  }
}
