import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpPhoneNumberPage } from './sign-up-phone-number';

@NgModule({
  declarations: [
    SignUpPhoneNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpPhoneNumberPage),
  ],
})
export class SignUpPhoneNumberPageModule {}
