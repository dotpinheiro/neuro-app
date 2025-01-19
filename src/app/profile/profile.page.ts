import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProfileService} from "../services/profile/profile.service";
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

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
    const currentUser = await this._userService.getCurrentUser();
    const userProfile: any = (await this._profileService.getProfiles(currentUser.id))[0];
    const { profile } = userProfile;
    this.form.patchValue({
      name: profile.name,
      age: profile.age,
      sex: profile.sex,
      height: profile.height,
      weight: profile.weight,
      medication_started_at: profile.medication_started_at
    });
  }

}
