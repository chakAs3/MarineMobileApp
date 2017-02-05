import { Component }        from '@angular/core';

import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';
//import { Ng2MapComponent } from 'ng2-map';





// import {
//  GoogleMap,
//  GoogleMapsEvent,
//  GoogleMapsLatLng,
//  CameraPosition,
//  GoogleMapsMarkerOptions,
//  GoogleMapsMarker
// } from 'ionic-native';









//Ng2MapComponent['apiUrl'] =
  //'https://maps.google.com/maps/api/js?libraries=visualization,places';

@Component({
	selector: 'page-map',
	templateUrl: 'store-locator.html',
	styles:["styles.scss"],
	providers: [ ],
})

export class StoreLocator {

	autocomplete: google.maps.places.Autocomplete

  infowindow;
  map:google.maps.Map ;

	constructor () {}

  ngAfterViewInit() {
   this.loadMap();
  }

  loadMap() {

    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    console.log(element);

    //let map = new GoogleMap(element);

    let latLng = new google.maps.LatLng(25.2847538,55.3530651);

   let mapOptions = {
     center: latLng,
     zoom: 15,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   }

     this.map = new google.maps.Map(element, mapOptions);


    let panelDiv = document.getElementById('panel');

    this.infowindow = new google.maps.InfoWindow();
        let service = new google.maps.places.PlacesService(this.map);
        let requestSearch : google.maps.places.PlaceSearchRequest = {};
        requestSearch.location = latLng ;
        requestSearch.radius = 800 ;
        requestSearch.types= ['store'];

        //requestSearch.keyword ="3m";

        service.nearbySearch(requestSearch, this.callback);

  }
   self = this ;
    public callback = (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            this.createMarker(results[i]);
             console.log(results[i]);
          }
        }


      }
      createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: this.map,
          position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', ()=> {
          this.infowindow.setContent(place.name);
          this.infowindow.open(this.map,marker);
        });

    }








}
