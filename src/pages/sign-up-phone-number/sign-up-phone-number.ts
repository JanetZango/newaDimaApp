import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WindowProvider } from '../../providers/window/window';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ListPage } from '../list/list';
/**
 * Generated class for the SignUpPhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

var firebaseConfig = {
  apiKey: "AIzaSyD6QzeWFfMoXDUazrnZAlLOxy3K_Ka778U",
  authDomain: "adimaapp.firebaseapp.com",
  databaseURL: "https://adimaapp.firebaseio.com",
  projectId: "adimaapp",
  storageBucket: "adimaapp.appspot.com",
  messagingSenderId: "246207647956",
  appId: "1:246207647956:web:42a0f2709e3b12b0"
};


@Injectable()
export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;
  name;
  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }

}


@Component({
  selector: 'page-sign-up-phone-number',
  templateUrl: 'sign-up-phone-number.html',
})
export class SignUpPhoneNumberPage {
  windowRef: any;
  phoneNumber = new PhoneNumber;
  verificationCode: string;
  user: any;
  config: any
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public navParams: NavParams, public win: WindowProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPhoneNumberPage');
  }



  ionViewDidEnter() {
    // this.windowRef.recaptchaVerifier =  new firebase.auth.RecaptchaVerifier('recaptcha-container');

    // this.windowRef.recaptchaVerifier.render()

    this.windowRef = this.win.windowRef
    console.log(this.win)
    // var window;
    var defaultApp = firebase.initializeApp(firebaseConfig);
    setTimeout(function () {
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': function (response) {
          console.log("success", response);
        },
        'expired-callback': function () {
          console.log("expired-callback");
        }
      });

      this.recaptchaVerifier.render().then(function (widgetId) {
        // this.windowRef.recaptchaWidgetId = widgetId;
        console.log(widgetId)
      });

    }, 2000);

  }


  sendCode() {
    console.log(this.phoneNumber)
    const appVerifier = this.windowRef.recaptchaVerifier;
    let num = this.phoneNumber.e164;
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
        console.log(result)
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          subTitle: 'We have sent you an Sms to verfity your Phone Number',
          buttons: ['OK']
        });
        alert.present();

      })
      .catch(error =>{
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          subTitle: error.message,
          buttons: ['OK'],
        });
        alert.present();
      });
    
  }


  verifyLoginCode() {
    this.windowRef.confirmationResult.confirm(this.verificationCode).then(result => {
        var user = firebase.auth().currentUser
        firebase.database().ref("App_Users/" + user.uid).set({
          name:name,
          downloadurl: "../../assets/download.png",
          phoneNumber: this.phoneNumber,
        })
        this.user = result.user;
        const alert = this.alertCtrl.create({
          // title: 'New Friend!',
          subTitle: 'You have successfully logged in',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push(ListPage)

      })
      .catch(error => console.log(error, "Incorrect code entered?"));
  }



}
