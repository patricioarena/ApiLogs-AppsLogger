import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../models/response-api';
import { Registro } from '../models/registro';



@Injectable({
  providedIn: 'root'
})
export class LogsService {
  apiurl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getData(): Observable<Registro[]> {
    const url = `${this.apiurl}obtenerRegistros`
    return this.http.get<ResponseApi<Registro[]>>(url)
      .pipe(
        map((res: any) => {
          return res.data as any
        }),
        catchError(this.handleError<any>('Intentando obtener registros.'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed - agregando algo de lau
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log("entre por el handleError del servicio");
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      alert('Hay un problema de comunicacion con el servidor. ' + operation); // log to console instead
      return of(result as T);
    };
  }

}
