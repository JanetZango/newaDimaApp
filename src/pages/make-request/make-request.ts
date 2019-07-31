import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
import { Stripe } from '@ionic-native/stripe';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { AssociatePage } from '../associate/associate';
import { ToastController } from 'ionic-angular';
// import { HttpClient } from '@angular/common/http/';
// import { HttpHeaders } from '@angular/common/http';
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
  balance;
  downloadurl;
  offer;
  purpose;
  PO_no ;
  // number: '4242424242424242',
  // expMonth: 12,
  // expYear: 2020,
  // cvc: '220',
  // Amount: 500
  constructor(public navCtrl: NavController, public navParams: NavParams, public dima: AdimaProvider, private stripe: Stripe, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.makeRequest.push(this.navParams.get('orgObject'));
    console.log(this.makeRequest);
    this.Amount = this.makeRequest[0].Amount;
    this.PO_no = this.makeRequest[0].PO_no;
    this.balance = this.makeRequest[0].balance
    this.downloadurl = this.makeRequest[0].downloadurl
    this.purpose = this.makeRequest[0].purpose
    this.offer = this.makeRequest[0].offer
    console.log(this.Amount, this.offer, this.purpose)



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
          this.navCtrl.push(AssociatePage)
          const toast = this.toastCtrl.create({
            message: 'The Request was sent',
            duration: 3000
          });
          toast.present();
          this.dima.requestSent(this.key, this.key1, this.currentloggedinName,this.img).then((data) => {
      
          })
        })


  //       let body = {
  //   "notification":{
  //     "title":"New Notification has arrived",
  //     "body":"Notification Body",
  //     "sound":"default",
  //     "click_action":"FCM_PLUGIN_ACTIVITY",
  //     "icon":"fcm_push_icon"
  //   },
  //   "data":{
  //     "param1":"value1",
  //     "param2":"value2"
  //   },
  //     "to":"/topics/all",
  //     "priority":"high",
  //     "restricted_package_name":"io.ionic.starter"
  // }
  // let options = new HttpHeaders().set('Content-Type','application/json');
  // this.http.post("https://fcm.googleapis.com/fcm/send",body,{
  //   headers: options.set('Authorization', 'key=er8mU8DRfbM:APA91bFpLaFnOXGA2cJdiQJHWhjCXL5YG6RdkAWBTlmjaqV7wemsLOHepxKSjjdRtXyTtPNYFiawvIjX3ROStpHTEUIXDtD54xqyku9Bh_mww4pSaWTv170jTcyUPisUvQO9syJvaf0r'),
  // })
  //   .subscribe();
  
  }


}
