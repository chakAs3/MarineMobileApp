import { Component } from '@angular/core';

import { ZBar } from 'ionic-native';

import { AppService } from '../../app/app.service';

import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';



@Component({
  templateUrl: 'contest-intro.html'
})

export class ContestIntroPage {
  slides = [
    {
      title: "Welcome to 3M Contest!",
      description: "The <b><span style='color: red;'>3M</span> Marine</b> invites you to participate to its big event contest  .",
      image: "https://raw.githubusercontent.com/driftyco/ionic-preview-app/master/src/assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "How to Participate?",
      description: "<b>It is Very Easy</b> use your mobile within your 3M Marine App and scan a specific QR that is present at the event stand .",
      image: "https://raw.githubusercontent.com/driftyco/ionic-preview-app/master/src/assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "What Can You Win?",
      description: "The <b>Big Price</b> is a super Jet Ski that will be yours .",
      image: "https://raw.githubusercontent.com/driftyco/ionic-preview-app/master/src/assets/img/ica-slidebox-img-1.png",
    }
  ];

  kickstart ={};
  links:FirebaseListObservable<any> ;
  message1:string ;
  message:string ;
  constructor(public appService:AppService,public af:AngularFire){
    console.log( af.auth.getAuth() );
    af.database.list("contest/slides").subscribe(slides => this.slides = slides );
    af.database.object("contest/kickstart").subscribe(kickstart => this.kickstart = kickstart);
    this.links = af.database.list("contest/links");
    af.database.object("contest/message").subscribe(message => this.message = message.$value);
    this.appService.getQRCode().then(qrCode => qrCode.subscribe(code => this.scannedCode = code.$value));

    af.database.object("contest/message1").subscribe(message => this.message1 = message.$value);

  }
  scannedCode ;

  ionViewCanEnter(): boolean{
   // here we can either return true or false
   // depending on if we want to leave this view

      return this.af.auth.getAuth() != undefined;

  }

  startScan(){
    let zBarOptions = {
      flash: "off",
      drawSight: false
    };

    ZBar.scan(zBarOptions)
    .then(result => {
      console.log(result); // Scanned code
      this.scannedCode = result;
      this.appService.saveQRCode(this.scannedCode);
    })
    .catch(error => {
      console.log(error); // Error message
    });
  }
}
