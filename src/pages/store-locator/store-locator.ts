import { Component , ViewChild }        from '@angular/core';
import { Content } from 'ionic-angular';

import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';
import { InAppBrowser , CallNumber } from 'ionic-native';
import {Geolocation  ,Geoposition} from 'ionic-native';

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

	@ViewChild(Content) content: Content;
    pos

	constructor ( public appService:AppService) {}

  ngAfterViewInit() {


	  Geolocation.getCurrentPosition().then(pos => {
		  // console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
		  this.pos = pos ;
		  this.loadMap();
	  }).catch(err => console.log(err) );


  }

  loadMap() {

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    //console.log(element);

    //let map = new GoogleMap(element);

   let latLng = new google.maps.LatLng(25.2847538,55.3530651);

   if(this.pos)  latLng = new google.maps.LatLng(this.pos.coords.latitude,this.pos.coords.longitude);

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
			this.scrollToTop();

		}

		callStore(s){
			CallNumber.callNumber(s.tel, true)
	   .then(() => console.log('Launched dialer!'))
	   .catch(() => console.log('Error launching dialer'));
		}

		// scrollTo() {
    //  let yOffset = 0;// document.getElementById(element).offsetTop;
    //  this.content.scrollTo(0, yOffset, 4000)
    // }
		scrollToTop() {
       this.content.scrollToTop();
    }


}
