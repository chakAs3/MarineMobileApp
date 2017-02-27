import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AngularFire, AuthProviders ,FirebaseListObservable} from 'angularfire2';

import {Login} from '../login/login'

import { CallNumber } from 'ionic-native'

import { AppNavService } from '../../app/appNav.service';

@Component({
  selector: 'page-helpRequest',
  templateUrl: 'helpRequest.html'
})
export class HelpRequestPage {

  publicNumbers :FirebaseListObservable<any>;
  privateNumbers :FirebaseListObservable<any>

  constructor(public navCtrl: NavController,public af: AngularFire,public appNav:AppNavService) {
    this.af.auth.subscribe(
      user => console.trace(user+" There is a user   "),
      error => console.trace(error)
    );

    

  }

  ionViewCanEnter(): boolean{
   // here we can either return true or false
   // depending on if we want to leave this view

      return true;

  }
  callPhoneNumber(number){
    CallNumber.callNumber(number, true)
   .then(() => console.log('Launched dialer!'))
   .catch(() => console.log('Error launching dialer'));
  }


  goHomePage(){
    console.log("goHomePage "+this.appNav.getPage("home"));
    this.navCtrl.setRoot(this.appNav.getPage("home"));
  }

}
