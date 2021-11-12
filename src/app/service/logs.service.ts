import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../models/response-api';
import { Registro } from '../models/registro';
import { Application } from '../models/application';
import { RegistroDetalle } from '../models/registroDetalle';

@Injectable({
  providedIn: 'root'
})

export class LogsService {
  apiurl = environment.API_LOGGER;

  constructor(
    private http: HttpClient
  ) { }

  getData(enumIndex: Number): Observable<Registro[]> {
    var url = '';

    switch (enumIndex) {
      case 0: {
        url = `${this.apiurl}Logs?appname=`;
        break;
      }
      case Application.MiCartera: {
        url = `${this.apiurl}Logs?appname=abogados`;
        break;
      }
      case Application.Distribucion: {
        url = `${this.apiurl}Logs?appname=distribucion`;
        break;
      }
      case Application.Registro_De_Juicios: {
        url = `${this.apiurl}Logs?appname=registro`;
        break;
      }
      case Application.Calendario: {
        url = `${this.apiurl}Logs?appname=calendario`;
        break;
      }
    }

    return this.http.get<ResponseApi<Registro[]>>(url)
      .pipe(
        map((res: any) => {
          return res.data as any;
        }),
        catchError(this.handleError<any>('Intentando obtener registros.'))
      );
  }

  getMoreInformation(id: Number): Observable<RegistroDetalle> {
    var url = `${this.apiurl}Logs/MoreInformation/${id}`;

    return this.http.get<ResponseApi<Registro>>(url)
      .pipe(
        map((res: any) => {
          return res.data[0] as any;
        }),
        catchError(this.handleError<any>('Intentando obtener registro.'))
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
