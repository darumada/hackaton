import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  request(method, route, data?) {
    return this.http[method](
      environment.hostUrl + route + environment.hostEndPath,
      data
    ).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
