import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user/user.service';

export interface ProfileResponse {
  id: number;
  user_id: string;
  profile_id: number;
  scope: string;
  profile: Profile;
}

export interface Profile {
  age: number;
  img: string;
  sex: string;
  name: string;
  height: number;
  weight: number;
  medication_started_at: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  currentProfile: string = '';
  profileImageUrl: string = '';
  userProfiles: ProfileResponse[] = [];
  selectedProfile: ProfileResponse | null = null;
  constructor(
    private _userService: UserService,
    private _profileService: ProfileService,
    private _alertController: AlertController,
    private _authService: AuthService,
    private _localStorage: LocalStorageService
  ) {}

  async ngOnInit() {
    this.currentProfile = await this.getCurrentUserName();
    this.profileImageUrl = await this.getCurrentUserImage();
    this.userProfiles = await this.getProfiles();
  }

  async getProfiles() {
    const user = await this._userService.getCurrentUser();
    return await this._profileService.getProfiles(user.id);
  }

  async getCurrentUserName() {
    const profile = await this._profileService.getCurrentProfile();
    const profileInfo = await this._profileService.getCurrentProfileInfo(
      profile.profile_id
    );
    return profileInfo.name;
  }

  async getCurrentUserImage() {
    const profile = await this._userService.getCurrentUser();
    return profile.user_metadata['avatar_url'];
  }
  onProfileChange(event: any) {
    console.log('Selected profile:', event.detail.value);
  }

  async openProfileSelector() {
    const alert = await this._alertController.create({
      header: 'Selecionar Perfil',
      buttons: [
        {
          text: 'Trocar conta',
          handler: () => {
            this.signOut();
            return true;
          },
        },
        {
          text: 'Trocar perfil',
          handler: (selectedProfileId) => {
            if (selectedProfileId) {
              const selectedProfile = this.userProfiles.find(
                (p) => p.id === parseInt(selectedProfileId)
              );
              if (selectedProfile) {
                this.changeProfile(selectedProfile);
              }
            }
            return true;
          },
        },
      ],
      inputs: this.userProfiles.map((profile) => ({
        type: 'radio',
        label: profile.profile.name,
        value: profile.id.toString(),
        checked: this.selectedProfile?.id === profile.id,
      })),
    });

    await alert.present();
  }

  signOut() {
    this._authService.signOut();
  }

  changeProfile(profile: ProfileResponse) {
    this._localStorage.setItem('profileId', profile.id);
    window.location.reload();
  }
}
