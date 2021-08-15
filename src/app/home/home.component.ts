import { Component, OnInit, ViewChild } from '@angular/core';
// import { NgxSpinnerService } from 'ngx-spinner';
import { TitleService } from '../service/title.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { registro } from '../models/model';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  title: String | undefined;
  isEnabled = false;

  public displayedColumns = ['id', 'timestamp', 'level', 'renderedMessage', 'properties', 'exception'];
  public dataSource = new MatTableDataSource<registro>();

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    // public spinner: NgxSpinnerService,
    private titleServive: TitleService,
    private modalService: ModalService

  ) { }

  ngOnInit() {
    this.title = this.titleServive.APP_TITLE;

    let res = [
      {
        "id": 1,
        "timestamp": "2021-08-12T16:03:27",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom')",
        "renderedMessage": "Solo estoy probando el mensaje personalizado ...",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"9bbc54c7-bac1-415c-aaa9-dad7157f2bb0\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Get (ApiBackend)\",\"RequestId\":\"800000f4-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error/Solo%20estoy%20probando%20el%20mensaje%20personalizado%20...\",\"SpanId\":\"|6f9e8a95-400f38cc5430008a.\",\"TraceId\":\"6f9e8a95-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 2,
        "timestamp": "2021-08-12T16:03:46",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom con nombre de usuario')\r\n   at ApiBackend.Controllers.TestLoggerController.Error() in D:\\Codigo\\GestionItegralDeJuicios\\Abogados\\ApiBackend\\Controllers\\TestLogger.cs:line 43",
        "renderedMessage": "FISCALIA\\parena",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"05a9ed17-977a-4009-9e7a-4eac6d8419ae\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Error (ApiBackend)\",\"RequestId\":\"800000f6-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error\",\"SpanId\":\"|6f9e8a96-400f38cc5430008a.\",\"TraceId\":\"6f9e8a96-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 3,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Using an in-memory repository. Keys will not be persisted to storage.",
        "properties": "{\"EventId\":{\"Id\":50},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.Repositories.EphemeralXmlRepository\"}"
      },
      {
        "id": 4,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Neither user profile nor HKLM registry available. Using an ephemeral key repository. Protected data will be unavailable when application exits.",
        "properties": "{\"EventId\":{\"Id\":59},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      }
    ];

    this.dataSource.data = res as registro[];

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public test(params:any) {
    console.log(params);
    this.modalService.openModal('Excepción',params);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public loadData(params:any){

    if (params == 'micartera') {
      console.log('traer logs de micartera');
    }

    if (params == 'distribucion') {
      console.log('traer logs de distribucion');
    }

    let res = [
      {
        "id": 1,
        "timestamp": "2021-08-12T16:03:27",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom')",
        "renderedMessage": "Solo estoy probando el mensaje personalizado ...",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"9bbc54c7-bac1-415c-aaa9-dad7157f2bb0\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Get (ApiBackend)\",\"RequestId\":\"800000f4-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error/Solo%20estoy%20probando%20el%20mensaje%20personalizado%20...\",\"SpanId\":\"|6f9e8a95-400f38cc5430008a.\",\"TraceId\":\"6f9e8a95-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 2,
        "timestamp": "2021-08-12T16:03:46",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom con nombre de usuario')\r\n   at ApiBackend.Controllers.TestLoggerController.Error() in D:\\Codigo\\GestionItegralDeJuicios\\Abogados\\ApiBackend\\Controllers\\TestLogger.cs:line 43",
        "renderedMessage": "FISCALIA\\parena",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"05a9ed17-977a-4009-9e7a-4eac6d8419ae\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Error (ApiBackend)\",\"RequestId\":\"800000f6-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error\",\"SpanId\":\"|6f9e8a96-400f38cc5430008a.\",\"TraceId\":\"6f9e8a96-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 3,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Using an in-memory repository. Keys will not be persisted to storage.",
        "properties": "{\"EventId\":{\"Id\":50},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.Repositories.EphemeralXmlRepository\"}"
      },
      {
        "id": 4,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Neither user profile nor HKLM registry available. Using an ephemeral key repository. Protected data will be unavailable when application exits.",
        "properties": "{\"EventId\":{\"Id\":59},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 5,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "No XML encryptor configured. Key {KeyId:B} may be persisted to storage in unencrypted form.",
        "properties": "{\"KeyId\":\"428fef45-61d8-4708-b72d-7a173f801dad\",\"EventId\":{\"Id\":35},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 6,
        "timestamp": "2021-08-12T15:03:27",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom')",
        "renderedMessage": "Solo estoy probando el mensaje personalizado ...",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"9bbc54c7-bac1-415c-aaa9-dad7157f2bb0\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Get (ApiBackend)\",\"RequestId\":\"800000f4-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error/Solo%20estoy%20probando%20el%20mensaje%20personalizado%20...\",\"SpanId\":\"|6f9e8a95-400f38cc5430008a.\",\"TraceId\":\"6f9e8a95-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 7,
        "timestamp": "2021-08-12T16:03:46",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom con nombre de usuario')\r\n   at ApiBackend.Controllers.TestLoggerController.Error() in D:\\Codigo\\GestionItegralDeJuicios\\Abogados\\ApiBackend\\Controllers\\TestLogger.cs:line 43",
        "renderedMessage": "FISCALIA\\parena",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"05a9ed17-977a-4009-9e7a-4eac6d8419ae\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Error (ApiBackend)\",\"RequestId\":\"800000f6-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error\",\"SpanId\":\"|6f9e8a96-400f38cc5430008a.\",\"TraceId\":\"6f9e8a96-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 8,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Using an in-memory repository. Keys will not be persisted to storage.",
        "properties": "{\"EventId\":{\"Id\":50},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.Repositories.EphemeralXmlRepository\"}"
      },
      {
        "id": 9,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Neither user profile nor HKLM registry available. Using an ephemeral key repository. Protected data will be unavailable when application exits.",
        "properties": "{\"EventId\":{\"Id\":59},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 10,
        "timestamp": "2021-08-12T16:03:27",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom')",
        "renderedMessage": "Solo estoy probando el mensaje personalizado ...",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"9bbc54c7-bac1-415c-aaa9-dad7157f2bb0\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Get (ApiBackend)\",\"RequestId\":\"800000f4-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error/Solo%20estoy%20probando%20el%20mensaje%20personalizado%20...\",\"SpanId\":\"|6f9e8a95-400f38cc5430008a.\",\"TraceId\":\"6f9e8a95-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 11,
        "timestamp": "2021-08-12T16:03:46",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom con nombre de usuario')\r\n   at ApiBackend.Controllers.TestLoggerController.Error() in D:\\Codigo\\GestionItegralDeJuicios\\Abogados\\ApiBackend\\Controllers\\TestLogger.cs:line 43",
        "renderedMessage": "FISCALIA\\parena",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"05a9ed17-977a-4009-9e7a-4eac6d8419ae\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Error (ApiBackend)\",\"RequestId\":\"800000f6-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error\",\"SpanId\":\"|6f9e8a96-400f38cc5430008a.\",\"TraceId\":\"6f9e8a96-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 12,
        "timestamp": "2021-08-12T16:03:46",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom con nombre de usuario')\r\n   at ApiBackend.Controllers.TestLoggerController.Error() in D:\\Codigo\\GestionItegralDeJuicios\\Abogados\\ApiBackend\\Controllers\\TestLogger.cs:line 43",
        "renderedMessage": "FISCALIA\\parena",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"05a9ed17-977a-4009-9e7a-4eac6d8419ae\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Error (ApiBackend)\",\"RequestId\":\"800000f6-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error\",\"SpanId\":\"|6f9e8a96-400f38cc5430008a.\",\"TraceId\":\"6f9e8a96-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 13,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Using an in-memory repository. Keys will not be persisted to storage.",
        "properties": "{\"EventId\":{\"Id\":50},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.Repositories.EphemeralXmlRepository\"}"
      },
      {
        "id": 14,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Neither user profile nor HKLM registry available. Using an ephemeral key repository. Protected data will be unavailable when application exits.",
        "properties": "{\"EventId\":{\"Id\":59},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 15,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "No XML encryptor configured. Key {KeyId:B} may be persisted to storage in unencrypted form.",
        "properties": "{\"KeyId\":\"428fef45-61d8-4708-b72d-7a173f801dad\",\"EventId\":{\"Id\":35},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 16,
        "timestamp": "2021-08-12T15:03:27",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom')",
        "renderedMessage": "Solo estoy probando el mensaje personalizado ...",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"9bbc54c7-bac1-415c-aaa9-dad7157f2bb0\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Get (ApiBackend)\",\"RequestId\":\"800000f4-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error/Solo%20estoy%20probando%20el%20mensaje%20personalizado%20...\",\"SpanId\":\"|6f9e8a95-400f38cc5430008a.\",\"TraceId\":\"6f9e8a95-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 17,
        "timestamp": "2021-08-12T16:03:46",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom con nombre de usuario')\r\n   at ApiBackend.Controllers.TestLoggerController.Error() in D:\\Codigo\\GestionItegralDeJuicios\\Abogados\\ApiBackend\\Controllers\\TestLogger.cs:line 43",
        "renderedMessage": "FISCALIA\\parena",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"05a9ed17-977a-4009-9e7a-4eac6d8419ae\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Error (ApiBackend)\",\"RequestId\":\"800000f6-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error\",\"SpanId\":\"|6f9e8a96-400f38cc5430008a.\",\"TraceId\":\"6f9e8a96-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 18,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Using an in-memory repository. Keys will not be persisted to storage.",
        "properties": "{\"EventId\":{\"Id\":50},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.Repositories.EphemeralXmlRepository\"}"
      },
      {
        "id": 19,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Neither user profile nor HKLM registry available. Using an ephemeral key repository. Protected data will be unavailable when application exits.",
        "properties": "{\"EventId\":{\"Id\":59},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 20,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "No XML encryptor configured. Key {KeyId:B} may be persisted to storage in unencrypted form.",
        "properties": "{\"KeyId\":\"428fef45-61d8-4708-b72d-7a173f801dad\",\"EventId\":{\"Id\":35},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 21,
        "timestamp": "2021-08-12T16:03:27",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom')",
        "renderedMessage": "Solo estoy probando el mensaje personalizado ...",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"9bbc54c7-bac1-415c-aaa9-dad7157f2bb0\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Get (ApiBackend)\",\"RequestId\":\"800000f4-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error/Solo%20estoy%20probando%20el%20mensaje%20personalizado%20...\",\"SpanId\":\"|6f9e8a95-400f38cc5430008a.\",\"TraceId\":\"6f9e8a95-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 22,
        "timestamp": "2021-08-12T16:03:46",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom con nombre de usuario')\r\n   at ApiBackend.Controllers.TestLoggerController.Error() in D:\\Codigo\\GestionItegralDeJuicios\\Abogados\\ApiBackend\\Controllers\\TestLogger.cs:line 43",
        "renderedMessage": "FISCALIA\\parena",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"05a9ed17-977a-4009-9e7a-4eac6d8419ae\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Error (ApiBackend)\",\"RequestId\":\"800000f6-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error\",\"SpanId\":\"|6f9e8a96-400f38cc5430008a.\",\"TraceId\":\"6f9e8a96-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 23,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Using an in-memory repository. Keys will not be persisted to storage.",
        "properties": "{\"EventId\":{\"Id\":50},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.Repositories.EphemeralXmlRepository\"}"
      },
      {
        "id": 24,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Neither user profile nor HKLM registry available. Using an ephemeral key repository. Protected data will be unavailable when application exits.",
        "properties": "{\"EventId\":{\"Id\":59},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 25,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "No XML encryptor configured. Key {KeyId:B} may be persisted to storage in unencrypted form.",
        "properties": "{\"KeyId\":\"428fef45-61d8-4708-b72d-7a173f801dad\",\"EventId\":{\"Id\":35},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 26,
        "timestamp": "2021-08-12T16:03:27",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom')",
        "renderedMessage": "Solo estoy probando el mensaje personalizado ...",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"9bbc54c7-bac1-415c-aaa9-dad7157f2bb0\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Get (ApiBackend)\",\"RequestId\":\"800000f4-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error/Solo%20estoy%20probando%20el%20mensaje%20personalizado%20...\",\"SpanId\":\"|6f9e8a95-400f38cc5430008a.\",\"TraceId\":\"6f9e8a95-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 27,
        "timestamp": "2021-08-12T16:03:46",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom con nombre de usuario')\r\n   at ApiBackend.Controllers.TestLoggerController.Error() in D:\\Codigo\\GestionItegralDeJuicios\\Abogados\\ApiBackend\\Controllers\\TestLogger.cs:line 43",
        "renderedMessage": "FISCALIA\\parena",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"05a9ed17-977a-4009-9e7a-4eac6d8419ae\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Error (ApiBackend)\",\"RequestId\":\"800000f6-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error\",\"SpanId\":\"|6f9e8a96-400f38cc5430008a.\",\"TraceId\":\"6f9e8a96-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 28,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Using an in-memory repository. Keys will not be persisted to storage.",
        "properties": "{\"EventId\":{\"Id\":50},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.Repositories.EphemeralXmlRepository\"}"
      },
      {
        "id": 29,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Neither user profile nor HKLM registry available. Using an ephemeral key repository. Protected data will be unavailable when application exits.",
        "properties": "{\"EventId\":{\"Id\":59},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 30,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "No XML encryptor configured. Key {KeyId:B} may be persisted to storage in unencrypted form.",
        "properties": "{\"KeyId\":\"428fef45-61d8-4708-b72d-7a173f801dad\",\"EventId\":{\"Id\":35},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 31,
        "timestamp": "2021-08-12T16:03:27",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom')",
        "renderedMessage": "Solo estoy probando el mensaje personalizado ...",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"9bbc54c7-bac1-415c-aaa9-dad7157f2bb0\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Get (ApiBackend)\",\"RequestId\":\"800000f4-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error/Solo%20estoy%20probando%20el%20mensaje%20personalizado%20...\",\"SpanId\":\"|6f9e8a95-400f38cc5430008a.\",\"TraceId\":\"6f9e8a95-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 32,
        "timestamp": "2021-08-12T16:03:46",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom con nombre de usuario')\r\n   at ApiBackend.Controllers.TestLoggerController.Error() in D:\\Codigo\\GestionItegralDeJuicios\\Abogados\\ApiBackend\\Controllers\\TestLogger.cs:line 43",
        "renderedMessage": "FISCALIA\\parena",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"05a9ed17-977a-4009-9e7a-4eac6d8419ae\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Error (ApiBackend)\",\"RequestId\":\"800000f6-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error\",\"SpanId\":\"|6f9e8a96-400f38cc5430008a.\",\"TraceId\":\"6f9e8a96-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 33,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Using an in-memory repository. Keys will not be persisted to storage.",
        "properties": "{\"EventId\":{\"Id\":50},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.Repositories.EphemeralXmlRepository\"}"
      },
      {
        "id": 34,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Neither user profile nor HKLM registry available. Using an ephemeral key repository. Protected data will be unavailable when application exits.",
        "properties": "{\"EventId\":{\"Id\":59},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 35,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "No XML encryptor configured. Key {KeyId:B} may be persisted to storage in unencrypted form.",
        "properties": "{\"KeyId\":\"428fef45-61d8-4708-b72d-7a173f801dad\",\"EventId\":{\"Id\":35},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 36,
        "timestamp": "2021-08-12T16:03:27",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom')",
        "renderedMessage": "Solo estoy probando el mensaje personalizado ...",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"9bbc54c7-bac1-415c-aaa9-dad7157f2bb0\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Get (ApiBackend)\",\"RequestId\":\"800000f4-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error/Solo%20estoy%20probando%20el%20mensaje%20personalizado%20...\",\"SpanId\":\"|6f9e8a95-400f38cc5430008a.\",\"TraceId\":\"6f9e8a95-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 37,
        "timestamp": "2021-08-12T16:03:46",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom con nombre de usuario')\r\n   at ApiBackend.Controllers.TestLoggerController.Error() in D:\\Codigo\\GestionItegralDeJuicios\\Abogados\\ApiBackend\\Controllers\\TestLogger.cs:line 43",
        "renderedMessage": "FISCALIA\\parena",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"05a9ed17-977a-4009-9e7a-4eac6d8419ae\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Error (ApiBackend)\",\"RequestId\":\"800000f6-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error\",\"SpanId\":\"|6f9e8a96-400f38cc5430008a.\",\"TraceId\":\"6f9e8a96-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 38,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Using an in-memory repository. Keys will not be persisted to storage.",
        "properties": "{\"EventId\":{\"Id\":50},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.Repositories.EphemeralXmlRepository\"}"
      },
      {
        "id": 39,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Neither user profile nor HKLM registry available. Using an ephemeral key repository. Protected data will be unavailable when application exits.",
        "properties": "{\"EventId\":{\"Id\":59},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 40,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "No XML encryptor configured. Key {KeyId:B} may be persisted to storage in unencrypted form.",
        "properties": "{\"KeyId\":\"428fef45-61d8-4708-b72d-7a173f801dad\",\"EventId\":{\"Id\":35},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 41,
        "timestamp": "2021-08-12T16:03:27",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom')",
        "renderedMessage": "Solo estoy probando el mensaje personalizado ...",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"9bbc54c7-bac1-415c-aaa9-dad7157f2bb0\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Get (ApiBackend)\",\"RequestId\":\"800000f4-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error/Solo%20estoy%20probando%20el%20mensaje%20personalizado%20...\",\"SpanId\":\"|6f9e8a95-400f38cc5430008a.\",\"TraceId\":\"6f9e8a95-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 42,
        "timestamp": "2021-08-12T16:03:46",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom con nombre de usuario')\r\n   at ApiBackend.Controllers.TestLoggerController.Error() in D:\\Codigo\\GestionItegralDeJuicios\\Abogados\\ApiBackend\\Controllers\\TestLogger.cs:line 43",
        "renderedMessage": "FISCALIA\\parena",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"05a9ed17-977a-4009-9e7a-4eac6d8419ae\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Error (ApiBackend)\",\"RequestId\":\"800000f6-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error\",\"SpanId\":\"|6f9e8a96-400f38cc5430008a.\",\"TraceId\":\"6f9e8a96-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 43,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Using an in-memory repository. Keys will not be persisted to storage.",
        "properties": "{\"EventId\":{\"Id\":50},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.Repositories.EphemeralXmlRepository\"}"
      },
      {
        "id": 44,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Neither user profile nor HKLM registry available. Using an ephemeral key repository. Protected data will be unavailable when application exits.",
        "properties": "{\"EventId\":{\"Id\":59},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 45,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "No XML encryptor configured. Key {KeyId:B} may be persisted to storage in unencrypted form.",
        "properties": "{\"KeyId\":\"428fef45-61d8-4708-b72d-7a173f801dad\",\"EventId\":{\"Id\":35},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 46,
        "timestamp": "2021-08-12T16:03:27",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom')",
        "renderedMessage": "Solo estoy probando el mensaje personalizado ...",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"9bbc54c7-bac1-415c-aaa9-dad7157f2bb0\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Get (ApiBackend)\",\"RequestId\":\"800000f4-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error/Solo%20estoy%20probando%20el%20mensaje%20personalizado%20...\",\"SpanId\":\"|6f9e8a95-400f38cc5430008a.\",\"TraceId\":\"6f9e8a95-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 47,
        "timestamp": "2021-08-12T16:03:46",
        "level": "Error",
        "exception": "System.ArgumentException: ArgumentException (Parameter 'Error Custom con nombre de usuario')\r\n   at ApiBackend.Controllers.TestLoggerController.Error() in D:\\Codigo\\GestionItegralDeJuicios\\Abogados\\ApiBackend\\Controllers\\TestLogger.cs:line 43",
        "renderedMessage": "FISCALIA\\parena",
        "properties": "{\"SourceContext\":\"ApiBackend.Controllers.CustomController\",\"ActionId\":\"05a9ed17-977a-4009-9e7a-4eac6d8419ae\",\"ActionName\":\"ApiBackend.Controllers.TestLoggerController.Error (ApiBackend)\",\"RequestId\":\"800000f6-0007-ff00-b63f-84710c7967bb\",\"RequestPath\":\"/abogados/ApiBackend/api/TestLogger/error\",\"SpanId\":\"|6f9e8a96-400f38cc5430008a.\",\"TraceId\":\"6f9e8a96-400f38cc5430008a\",\"ParentId\":\"\"}"
      },
      {
        "id": 48,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Using an in-memory repository. Keys will not be persisted to storage.",
        "properties": "{\"EventId\":{\"Id\":50},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.Repositories.EphemeralXmlRepository\"}"
      },
      {
        "id": 49,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "Neither user profile nor HKLM registry available. Using an ephemeral key repository. Protected data will be unavailable when application exits.",
        "properties": "{\"EventId\":{\"Id\":59},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      },
      {
        "id": 50,
        "timestamp": "2021-08-12T16:13:41",
        "level": "Warning",
        "exception": "",
        "renderedMessage": "No XML encryptor configured. Key {KeyId:B} may be persisted to storage in unencrypted form.",
        "properties": "{\"KeyId\":\"428fef45-61d8-4708-b72d-7a173f801dad\",\"EventId\":{\"Id\":35},\"SourceContext\":\"Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager\"}"
      }

    ];

    this.dataSource.data = res as registro[];

  }
}

