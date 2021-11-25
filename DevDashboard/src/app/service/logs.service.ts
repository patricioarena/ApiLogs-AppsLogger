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

  getData(enumIndex: number): Observable<Registro[]> {
    var url = this.urlCreateByAllName(enumIndex);

    return this.http.get<ResponseApi<Registro[]>>(url)
      .pipe(
        map((res: any) => {
          return res.data as any;
        }),
        catchError(this.handleError<any>('Intentando obtener registros.'))
      );
  }

  getMoreInformation(id: number): Observable<RegistroDetalle> {
    var url = `${this.apiurl}Logs/MoreInformation/${id}`;

    return this.http.get<ResponseApi<Registro>>(url)
      .pipe(
        map((res: any) => {
          return res.data[0] as any;
        }),
        catchError(this.handleError<any>('Intentando obtener registro.'))
      );
  }




  // console.log(this.appName);
  // console.log(this.username);
  // console.log(this.range.value);
  // console.log(this.range.value.start);
  // console.log(this.range.value.end);

  advancedSearch(
    appKeyOfEnumApplication: number,
    username: string,
    startDate: string,
    endDate: string
  ): Observable<Registro[]> {

    console.log(appKeyOfEnumApplication);
    console.log(username);
    console.log(startDate);
    console.log(endDate);

    var url = this.urlCreateByAllName(appKeyOfEnumApplication);

    if (username !== null) {
      url = url + `&username=${username}`
    }

    if (startDate !== null) {
      url = url + `&startDate=${startDate}`
    }

    if (startDate !== null) {
      url = url + `&endDate=${endDate}`
    }

    return this.http.get<ResponseApi<Registro[]>>(url)
      .pipe(
        map((res: any) => {
          return res.data as any;
        }),
        catchError(this.handleError<any>('Intentando obtener registros.'))
      );
  }



  private urlCreateByAllName(enumIndex: number): string {
    switch (Number(enumIndex)) {
      case 0: {
        return `${this.apiurl}Logs?appname=`;
      }
      case Application.MiCartera: {
        return `${this.apiurl}Logs?appname=abogados`;
      }
      case Application.Distribucion: {
        return `${this.apiurl}Logs?appname=distribucion`;
      }
      case Application.Registro_De_Juicios: {
        return `${this.apiurl}Logs?appname=registro`;
      }
      case Application.Calendario: {
        return `${this.apiurl}Logs?appname=calendario`;
      }
    }
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
