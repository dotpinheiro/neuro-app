import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-privacy-policy-modal',
  templateUrl: './privacy-policy-modal.component.html',
  styleUrls: ['./privacy-policy-modal.component.scss'],
})
export class PrivacyPolicyModalComponent  implements OnInit {

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
