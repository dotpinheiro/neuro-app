import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';
import {Platform} from "@ionic/angular";
import {SocialLogin} from "@capgo/capacitor-social-login";
import {BehaviorSubject} from "rxjs";

enum AUTH_EVENTS {
  INITIAL_SESSION = 'INITIAL_SESSION',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT'
}

interface AuthState {
  event: AUTH_EVENTS;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authStateChanged = new BehaviorSubject<AuthState | null>(null);

  constructor(
    private _supabase: SupabaseClient,
    private _router: Router,
    private _platform: Platform
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this._platform.ready();
    await SocialLogin.initialize({
      google: {
        webClientId: '635023742546-cs1idm13h73qdidfolfa87clsfuro1bs.apps.googleusercontent.com'
      },
      facebook: {
        appId: '1100115121666873',
        clientToken: 'de8c35fbeb96d4af1a5a28e815b1f726'
      }
    });
    const user = await this._supabase.auth.getUser();
    if(user) {
      this._authStateChanged.next({
        event: AUTH_EVENTS.INITIAL_SESSION,
        data: user
      });
    }
  }

  async signInWithGoogle() {
    try {
      const socialResponse: any = await SocialLogin.login({
        provider: 'google',
        options: {}
      });

      console.log("socialResponse", socialResponse)

      const idToken = socialResponse.result?.idToken;

      console.debug("idToken", idToken)

      if (!idToken) throw new Error('Falha ao obter ID Token');

      const { data, error } = await this._supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });

      console.debug("data", data)

      if (error) throw error;

      this._authStateChanged.next({
        event: AUTH_EVENTS.SIGN_IN,
        data
      });

      return data;
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      return null;
    }
  }

  async signInWithFacebook() {

    const facebookLoginResponse: any = await SocialLogin.login({
      provider: 'facebook',
      options: {
        permissions: ['email', 'public_profile'],
        limitedLogin: true,
        nonce: 'nonce'
      },
    });

    console.log("facebookLoginResponse", facebookLoginResponse)

    const token = facebookLoginResponse.result.accessToken.token;

    if(!token) throw new Error('Falha ao obter token de acesso');

    console.log("token", token)

    const { data, error } = await this._supabase.auth.signInWithIdToken({
      provider: 'facebook',
      token,
    })

    console.log("data", data)

    if (error) throw error;

    return data;
  }

  async signOut() {
    await this._supabase.auth.signOut();
    this._authStateChanged.next({
      event: AUTH_EVENTS.SIGN_OUT,
      data: null
    });
  }

  get authStateChanged() {
    return this._authStateChanged.asObservable();
  }

}
