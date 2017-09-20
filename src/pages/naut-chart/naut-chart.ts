import { Component } from '@angular/core';

import { NavController ,AlertController,Platform } from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';




import {Geolocation , DeviceOrientation, DeviceOrientationCompassHeading ,Geoposition} from 'ionic-native';

@Component({
  selector: 'page-chart',
  templateUrl: 'naut-chart.html'
})
export class NautChartPage {


  pos :any  = {coords:{latitude:'',longitude:''}};
  data : DeviceOrientationCompassHeading ;
  message : any ="";
  constructor(public navCtrl: NavController,public platform:Platform,public alertCtrl:AlertController) {




  }



  ionViewCanEnter(): boolean{
   // here we can either return true or false
   // depending on if we want to leave this view
      return true;

  }
  launch() {
           var options = "location=no,hidden=yes,useWideViewPort=no";
           let browser = new InAppBrowser('http://map.openseamap.org/?zoom=9&lat=25.12697&lon=55.15196&layers=BFTTFTTFFTF0TFFFFTTTFT', '_blank',options);


          // browser.show();
           browser.on("loadstop").subscribe( () => browser.insertCSS({ code: "div#actionDialog table {  width: 300px;}" }).then(data => console.log(data)));
           //browser.on("loadstart").subscribe( () => this.presentAlert());
           browser.show();

          // var head = window.frames["myiframe"].document.getElementsByTagName("head")[0];
          // console.log(window.frames["myiframe"] );
          // var css = '<style type="text/css">' +
          //     'ul.dropdown li{background:#ff0000 !important;} ' +
          //     '</style>';
          //     head.appendChild(css);

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Alert Loading',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  injectJS() {
        var iFrameHead = window.frames["myiframe"].document.getElementsByTagName("head")[0];
        var myscript = document.createElement('script');
        myscript.type = 'text/javascript';
        myscript.src = 'myscript.js'; // replace this with your SCRIPT
        iFrameHead.appendChild(myscript);
  }





}
