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
import SignupPage from '../pages/signup/signup';
import { Stripe } from '@ionic-native/stripe';
import { ProfilePage } from '../pages/profile/profile';
import { FCM } from '@ionic-native/fcm';
import { MakepaymentPage } from '../pages/makepayment/makepayment';
import { PayPage } from '../pages/pay/pay';
// import { HttpHeaders } from '@angular/common/http';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { DonationPage } from '../pages/donation/donation';
import { OfferPage } from '../pages/offer/offer';
import { WindowProvider } from '../providers/window/window';
import { ChoosePage } from '../pages/choose/choose';
import { SignUpPhoneNumberPage } from '../pages/sign-up-phone-number/sign-up-phone-number';
import { ShowcontactsPage } from '../pages/showcontacts/showcontacts';
import { Contacts } from '@ionic-native/contacts'

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
    OnboardingPage,
    DonationPage,
    OfferPage,
    ChoosePage,
    SignUpPhoneNumberPage,
    ShowcontactsPage
  ],
  imports: [
    BrowserModule,
    // HttpClientModule,
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
    OnboardingPage,
    DonationPage,
    OfferPage,
    ChoosePage,
    SignUpPhoneNumberPage,
    ShowcontactsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Stripe,
    HttpClient,
    FCM,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AdimaProvider,
    WindowProvider,
    Contacts
  ]
})
export class AppModule { }
