import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LogViewComponent } from './log-view/log-view.component'
import { ModalComponent } from "./modal/modal.component";
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'
import { ModalModule } from "ngx-bootstrap/modal";
import { ModalService } from './service/modal.service';
import { LogsService } from './service/logs.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ChangeRolesComponent } from './change-roles/change-roles.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogViewComponent,
    FooterComponent,
    ModalComponent,
    ChangeRolesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    ModalModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ModalService,
    LogsService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
