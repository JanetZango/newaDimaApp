import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdimaProvider } from '../providers/adima/adima';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SigninPage } from '../pages/signin/signin';
import { MakeRequestPage } from '../pages/make-request/make-request';
import { OnboardingPage } from '../pages/onboarding/onboarding';

import { FCM } from '@ionic-native/fcm';
import firebase from 'firebase';
import { DonationPage } from '../pages/donation/donation';
import { OfferPage } from '../pages/offer/offer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = OnboardingPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public admina: AdimaProvider, public fcm: FCM) {
    platform.ready().then(() => {

      admina.checkstate().then((data: any) => {
        if (data == 1) {
          this.rootPage = ListPage
        }
        else {
          this.rootPage = OnboardingPage
        }
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


      // this.fcm.getToken().then((token) => {
      //   localStorage.setItem("token", token);

      // }, (erro) => {
      //   alert(JSON.stringify(erro));
      // })

   
      // Your web app's Firebase configuration
     

    
    });
  }
}

