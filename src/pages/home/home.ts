import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ContestIntroPage} from '../contest/contest-intro';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

import { AppNavService } from '../../app/appNav.service';
import { AppService } from '../../app/app.service';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController,public af:AngularFire,public appNav:AppNavService,storage:Storage,public appService :AppService) {
        af.auth.subscribe(data =>{ console.log('Auth home ',data) ;

        storage.set('uid', data.uid);
        storage.set('email',data.auth.email)
        appService.email = data.auth.email ;
      });
    }

    gotoLandingPage(){

        // this.navCtrl.setRoot(this.appNav.getPage("products")).
        // catch(()=> {
        //     console.log('should I stay or should I go now');
        //     this.navCtrl.setRoot(this.appNav.getPage("login"));
        // })
    }

}
