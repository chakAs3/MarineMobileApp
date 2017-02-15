import { Component } from '@angular/core';

import { ZBar } from 'ionic-native';


@Component({
  templateUrl: 'contest-intro.html'
})

export class ContestIntroPage {
  slides = [
    {
      title: "Welcome to 3M Challenge!",
      description: "The <b>3M Marine Contest </b> invites all 3M Marine Mobile App user to participate.",
      image: "https://raw.githubusercontent.com/driftyco/ionic-preview-app/master/src/assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "How to Participate?",
      description: "<b>It is Very Easy</b> take your mobile login to your 3M Marine App and scan a specific tag in this event .",
      image: "https://raw.githubusercontent.com/driftyco/ionic-preview-app/master/src/assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "What Can You Win?",
      description: "The <b>Big Price</b> first you will earn 1000 Loyalty Points with us, Plus our big surprise price .",
      image: "https://raw.githubusercontent.com/driftyco/ionic-preview-app/master/src/assets/img/ica-slidebox-img-1.png",
    }
  ];
  constructor(){
  }
  scannedCode ;

  startScan(){
    let zBarOptions = {
      flash: "off",
      drawSight: false
    };

    ZBar.scan(zBarOptions)
    .then(result => {
      console.log(result); // Scanned code
      this.scannedCode = result;
    })
    .catch(error => {
      console.log(error); // Error message
    });
  }
}
