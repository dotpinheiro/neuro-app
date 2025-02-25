import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';
import {ProfileService} from "./services/profile/profile.service";
import { requestForToken } from 'src/firebase';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private _supabaseClient: SupabaseClient,
    private _profileService: ProfileService,
    private _router: Router
  ) {
  }

  async ngOnInit() {
    requestForToken();

    this._supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if(event === 'INITIAL_SESSION' && session !== null) {
        console.log('User signed in');
        const profiles = await this._profileService.getProfiles(session.user.id);
        console.log(profiles);
        if(profiles.length > 0) {
          // if(this._router.url.includes('auth')){
            await this._router.navigate(['/tabs/home']);
          // }
          return;
        }
        await this._router.navigate(['/additional-info']);
      }
    });
  }
}
