import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';



import {Geolocation , DeviceOrientation, DeviceOrientationCompassHeading ,Geoposition} from 'ionic-native';

@Component({
  selector: 'page-compass',
  templateUrl: 'compass.html'
})
export class CompassPage {


  pos :any  = {coords:{latitude:'',longitude:''}};
  data : DeviceOrientationCompassHeading ;
  message : any ="";
  constructor(public navCtrl: NavController) {

    Geolocation.getCurrentPosition().then(pos => {
        // console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      this.pos = pos ;
    }).catch(err => console.log(err) );

    let watch = Geolocation.watchPosition().subscribe(pos => {
    //  console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
    }, err => console.log(err));
    //this.rotateArrow(40);

    // Get the device current compass heading
    DeviceOrientation.getCurrentHeading().then(
      (data: DeviceOrientationCompassHeading) => this.message = JSON.stringify(data),
      (error: any) => console.log(error)
    );

    // Watch the device compass heading change
    var subscription = DeviceOrientation.watchHeading().subscribe(
      (data: DeviceOrientationCompassHeading) =>
        {
          this.rotateArrow(-data.trueHeading);
          this.message = data.trueHeading.toFixed(2) +"° SW"//data.magneticHeading+" N,"+data.trueHeading ;

        }
    );
  }



  ionViewCanEnter(): boolean{
   // here we can either return true or false
   // depending on if we want to leave this view

      return true;

  }

  rotateArrow(deg){
    var div = document.getElementById('compass-visual');
      //  deg = rotated ? 0 : 66;
     div.style.setProperty('webkitTransform' , 'rotate('+deg+'deg)');
     div.style.setProperty("mozTransform"    , 'rotate('+deg+'deg)');
     div.style.setProperty('msTransform'     , 'rotate('+deg+'deg)');
     div.style.setProperty('oTransform'      , 'rotate('+deg+'deg)');
     div.style.setProperty('transform'       , 'rotate('+deg+'deg)');
  }

}
