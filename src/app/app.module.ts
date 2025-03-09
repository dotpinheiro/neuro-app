import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.prod';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FeedbackFormComponent} from "./components/feedback-form/feedback-form.component";


const SUPABASE_URL = environment.supabaseURL;
const SUPABASE_KEY = environment.supabaseKey;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
@NgModule({
  declarations: [AppComponent, FeedbackFormComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: SupabaseClient, useValue: supabase }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
