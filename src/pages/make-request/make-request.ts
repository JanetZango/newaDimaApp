import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
import { Stripe } from '@ionic-native/stripe';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { AssociatePage } from '../associate/associate';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the MakeRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-make-request',
  templateUrl: 'make-request.html',
})
export class MakeRequestPage {
  makeRequest = new Array();
  currentLoggedin = new Array();
  getProjectDetails = new Array();

  name;
  email;
  currentloggedinName;
  stripe_key = "pk_test_n47qQgW5Mf80nl9atiVSPSwC00uTrPCLVS"
  number;
  expMonth;
  expYear;
  cvc;
  Amount;
  key;
  key1;
  img;
  // number: '4242424242424242',
  // expMonth: 12,
  // expYear: 2020,
  // cvc: '220',
  // Amount: 500
  constructor(public navCtrl: NavController, public navParams: NavParams, public dima: AdimaProvider, private stripe: Stripe, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.makeRequest.push(this.navParams.get('orgObject'));
    console.log(this.makeRequest);
    this.name = this.makeRequest[0].name;
    this.email = this.makeRequest[0].email;
    this.key = this.makeRequest[0].id
    console.log(this.name, this.email, this.key)



  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeRequestPage');
    this.dima.getCurrentLoggedinPerson().then((data: any) => {
      console.log(data.name)
      this.currentloggedinName = data.name;
      this.img = data.downloadurl
      this.key1 = data.user
      console.log(this.currentloggedinName)
      console.log(this.key1)
    })
  }

  SendRequest() {
        this.dima.getToken().then((data)=>{
          console.log(data)
          this.dima.requestSent(this.key, this.key1, this.currentloggedinName,this.img).then((data) => {
            console.log(data)
            console.log(this.key1)
            console.log(this.key)
            this.navCtrl.push(AssociatePage)
            const toast = this.toastCtrl.create({
              message: 'The Request was sent',
              duration: 3000
            });
            toast.present();
          })
        })
  
  }


}
