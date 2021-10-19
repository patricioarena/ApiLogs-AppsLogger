import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Registro } from '../models/registro';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  title: String | undefined;
  data: Registro | undefined;

  constructor(
    public modalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

}
