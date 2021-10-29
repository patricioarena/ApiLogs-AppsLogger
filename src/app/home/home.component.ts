import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// import { NgxSpinnerService } from 'ngx-spinner';
import { TitleService } from '../service/title.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
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
  public displayedColumns = ['id', 'timestamp', 'username', 'requestMethod', 'urlRequestFrontend', 'urlRequestBackend', 'statusCode', 'aplicacion', 'backendResponse'];
  public displayedColumnsNivel = ['valor', 'level', 'descripcion'];
  public dataSource = new MatTableDataSource<Registro>();
  public application: Array<string> = Object.keys(Application).filter(key => isNaN(+key));
  public appName: String;
  public username: String;
  public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

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
    this.loadData(Application.Todas);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public isVisible(exception: string){
    if(exception == ''|| exception == 'System.Exception'){
      return false;
    }return true;
  }

  public openModal(exception: Registro) {

    var titleModal = `Id: ${exception.id}, Time: ${exception.timestamp}, Username: ${exception.username}`


    this.logsService.getMoreInformation(exception.id).subscribe(data => {
      this.modalService.openModal(titleModal, data);
    });

  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public loadData(enumIndex: Number) {
    this.dataSource.filter = '';
    this.logsService.getData(Number(enumIndex)).subscribe(data => {
      this.dataSource = new MatTableDataSource<Registro> (data);
      this.cdr.detectChanges();
    });
  }

  public splitString(param:String) {
    return param.replace("T", "\n")
  }

  public radioChange(param){
    this.appName = param;
  }

  public setParamSearch(param){
    this.username = param;
  }

  public advancedSearch(){
    console.log(this.appName);
    console.log(this.username);
    console.log(this.range.value);
    console.log(this.range.value.start);
    console.log(this.range.value.end);

  }


}

