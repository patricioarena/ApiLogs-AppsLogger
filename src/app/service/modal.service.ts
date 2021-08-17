import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalRef: BsModalRef | undefined;

  constructor(
    private modalService: BsModalService
    ) { }

  openModal(title: String, data: string) {
    this.modalRef = this.modalService.show(ModalComponent,  {
      class: 'modal-lg',
      initialState: {
        title: title,
        data: data
      }
    });
  }

}
