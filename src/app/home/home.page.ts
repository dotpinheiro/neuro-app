import { Component, OnInit } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public user: any;

  constructor(private _supabaseClient: SupabaseClient) {}

  ngOnInit() {
    this._supabaseClient.auth.getUser().then((res) => {
      console.log(res);
      this.user = res.data.user?.user_metadata;
    });
  }
}
