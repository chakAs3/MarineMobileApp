import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ContestIntroPage} from '../contest/contest-intro';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

import { AppNavService } from '../../app/appNav.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public af:AngularFire,public appNav:AppNavService) {
       af.auth.subscribe(data => console.log(data));
  }

  gotoContestPage(){
    this.navCtrl.setRoot(ContestIntroPage).
    catch(()=> {
      console.log('should I stay or should I go now');
       this.navCtrl.setRoot(this.appNav.getPage("login"));
    })
  }

}
