import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// import { NgxSpinnerService } from 'ngx-spinner';
import { TitleService } from '../service/title.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Registro } from '../models/registro';
import { ModalService } from '../service/modal.service';
import { LogsService } from '../service/logs.service';
import { Application } from '../models/application';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public title: String | undefined;
  public isEnabledBtn = false;
  public isEnabledFullTable = false;
  public displayedColumns = ['id', 'timestamp', 'level', 'renderedMessage', 'properties', 'exception'];
  public displayedColumnsNivel = ['valor', 'level', 'descripcion'];
  public dataSource = new MatTableDataSource<Registro>();
  public dataDefaults = [
    {
      "valor": 0,
      "level": "Trace",
      "descripcion": "Contiene los mensajes más detallados. Estos mensajes pueden contener datos confidenciales de la aplicación. Estos mensajes están deshabilitados de forma predeterminada y no deben habilitarse en producción."
    },
    {
      "valor": 1,
      "level": "Debug",
      "descripcion": "Para depuración y desarrollo. Úselo con precaución en la producción debido al alto volumen."
    },
    {
      "valor": 2,
      "level": "Information",
      "descripcion": "Realiza un seguimiento del flujo general de la aplicación. Puede tener valor a largo plazo."
    },
    {
      "valor": 3,
      "level": "Warning",
      "descripcion": "Para eventos anormales o inesperados. Por lo general, incluye errores o condiciones que no hacen que la aplicación falle."
    },
    {
      "valor": 4,
      "level": "Error",
      "descripcion": "Para errores y excepciones que no se pueden manejar. Estos mensajes indican una falla en la operación o solicitud actual, no una falla en toda la aplicación."
    },
    {
      "valor": 5,
      "level": "Fatal",
      "descripcion": "Para fallas que requieran atención inmediata. Ejemplos: escenarios de pérdida de datos, falta de espacio en disco."
    },
    {
      "valor": 6,
      "level": "None",
      "descripcion": "Especifica que una categoría de registro no debe escribir ningún mensaje."
    }
  ];

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource){
      this.dataSource.sort = value;
    }
  }

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }

  constructor(
    // public spinner: NgxSpinnerService,
    private titleServive: TitleService,
    private modalService: ModalService,
    private logsService: LogsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.title = this.titleServive.APP_TITLE;
    this.dataSource.data = this.dataDefaults as any[];
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public openModal(excepción: string) {
    this.modalService.openModal('Excepción', excepción);
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public loadData(app: Application) {
    this.dataSource.filter = '';
    this.logsService.getDataSQLITE(app).subscribe(data => {
      this.dataSource = new MatTableDataSource<Registro> (data);
      this.cdr.detectChanges();
      this.isEnabledFullTable = true;
    });
  }

  public loadDataDefaults() {
    this.dataSource.filter = '';
    this.dataSource.data = this.dataDefaults as any[];
    this.isEnabledFullTable = false;
  }


}

