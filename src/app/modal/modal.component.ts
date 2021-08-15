import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  title: String | undefined;
  data: String | undefined;

  constructor(
    public modalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

}
