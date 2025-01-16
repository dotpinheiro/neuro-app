import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.page.html',
  styleUrls: ['./additional-info.page.scss'],
})
export class AdditionalInfoPage implements OnInit {
  fullName: string = '';
  age: number | null = null;
  gender: string = '';
  height: number | null = null;
  weight: number | null = null;
  medicationStartDate: string | null = new Date().toISOString();

  constructor(private _router: Router, private userService: UserService) {}

  ngOnInit() {}

  async submit() {
    const userData = {
      name: this.fullName,
      age: this.age,
      sex: this.gender,
      height: this.height,
      weight: this.weight,
      medication_started_at: this.medicationStartDate,
    };

    try {
      const updatedUser = await this.userService.updateUser(userData);
      console.log('User updated:', updatedUser);
      this._router.navigate(['/home']);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
}
