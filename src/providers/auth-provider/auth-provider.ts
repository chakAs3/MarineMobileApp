import { Injectable } from '@angular/core';
import { AngularFire , AngularFireAuth , FirebaseAuthState , AuthProviders,AuthMethods } from 'angularfire2';
import { Storage } from '@ionic/storage';

import { Platform } from 'ionic-angular';
import { Facebook, GooglePlus } from 'ionic-native';

@Injectable()
export class AuthProvider {

  private authState: FirebaseAuthState;
  constructor(public auth$: AngularFireAuth, public local:Storage,private platform: Platform) {


    //this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }






  get authenticated(): boolean {
    return this.authState !== null;
  }

  signInWithFacebook(): firebase.Promise<any> {
      if (this.platform.is('cordova')) {
        return Facebook.login(['email', 'public_profile'])
        // .then(res => {
        //   const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        //   return firebase.auth().signInWithCredential(facebookCredential);
        // });
      } else {
        return this.auth$.login({
          provider: AuthProviders.Facebook,
          method: AuthMethods.Popup
        });
      }

    }

    signInWithGoogle(): firebase.Promise<any> {
        if (this.platform.is('cordova')) {
          return GooglePlus.login({
                'scopes': 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
                'webClientId': '76935023754-nc83sq2ad2utgssa21o7bghduca4so4l.apps.googleusercontent.com',
                'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
            })
          // .then(res => {
          //   const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          //   return firebase.auth().signInWithCredential(facebookCredential);
          // });
        } else {
          return this.auth$.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup
          });
        }

      }

  signin(credentails) {
    return this.auth$.login(credentails);
  }

  createAccount(credentails) {
    return this.auth$.createUser(credentails);
  };

  logout() {
     this.auth$.logout();
  }
}
