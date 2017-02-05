import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AngularFire, AuthProviders } from 'angularfire2';

import {Login} from '../login/login'

@Component({
  selector: 'page-helpRequest',
  templateUrl: 'helpRequest.html'
})
export class HelpRequestPage {

  constructor(public navCtrl: NavController,public af: AngularFire) {
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

}
