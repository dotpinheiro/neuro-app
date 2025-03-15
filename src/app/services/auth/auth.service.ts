import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';
import {Platform} from "@ionic/angular";
import {SocialLogin} from "@capgo/capacitor-social-login";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

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

      await this._router.navigate(['/tabs'])

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
    await this._router.navigate(['/auth']);
  }

}
