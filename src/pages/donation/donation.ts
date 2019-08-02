import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the DonationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donation',
  templateUrl: 'donation.html',
})
export class DonationPage {
  downloadurl;
  d = 1;
  Amount;
  purpose;
  PO_no;
  key;
  user;
  name;
  addrequestArr = new Array();
  fundingArr = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams, public dima: AdimaProvider,public toastCtrl: ToastController) {
    this.dima.getCurrentLoggedinPerson().then((data:any) => {
      console.log(data)
      this.addrequestArr =data
      this.key = data.user;
      this.name = data.name;

      console.log(data.user)
    

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonationPage');
  }


  UploadProfilePic(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      if (event.target.files[0].size > 1500000) {
     
      }
      else {
        reader.onload = (event: any) => {
          this.downloadurl = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    }

  }



   addRequest(){
     this.dima.addRequestFunding(this.key,this.Amount,this.purpose,this.PO_no,this.downloadurl,this.name).then((data)=>{
     console.log(data)
     this.fundingArr.push(data)
     const toast = this.toastCtrl.create({
      message: 'You have succesfully added a funding Request!',
      duration: 3000
    });
    toast.present();
    this.navCtrl.pop();
     })
   }

}
