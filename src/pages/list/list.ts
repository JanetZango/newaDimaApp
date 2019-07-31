import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
import { AssociatePage } from '../associate/associate';
import { SigninPage } from '../signin/signin';
import { ProfilePage } from '../profile/profile';
import { MakepaymentPage } from '../makepayment/makepayment';
import { DonationPage } from '../donation/donation';
/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  img;
  logInState;
  CurrentName;
  addrequestArr = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams, public dima: AdimaProvider) {
   
    this.dima.getCurrentLoggedinPerson().then((data:any) => {
      console.log(data)
      this.addrequestArr =data
      console.log(this.addrequestArr)
    

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
  gotoAssociate() {
    this.navCtrl.push(AssociatePage)
  }
  payment() {
    this.navCtrl.push(MakepaymentPage)
  }
  profile() {
    this.navCtrl.push(ProfilePage)
  }
  addRequest() {
    this.navCtrl.push(DonationPage)
  }
}
