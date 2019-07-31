import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
/**
 * Generated class for the OfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
})
export class OfferPage {
  offerAmount;
  terms;
  key;
  offer;
  Amount;
  balance;
  makeOfferArr = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams, public dima: AdimaProvider) {
    this.makeOfferArr.push(this.navParams.get('offerObject'));
    console.log(this.makeOfferArr)
    console.log(this.makeOfferArr[0].offer)
    console.log(this.key)

    this.key = this.makeOfferArr[0].key
    this.offerAmount = this.makeOfferArr[0].offer
    this.Amount = this.makeOfferArr[0].Amount
    this.balance = this.makeOfferArr[0].balance
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferPage');
  }

  makeoffer() {
    this.dima.makeOffer(this.key, this.offerAmount, this.terms,this.balance).then((data) => {
      console.log(data)
        this.balance = this.Amount - this.offerAmount

     
    })
  }

}
