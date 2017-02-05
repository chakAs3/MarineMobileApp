import { Component }        from '@angular/core';

import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';
import { Ng2MapComponent } from 'ng2-map';


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';



import { WeatherService } from './weather.service';


Ng2MapComponent['apiUrl'] =
  'https://maps.google.com/maps/api/js?libraries=visualization,places';

@Component({
	selector: 'gs-weather',
	templateUrl: 'weather.component.html',
	styles:["img { } "],
	providers: [ WeatherService],
})

export class WeatherComponent {

	autocomplete: google.maps.places.Autocomplete;
  address: any = {};
	isVisible: boolean = false;
	// items: Observable <string[]>;
  items : any;

  city : string ;

	data :any = null;

	cities = [{name:"Dubai" , id:"ship1"},{name:"Abu Dhabi" , id:"ship1"}];


	 private searchTermStream = new Subject<string>();

	constructor (private weatherService: WeatherService) {}

	//search(term: string) {this.isVisible = false;  this.searchTermStream.next(term); }

	/*items = this.searchTermStream
    .debounceTime(1000)
    .distinctUntilChanged()
    .switchMap((term: string) => this.weatherService.search(term))
    .subscribe(data => {this.isVisible = true; console.log(data); this.items =  data});;
*/


	 search (term: string) {
	 	console.log(term);
		this.city = term ;
	 	this.weatherService.search(this.city).subscribe( data => { console.log(data) ;this.data = data });
	 	console.log(this.data);
	 }

	 delete(chip) {
     //delete this.cities[chip];

		 var index = this.cities.indexOf(chip, 0);
	  	if (index > -1) {
		   this.cities.splice(index, 1);
	  	}
   }
	 addChipCity(name){
      this.cities.push({name:name,id:name+"id"}) ;
	 }

	 initialized(autocomplete: any) {
    this.autocomplete = autocomplete;
  }
  placeChanged() {
    // let place = this.autocomplete.getPlace();
    // for (var i = 0; i < place.address_components.length; i++) {
    //   var addressType = place.address_components[i].types[0];
    //   this.address[addressType] = place.address_components[i].long_name;
    // }
    //this.ref.detectChanges();
  }
}
