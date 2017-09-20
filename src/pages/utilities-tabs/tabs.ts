import { Component } from '@angular/core';
import { CompassPage } from '../compass/compass';
//import { AccountPage } from '../account/account';
import { WeatherComponent } from '../weather/weather.component';
import { NautChartPage } from '../naut-chart/naut-chart';

@Component({
	selector: 'tabs-page',
	templateUrl: 'tabs.html'
})
export class UtilitiesTabsPage {
	weather = WeatherComponent;
	compass = CompassPage;
  chart = NautChartPage;
	 ;
}
