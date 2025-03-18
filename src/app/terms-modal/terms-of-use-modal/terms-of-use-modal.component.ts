import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-terms-of-use-modal',
  templateUrl: './terms-of-use-modal.component.html',
  styleUrls: ['./terms-of-use-modal.component.scss'],
})
export class TermsOfUseModalComponent  implements OnInit {

  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  closeModal(event: MouseEvent) {
    const modalContent = document.querySelector('.modal-content');
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

}
