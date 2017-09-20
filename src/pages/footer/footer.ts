import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ContestIntroPage} from '../contest/contest-intro'

@Component({
  selector: 'page-footer',
  templateUrl: 'footer.html'
})
export class Footer {

  constructor(public navCtrl: NavController) {

  }

  gotoContestPage(){
    this.navCtrl.setRoot(ContestIntroPage);
  }

}
