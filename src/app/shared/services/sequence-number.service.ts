import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShellDomainProvider } from '@ecap3/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SequenceNumberService {

  readonly commonOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
    observe: 'response',
  };

  constructor(
    private http: HttpClient
  ) { }

  getNextNumber(context: string) {
    const url = ShellDomainProvider['api'].SequenceNumberService + `Next?Context=${context}`;
    return this.http.get(url, this.commonOptions).pipe(map((response: any) => response.body));
  }
}
