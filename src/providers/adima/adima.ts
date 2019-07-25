
import { Injectable, NgZone, keyframes } from '@angular/core';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { FCM } from '@ionic-native/fcm';

declare var firebase;
/*
  Generated class for the ADimaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdimaProvider {
  //variable
  stayLoggedIn;
  name;
  getusers = new Array();
   getresquestArr = new Array();


  constructor(public ngzone: NgZone, public loadingCtrl: LoadingController, public alertCtrl: AlertController,private fcm: FCM) {
    console.log('Hello ADimaProvider Provider');
  }

  ///checking authhstate
  checkstate() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user != null) {
            this.stayLoggedIn = 1
          }
          else {
            this.stayLoggedIn = 0
          }
          resolve(this.stayLoggedIn)
        })
      })
    })
  }


  getProfile() {
    return new Promise((accpt, rej) => {
      this.ngzone.run(() => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            firebase.database().ref("App_Users/" + user.uid).on('value', (data: any) => {
              let details = data.val();
              if (data.val() != null || data.val() != undefined) {
                console.log(details)
                accpt(details.downloadurl)
                console.log(details.downloadurl)
              }
              else {
                details = null
              }
            })
          } else {
          }
        });
      })
    })
  }

  getAllUsers() {
    return new Promise((accpt, rej) => {
      this.ngzone.run(() => {
        firebase.database().ref("App_Users").on('value', (data: any) => {
          let details = data.val();
          console.log(details)
          let key = Object.keys(details)
          console.log(key)
          for (var x = 0; x < key.length; x++) {
            let k = key[x]
            console.log(k)
            let obj = {
              name: details[k].name,
              downloadurl: details[k].downloadurl,
              email: details[k].email,
              id: key[x]
            }
            console.log(obj)
            this.getusers.push(obj);
            console.log(this.getusers)

          }
        })
        accpt(this.getusers)
      })
    })
  }


  
  updateStudent(Amount, token, id,user,name) {
    console.log(id)
    return new Promise((accpt, rej) => {
      console.log(id)
      firebase.database().ref("PaymentMade/" + id).set({
        Amount: Amount,
        token: token,
        user:user,
        name:name,
      })
    })
  }

  getCurrentLoggedinPerson() {
    return new Promise((accpt, rej) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        firebase.database().ref("App_Users/" + user.uid).on('value', (data: any) => {
          var details = data.val();
          let key = Object.keys(details)
          console.log(key)
          let obj = {
            name: details.name,
            downloadurl: details.downloadurl,
            user: user.uid
          }
          console.log(obj)
          accpt(obj)
        })
      })
    })
  }


  checkAuthState() {
    return new Promise((accpt, rej) => {
      this.ngzone.run(() => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            accpt(true)
          } else {
            accpt(false)
          }
        });
      });
    });
  }


  //signing
  SignIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  //registration
  Signup(email, password, name) {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        let loading = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'Signing up...',
          duration: 4000000
        });
        loading.present();
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
          var user = firebase.auth().currentUser
          firebase.database().ref("App_Users/" + user.uid).set({
            name: name,
            email: email,
            downloadurl: "../../assets/download.png",
            cell: "",
            token: "",
            Amout: ""
          })
          var user = firebase.auth().currentUser;
          user.sendEmailVerification().then(function () {
            // Email sent.
          }).catch(function (error) {
            // An error happened.
          });
          resolve();
          loading.dismiss();
        }).catch((error) => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            cssClass: 'myAlert',
            subTitle: error.message,
            buttons: [
              {
                text: 'ok',
                handler: data => {
                  // console.log('Cancel clicked');
                }
              }
            ]
          });
          alert.present();
          // console.log(error);
        })
      })
    })
  }


  //forgot paswword
  forgetPassword(email) {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve();
      }, (error) => {
        reject(error)
      })

    })

  }
  //check verification
  checkVerification() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        // console.log(user);
        if (user.emailVerified == false) {
          this.logout();
          resolve(0)
        }
        else {
          resolve(1)
        }
      })
    })
  }

  requestSent(key, user, name,img) {
    return new Promise((resolve, reject) => {
      // var user = firebase.auth().currentUser
      firebase.database().ref("Requests/" + key).push({
        message: "they have sent you a request",
        name: name,
        user: user,
        img:img
      })
    })
  }


  //check phonumber


  //logging out
  logout() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.auth().signOut();
        resolve()
      });
    })
  }

  retriveRequest() {
    return new Promise((accept, reject) => {
      var user = firebase.auth().currentUser
      console.log(user.uid)
      firebase.database().ref("Requests/" + user.uid).on('value', (data: any) => {
        let proDetails = data.val();
        console.log(proDetails)
        let keys2 = Object.keys(proDetails)
        console.log(keys2)
        for(var x = 0; x < keys2.length ; x++){
          let obj = {
            message:proDetails[keys2[x]].message,
            user:proDetails[keys2[x]].user,
            name:proDetails[keys2[x]].name,
            img:proDetails[keys2[x]].img
          }
          console.log(obj)
          this.getresquestArr.push(obj)
          console.log(this.getresquestArr)
        }
      })
      accept(this.getresquestArr)
    })
  }

  retrivePayment() {
    return new Promise((accept, reject) => {
      var user = firebase.auth().currentUser
      console.log(user.uid)
      firebase.database().ref("PaymentMade/" + user.uid).on('value', (data: any) => {
        let proDetails2 = data.val();
        console.log(proDetails2)
        let keys1 = Object.keys(proDetails2)
        console.log(keys1)
        for(var x = 0; x < keys1.length ; x++){
          let obj = {
            Amount:proDetails2[keys1[x]].Amount,
            user:proDetails2[keys1[x]].user,
            name:proDetails2[keys1[x]].name,
            token:proDetails2[keys1[x]].token,
          }
          console.log(obj)
          this.getresquestArr.push(obj)
          console.log(this.getresquestArr)
        }
    
      })
      accept(this.getresquestArr)
    })
  }


  
  async getToken(){
    this.fcm.getToken().then(token => {
          console.log(token);
          // alert(token)
           var uid =  firebase.auth().currentUser.uid;
        firebase.database().ref('App_Users/' + uid ).update({
          token:token,
          email: 'user',
          uid: uid
        })
        },(err)=>{
          console.log(err);
          // alert(err)
        });
        this.fcm.onTokenRefresh().subscribe(token => {
          console.log(token);
          // alert(token)
        },(err) =>{
          console.log(err);
          // alert(err)
        });  
  }

}
