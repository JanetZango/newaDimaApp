import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
import { AssociatePage } from '../associate/associate';
import { SigninPage } from '../signin/signin';
import { ProfilePage } from '../profile/profile';
import { MakepaymentPage } from '../makepayment/makepayment';
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
  img ;
  logInState;
  CurrentName;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dima :AdimaProvider ) {

 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
  gotoAssociate(){
    this.navCtrl.push(AssociatePage)
  }
  payment(){
    this.navCtrl.push(MakepaymentPage)
  }

  logOut() {
    this.dima.logout().then(() => {
      this.navCtrl.push(SigninPage, { out: 'logout' });
    }, (error) => {
      console.log(error.message);
    })
  }

  profile(){
    this.navCtrl.push(ProfilePage)
  }
}
