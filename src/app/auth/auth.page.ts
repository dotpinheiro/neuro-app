import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import {ModalController, Platform} from "@ionic/angular";
import { TermsOfUseModalComponent } from '../terms-modal/terms-of-use-modal/terms-of-use-modal.component';
import { PrivacyPolicyModalComponent } from '../terms-modal/privacy-policy-modal/privacy-policy-modal.component';
import { TermsOfUseService } from '../services/terms-of-use/terms-of-use.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  acceptTerms: boolean = false;

  constructor(
    private _authService: AuthService,
    public platform: Platform,
    private modalController: ModalController,
    private _termsService: TermsOfUseService,
    private _userService: UserService,
  ) { }

  async signIn(method: string) {
    if (!this.acceptTerms) {
        alert('Você precisa aceitar os termos de uso para continuar.');
        return;
    }

    let user;

    switch (method) {
        case 'google': {
            user = await this._authService.signInWithGoogle();
            break;
        }
        case 'facebook': {
            user = await this._authService.signInWithFacebook();
            break;
        }
        default: {
            return;
        }
    }

    if (user) {
        await this._termsService.acceptTerms(user.user.id);
    }
}

  async signOut() {
    await this._authService.signOut();
  }

  async openTerms() {
    const modal = await this.modalController.create({
      component: TermsOfUseModalComponent,
    });
    await modal.present();
  }

  async openPrivacyPolicy() {
    console.log('Abrir Política de Privacidade');
    const modal = await this.modalController.create({
      component: PrivacyPolicyModalComponent,
    });
    await modal.present();
  }
}
