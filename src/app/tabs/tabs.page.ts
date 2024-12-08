import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
      console.log('TabsPage');
  }

  signOut() {
    this._authService.signOut();
  }

}
