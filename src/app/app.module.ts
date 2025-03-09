import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const SUPABASE_URL = environment.supabaseURL;
const SUPABASE_KEY = environment.supabaseKey;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: SupabaseClient, useValue: supabase },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
