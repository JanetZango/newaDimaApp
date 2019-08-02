import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { SigninPage } from '../signin/signin';


declare var firebase;
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  arr = new Array();
  requestArr = new Array();
  paymentArr = new Array();
  uid;
  user;
  request = "inbox";
  constructor(public navCtrl: NavController, public navParams: NavParams, public dima: AdimaProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    let userID = firebase.auth().currentUser;
    firebase.database().ref("App_Users/" + userID.uid).on('value', (data: any) => {
      let details = data.val();
      console.log(data.val());
      this.arr.push(details);

      console.log(this.arr)
    });


   
  }

  callRequest() {
    this.dima.retriveRequest().then((data: any) => {
      this.requestArr = data;
      this.requestArr.reverse();
      this.requestArr.length=0;
      console.log(this.requestArr)
    })
  }

  acceptedReq(key) {
    for (var x = 0; x < this.requestArr.length; x++) {
      if (key == this.requestArr[x].key) {
        this.dima.storeAaccetedRequest(key).then((data) => {
          console.log(data)
        })
        break;
      }
    }
  }

  ionViewDidLoad() {
    this.dima.retrivePayment().then((data: any) => {
      this.paymentArr = data
      console.log(this.paymentArr)
    })
    console.log('ionViewDidLoad ProfilePage');

    this.callRequest();
  }



  logOut() {
    this.dima.logout().then(() => {
      this.navCtrl.push(SigninPage, { out: 'logout' });
    }, (error) => {
      console.log(error.message);
    })
  }

  removeImage(key) {
    console.log(key);
    const confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure you want to delete this student?',
      cssClass: "myAlert",
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.dima.RemoveUploadedPicture(key);
            this.callRequest();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }








}
