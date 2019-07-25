import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AdimaProvider } from '../providers/adima/adima';
import { ListPage } from '../pages/list/list';
import { AssociatePage } from '../pages/associate/associate';
import { MakeRequestPage } from '../pages/make-request/make-request';
// import { Stripe } from '@ionic-native/stripe';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { Stripe } from '@ionic-native/stripe';
import { ProfilePage } from '../pages/profile/profile';
import { FCM } from '@ionic-native/fcm';
import { MakepaymentPage } from '../pages/makepayment/makepayment';
import { PayPage } from '../pages/pay/pay';
import { OnboardingPage } from '../pages/onboarding/onboarding';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ListPage,
    AssociatePage,
    MakeRequestPage,
    MakepaymentPage,
    ProfilePage,
    PayPage,
    OnboardingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ListPage,
    AssociatePage,
    MakeRequestPage,
    ProfilePage,
    MakepaymentPage,
    PayPage,
    OnboardingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Stripe,
    HttpClient,
    FCM,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AdimaProvider
  ]
})
export class AppModule { }
