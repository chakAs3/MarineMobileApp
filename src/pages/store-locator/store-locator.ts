import { Component }        from '@angular/core';

import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';
import { InAppBrowser } from 'ionic-native';

import { FirebaseListObservable } from 'angularfire2';
import { AppService } from '../../app/app.service'
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

	stores:FirebaseListObservable<any> ;
	markers:Array<google.maps.Marker> =[];

	constructor ( public appService:AppService) {}

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

    //console.log(element);

    //let map = new GoogleMap(element);

    let latLng = new google.maps.LatLng(25.2847538,55.3530651);

   let mapOptions = {
     center: latLng,
     zoom: 12,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   }

    this.map = new google.maps.Map(element, mapOptions);

    this.infowindow = new google.maps.InfoWindow();
      // let panelDiv = document.getElementById('panel');
			//
      //   this.infowindow = new google.maps.InfoWindow();
      //   let service = new google.maps.places.PlacesService(this.map);
      //   let requestSearch : google.maps.places.PlaceSearchRequest = {};
      //   requestSearch.location = latLng ;
      //   requestSearch.radius = 800 ;
      //   requestSearch.types= ['store'];
			//
      //   //requestSearch.keyword ="3m";
			//
      //   service.nearbySearch(requestSearch, this.callback);

     this.stores = this.appService.getStores();

		 this.stores.subscribe((stores)=> this.createMarkers(stores))

  }
	createMarkers(results){
		for (var i = 0; i < results.length; i++) {
			this.createMarkerFromData(results[i]);
			 //console.log(results[i]);
		}
	}
  // self = this ;
    // public callback = (results, status) => {
    //     if (status === google.maps.places.PlacesServiceStatus.OK) {
    //       for (var i = 0; i < results.length; i++) {
    //         this.createMarker(results[i]);
    //          console.log(results[i]);
    //       }
    //     }
    //   }
		//
    //   createMarker(place) {
    //     var placeLoc = place.geometry.location;
    //     var marker = new google.maps.Marker({
    //       map: this.map,
    //       position: place.geometry.location
	  //     });
		//
	  //     google.maps.event.addListener(marker, 'click', ()=> {
	  //         this.infowindow.setContent(place.name);
	  //         this.infowindow.open(this.map,marker);
	  //       });
		//
	  //   }


			createMarkerFromData(place) {
        let placeLoc = {lat: place.coords.lant, lng: place.coords.lang};

        let marker = new google.maps.Marker({
          map: this.map,
          position: placeLoc
	      });
				this.markers[place.$key]=marker ;

	      google.maps.event.addListener(marker, 'click', ()=> {
	          this.infowindow.setContent(place.title);
	          this.infowindow.open(this.map,marker);
	        });

	    }

			navigateTo(s){
				//window.open("google.navigation:q=23.3728831,85.3372199&mode=d" , '_system');

				let browser = new InAppBrowser(`google.navigation:q=${s.coords.lant},${s.coords.lang}&mode=d`, '_system');
				browser.show();
			}

			showInMap(s){

				let marker = this.markers[s.$key];
				this.infowindow.setContent(s.title);
				this.infowindow.open(this.map,marker);

			}

			callStore(s){

			}


}
