import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private _supabaseClient: SupabaseClient,
    private _router: Router
  ) {
    this._supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log('event', event);
      console.log('session', session);
      // if(event === 'SIGNED_IN') {
      //   console.log('User signed in');
      //   this._router.navigate(['/tabs']);
      // }
    });
  }
}
