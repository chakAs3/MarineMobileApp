import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import  firebase  from 'firebase';
import { AngularFire, AuthProviders, AuthMethods , FirebaseObjectObservable } from 'angularfire2';
import { Storage } from '@ionic/storage';

import { MessengerTabsPage } from '../tabs/tabs';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { validateEmail } from '../../validators/email';
import { AuthProvider } from '../../providers/auth-provider/auth-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { UtilProvider } from '../../providers/utils';

import { Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styles :["login.scss"]
})
export class Login {
   user : any = {city:"Dubai",mobile:"+981998899999"}     ;
   isAuth = false;
   authColor = "";
   loginForm:any ;
   userDetails : {mobile:FirebaseObjectObservable<any>,city?:FirebaseObjectObservable<any>};
  constructor(public navCtrl: NavController,public af: AngularFire,public auth: AuthProvider,
  public userProvider: UserProvider,
  public util: UtilProvider,
  public storage:Storage,private platform: Platform) {

    this.af.auth.subscribe(
      user => this._changeState(user),
      error => console.trace(error)
    );


  }

  ngOnInit() {
      this.loginForm = new FormGroup({
          email: new FormControl("",[Validators.required, validateEmail]),
          password: new FormControl("",Validators.required)
      });
  }

  login(from: string) {
    if (this.platform.is('cordova')) {
       return Facebook.login(['email', 'public_profile']).then(res => {
         const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
         return firebase.auth().signInWithCredential(facebookCredential);
       });
     }else

    this.af.auth.login({
      provider: this._getProvider(from),
      method: AuthMethods.Popup
    }).then((data) => {
       this.storage.set('uid', data.uid);
       this.userProvider.createUser({email:data.auth.email,photoURL:data.auth.photoURL}, data.uid);
      console.trace("login from "+from);
      console.trace(data);
    }, (error) => {
        let alert = this.util.doAlert("Error",error.message,"Can not create user !!");
        alert.present();
    });
  }
  message = "NOTHING" ;
  facebookCredentialText ;

  loginWithFaceBook(){
    // Facebook.getLoginStatus().then(userdata => {
    //   this.facebookCredentialText = JSON.stringify(userdata) ;
    //   Facebook.login(['email', 'public_profile']).then(data=> this.facebookCredentialText ="LOGIN "+ JSON.stringify(data) ).catch(error=>this.facebookCredentialText ="Error "+ JSON.stringify(error) )
    this.auth.signInWithFacebook().then(data =>  {
       //this.facebookCredentialText = res.authResponse;
       this.facebookCredentialText = JSON.stringify(data);
       console.log("loginWithFaceBook res");
      //  if( data && data.auth.email ){
      //  this.storage.set('uid', data.uid);
      //  this.userProvider.createUser({email:data.auth.email,photoURL:data.auth.photoURL}, data.uid);
      //  //console.log(data);
      //  }
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(data.authResponse.accessToken);
        this.facebookCredentialText = facebookCredential;


        console.log("facebookCredential "+facebookCredential);

      this.facebookCredentialText = firebase.auth() ;
      firebase.auth().signInWithCredential(facebookCredential)
      .then((success) => {
        this.facebookCredentialText =JSON.stringify(success);// " uid :"+success.uid+" - "+success.email//JSON.stringify(success);

        if( success  ){
        this.storage.set('uid', success.uid);
        this.userProvider.createUser({email:success.email,photoURL:success.photoURL}, success.uid);
        //console.log(data);
        }

        console.log("Firebase success: " + JSON.stringify(success));
        this.message = success;
      })
      .catch((error) => {
        this.facebookCredentialText = error
        //console.log("Firebase failure: " + JSON.stringify(error));
        //this.message = "Firebase failure: " + JSON.stringify(error);
      });

    } );
    //});
  }

  signInWithGoogle(){
    this.facebookCredentialText = this.auth.signInWithGoogle()
    this.auth.signInWithGoogle().then(res =>  {
      this.message = "There is callback promise ";
      this.facebookCredentialText = res
    }  , err => this.facebookCredentialText = err);
  }

  signinWithEmail() {
      console.trace(this.loginForm.value);
      //this.auth.signin(this.loginForm.value)
      this.af.auth.login(this.loginForm.value )
      .then((data) => {
          this.storage.set('uid', data.uid);
        //  this.navCtrl.push(MessengerTabsPage);
      }, (error) => {
          let alert = this.util.doAlert("Error",error.message,"Authentication Problem");
          alert.present();
      });
    };

    createAccount() {
        let credentials = this.loginForm.value;
        this.auth.createAccount(credentials)
        .then((data) => {
           this.storage.set('uid', data.uid);
           this.userProvider.createUser(credentials, data.uid);
        }, (error) => {
            let alert = this.util.doAlert("Error",error.message,"Can not create user !!");
            alert.present();
        });
    }

  saveInfo(mobile,city){
      console.log( `${mobile}  ${city}` );
      let details = {mobile:mobile,city:city};
      this.userProvider.updateUser(details);
  }


  logout() {
    this.af.auth.logout();
  }

  private _changeState(user: any = null) {
    //console.log(user);
    if(user) {
      this.isAuth = true;
      this.authColor = 'primary';
      this.user = this._getUserInfo(user) ;
      //this.userDetails = { mobile:this.af.database.object("users/"+user.auth.uid+"/mobile")} ;
    //  this.userDetails.mobile.subscribe(data=>console.log(data));
    }
    else {
      this.isAuth = false;
      this.authColor = 'warn';
      this.user = {};
    }
  }

  private _getUserInfo(user: any): any {
    if(!user) {
      return {};
    }
    let data = user.auth.providerData[0];
    console.trace( user.auth.uid );
    return {
      uid : user.auth.uid,
      name: data.displayName  ,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId,
      details : this.af.database.object("users/"+user.auth.uid)
    };
  }

  private _getProvider(from: string) {
    switch(from){
      case 'twitter': return AuthProviders.Twitter;
      case 'facebook': return AuthProviders.Facebook;
      case 'github': return AuthProviders.Github;
      case 'google': return AuthProviders.Google;
    }
  }

}
