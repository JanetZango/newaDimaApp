
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
  getpaymentArr = new Array();
  getaddedRequests = new Array();
  RegisteredPeople = new Array();
  Amount;
  offer;
  outstanding;
  constructor(public ngzone: NgZone, public loadingCtrl: LoadingController, public alertCtrl: AlertController, private fcm: FCM) {
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



  updateStudent(Amount, token, id, user, name, downloadurl) {
    console.log(id)
    return new Promise((accpt, rej) => {
      console.log(id)
      firebase.database().ref("PaymentMade/" + id).set({
        Amount: Amount,
        token: token,
        user: user,
        name: name,
        downloadurl: downloadurl
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


  getAllRegisteredPeople() {
    return new Promise((accpt, rej) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        firebase.database().ref("App_Users").on('value', (data: any) => {
          var details = data.val();
          console.log(details)
          let keys = Object.keys(details)
          console.log(keys)
          for(var x =0 ; x <keys.length;x++){
            let obj = {
              phoneNumber: details[keys[x]].phoneNumber
            }
            this.RegisteredPeople.push(obj)
            console.log(this.RegisteredPeople)
          }
          accpt(this.RegisteredPeople)
        })
      })
    })
  }

  addRequestFunding(id, Amount, purpose, PO_no, downloadurl, name) {
    console.log(id)
    return new Promise((accpt, rej) => {
      console.log(id)
      firebase.database().ref("AddRequestFundings/" + id).push({
        Amount: Amount,
        purpose: purpose,
        PO_no: PO_no,
        downloadurl: downloadurl,
        name: name,
        offer: 0,
        balance: 0
      })
    })
  }



  retrieveAddedRequest() {
    return new Promise((accpt, rej) => {
      var user = firebase.currentUser;
      firebase.database().ref("AddRequestFundings").on("value", (data) => {
        let requestDetails = data.val();
        console.log(requestDetails)
        let keys1 = Object.keys(requestDetails)
        console.log(keys1)
        // if (this.Amount >= this.outstanding) {
        //   var balance = this.Amount - this.offer
        // }
        for (var x = 0; x < keys1.length; x++) {
          firebase.database().ref("AddRequestFundings/" + keys1[x]).on("value", (data2) => {
            let requestDetails2 = data2.val();
            console.log(requestDetails2)
            let keys2 = Object.keys(requestDetails2)
            console.log(keys2)
            for (var z = 0; z < keys2.length; z++) {
              let obj = {
                Amount: requestDetails2[keys2[z]].Amount,
                PO_no: requestDetails2[keys2[z]].PO_no,
                balance: requestDetails2[keys2[z]].balance,
                downloadurl: requestDetails2[keys2[z]].downloadurl,
                offer: requestDetails2[keys2[z]].offer,
                purpose: requestDetails2[keys2[z]].purpose,
                name: requestDetails2[keys2[z]].name,
                key: keys2[z]
              }
              console.log(obj)
              this.getaddedRequests.push(obj)
              console.log(this.getaddedRequests)
            }
         

          })
          accpt(this.getaddedRequests)

        }
      })
    })
  }

  makeOffer(id, offer, terms, balance) {
    console.log(id)
    return new Promise((accpt, rej) => {
      console.log(id)
      firebase.database().ref("AddRequestFundings/" + id).update({
        offer: offer,
        terms: terms,
        balance: balance
      })
    })
  }

  storeAaccetedRequest(key) {
    let user = firebase.auth().currentUser
    return new Promise((accpt, rej) => {
      console.log(user.uid)
      console.log(key)
      firebase.database().ref("AcceptedRequests/" + user.uid + "/" + key).set({
        accept: "accepted",
        key: key
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



  signupPhone(number) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithPhoneNumber(number).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    })
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
            token: "",
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

  requestSent(key, user, name, img) {
    return new Promise((resolve, reject) => {
      // var user = firebase.auth().currentUser
      firebase.database().ref("Requests/" + key).push({
        message: "they have sent you a request",
        name: name,
        user: user,
        img: img
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
        if (data.val() != null || data.val() != undefined) {
          let keys2 = Object.keys(proDetails)
          console.log(keys2)
          for (var x = 0; x < keys2.length; x++) {
            let obj = {
              message: proDetails[keys2[x]].message,
              user: proDetails[keys2[x]].user,
              name: proDetails[keys2[x]].name,
              img: proDetails[keys2[x]].img,
              key: keys2[x]
            }
            console.log(obj)
            this.getresquestArr.push(obj)
            console.log(this.getresquestArr)
          }
        }
        else {
          this.getresquestArr == null
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
        let obj = {
          Amount: proDetails2.Amount,
          name: proDetails2.name,
          token: proDetails2.token,
          downloadurl: proDetails2.downloadurl
        }
        console.log(obj)
        this.getpaymentArr.push(obj)
        console.log(this.getpaymentArr)

      })
      accept(this.getpaymentArr)
    })
  }



  async getToken() {
    this.fcm.getToken().then(token => {
      console.log(token);
      // alert(token)
      var uid = firebase.auth().currentUser.uid;
      firebase.database().ref('App_Users/' + uid).update({
        token: token,
        uid: uid
      })

    }, (err) => {
      console.log(err);
      // alert(err)
    });
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
      // alert(token)
    }, (err) => {
      console.log(err);
      // alert(err)
    });
  }


  RemoveUploadedPicture(key) {
    return new Promise((accpt, rej) => {
      var user = firebase.auth().currentUser
      console.log(key)
      console.log(user.uid)
      this.ngzone.run(() => {
        firebase.database().ref("Requests/" + user.uid + "/" + key).remove();
        accpt("student deleted");
      });
    });
  }

}
