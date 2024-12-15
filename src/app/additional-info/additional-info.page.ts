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
  medicationStartDate: string = '';

  userId: string = '123';

  constructor(private _router: Router, private userService: UserService) {}

  ngOnInit() {}

  async submit() {
    const userData = {
      full_name: this.fullName,
      age: this.age,
      gender: this.gender,
      height: this.height,
      weight: this.weight,
      medication_start_date: this.medicationStartDate,
    };

    try {
      const updatedUser = await this.userService.updateUser(
        this.userId,
        userData
      );
      console.log('User updated:', updatedUser);
      this._router.navigate(['/home']);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
}
