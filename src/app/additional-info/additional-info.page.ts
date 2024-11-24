import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.page.html',
  styleUrls: ['./additional-info.page.scss'],
})
export class AdditionalInfoPage implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit() {}

  signIn() {
    this._router.navigate(['/tabs']);
  }
}
