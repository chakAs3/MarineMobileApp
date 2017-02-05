import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ContestIntroPage} from '../contest/contest-intro'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  gotoContestPage(){
    this.navCtrl.setRoot(ContestIntroPage);
  }

}
