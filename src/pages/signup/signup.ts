import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { SigninPage } from '../signin/signin';


import firebase from 'firebase';
/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export default class SignupPage {


  constructor(public navCtrl: NavController, public navParams: NavParams,public adima :AdimaProvider,public loadingCtrl: LoadingController,public alertCtrl: AlertController) {
  }
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;



  ionViewDidLoad() { this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container'); }

  //registration method
  SignUp(email, password, username) {
    if(email == "" || password== "" || email == null || password == null  || username == "" || username == null){
      console.log('error')
    }
    else{
      this.adima.Signup(email,password,username).then(() => {
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          subTitle: "We have sent you a link on your email, Please verify your email",
          buttons: [
            {
              text: 'Ok',
              handler: () => {
            this.navCtrl.push(SigninPage)

              }
            },
          ]
        });
        alert.present();
  
      }, (error) => {
        console.log(error.message);
      })
    }
  }

  signIn(Pnumber: number){
  
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+27" + Pnumber;
  
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then( confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
    })
    .catch(function (error) {
      console.error("SMS not sent", error);
    });
  
  }
  
  gotoSignin(){
    this.navCtrl.push(SigninPage)
  }

}
