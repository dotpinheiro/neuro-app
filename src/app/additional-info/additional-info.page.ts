import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../services/profile/profile.service";
import {ProfileInterface} from "../services/profile/profile.interface";
@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.page.html',
  styleUrls: ['./additional-info.page.scss'],
})
export class AdditionalInfoPage implements OnInit {
  isLoading = false;

  form: FormGroup;

  constructor(
    private _router: Router,
    private _profileService: ProfileService,
    private _userService: UserService,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      name: [null, Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      sex: [null, Validators.required],
      height: [null, [Validators.required, Validators.min(0)]],
      weight: [null, [Validators.required, Validators.min(0)]],
      medication_started_at: [new Date().toISOString(), Validators.required]
    })
  }

  async ngOnInit() {
    try{
      this.isLoading = true;
      const user = await this._userService.getCurrentUser();
      this.form.patchValue({
        name: user.user_metadata['full_name'] || '',
      })
    }catch(e){
      console.error('Error getting user data:', e);
    }finally {
      this.isLoading = false;
    }
  }


  async submit() {
    if(!this.form.valid){
      return;
    }
    try{
      this.isLoading = true;
      const userData: ProfileInterface = this.form.value as ProfileInterface;
      await this._profileService.createProfile(userData);
      await this._router.navigate(['/tabs/medications']);
    }catch (e: any){
     console.error('Error creating profile:', e);
    }
    finally {
      this.isLoading = false;
    }

  }
}
