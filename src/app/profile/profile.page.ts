import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileInterface } from '../services/profile/profile.interface';
import { ProfileService } from '../services/profile/profile.service';
import { ToastService } from '../services/toast/toast.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  form: FormGroup;
  isLoading = false;
  isLoadingUserInfo = true;

  constructor(
    private _router: Router,
    private _profileService: ProfileService,
    private _userService: UserService,
    private _fb: FormBuilder,
    private _toastService: ToastService
  ) {
    this.form = this._fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      sex: [null, Validators.required],
      height: [null, [Validators.required, Validators.min(0)]],
      weight: [null, [Validators.required, Validators.min(0)]],
      medication_started_at: [new Date().toISOString(), Validators.required],
      img: [''],
    });
  }
  async ngOnInit() {
    try {

      const currentUser = await this._userService.getCurrentUser();
      const userProfile: any = (
        await this._profileService.getProfiles(currentUser.id)
      )[0];
      const { profile } = userProfile;
      this.form.patchValue({
        id: userProfile.profile_id,
        name: profile.name,
        age: profile.age,
        sex: profile.sex,
        height: profile.height,
        weight: profile.weight,
        medication_started_at: profile.medication_started_at,
        img: profile.img || currentUser.user_metadata['avatar_url'] || 'assets/img/profile-placeholder.webp',
      });
    } catch (error) {
      this._toastService.presentToast(
        'Erro ao mostrar informações',
        undefined,
        'top',
        'danger'
      );
    }finally{
      this.isLoadingUserInfo = false
    }
  }

  async submit() {
    if (!this.form.valid) {
      return;
    }
    try {
      this.isLoading = true;
      const userData: ProfileInterface = this.form.value as ProfileInterface;
      await this._profileService.updateProfile(userData);
      this._toastService.presentToast(
        'Atualizado com sucesso',
        undefined,
        'top'
      );
      await this._router.navigate(['/tabs/home']);
    } catch (e: any) {
      console.error('Error updating profile:', e);
    } finally {
      this.isLoading = false;
    }
  }
}
