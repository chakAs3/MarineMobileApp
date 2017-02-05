import { Injectable} from '@angular/core';
import{ Http } from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//  http://api.openweathermap.org/data/2.5/weather?q=dubai,uk&appid=811751f0ee009727cda640fd36f1ecf8
   const apiURL = 'http://api.openweathermap.org/data/2.5/weather';
   const appid = '811751f0ee009727cda640fd36f1ecf8';

@Injectable()
export class WeatherService {
	// private data: Observable <string[]>;
	constructor(private _http: Http) {}


	search(term: string):Observable<any>{

		var url = apiURL+"?q=" +term +"&appid="+appid+"&units=metric" ; //'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+term+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'

		return this._http.get( url )
							.map( res => res.json());

	}
}
