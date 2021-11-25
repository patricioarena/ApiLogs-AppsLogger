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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-log-view',
  templateUrl: './log-view.component.html',
  styleUrls: ['./log-view.component.scss']
})

export class LogViewComponent implements OnInit {

  public title: string | undefined;
  public isEnabledBtn = false;
  public displayedColumns = ['id', 'timestamp', 'username', 'requestMethod', 'urlRequestFrontend', 'urlRequestBackend', 'statusCode', 'aplicacion', 'backendResponse'];
  public dataSource = new MatTableDataSource<Registro>();
  public application: Array<string> = Object.keys(Application).filter(key => isNaN(+key));
  public advancedSearchForm = new FormGroup({
    appname: new FormControl(),
    username: new FormControl(),
    start: new FormControl(),
    end: new FormControl()
  });

  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  constructor(
    // public spinner: NgxSpinnerService,
    private titleServive: TitleService,
    private modalService: ModalService,
    private logsService: LogsService,
    private cdr: ChangeDetectorRef,
    private  datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.advancedSearchForm.get('appname').setValue(0)
    this.title = this.titleServive.APP_TITLE;
    this.loadData(Application.Todas);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public isVisible(exception: string) {
    if (exception == '' || exception == 'System.Exception') {
      return false;
    } return true;
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

  public loadData(enumIndex: number) {
    this.dataSource.filter = '';
    this.logsService.getData(enumIndex).subscribe(data => {
      this.dataSource = new MatTableDataSource<Registro>(data);
      this.cdr.detectChanges();
    });
  }

  public splitString(param: string) {
    return param.replace("T", "\n")
  }

  public advancedSearch() {
    let appname = this.advancedSearchForm.value.appname;
    let username = this.advancedSearchForm.value.username;
    let startDateAux = this.advancedSearchForm.value.start;
    let endDateAux = this.advancedSearchForm.value.end;

    let startDate = this.datepipe.transform(startDateAux, 'yyyy/MM/dd');
    let endDate =this.datepipe.transform(endDateAux, 'yyyy/MM/dd');

    console.log(appname);
    console.log(username);
    console.log(startDate);
    console.log(endDate);


    this.logsService.advancedSearch(appname, username, startDate, endDate)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<Registro>(data);
        this.cdr.detectChanges();
      });


  }


}

