import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { HelpRequestPage } from '../pages/helpRequest/helpRequest';
import { Login } from '../pages/login/login';
import { ProductsPage } from '../pages/products/products';
import { TipsPage} from '../pages/tips/tips';
import { WeatherComponent } from '../pages/weather/weather.component';
import { ContestIntroPage } from '../pages/contest/contest-intro';
import { MessengerTabsPage }  from '../pages/tabs/tabs';
import { StoreLocator } from '../pages/store-locator/store-locator'
import { UtilitiesTabsPage }  from '../pages/utilities-tabs/tabs';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any,icon:string}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Boat Care', component: ProductsPage, icon: "boat"},
      { title: 'Help Request', component: HelpRequestPage, icon: "help-buoy" },
      { title: 'Tips and Tricks', component: TipsPage, icon :"bulb" },
      { title: 'Marine Utilities', component: UtilitiesTabsPage, icon :"compass" },
      { title: 'Contest and Loyalty Points', component: ContestIntroPage, icon :"cash" },
      { title: '3M Messenger', component: MessengerTabsPage, icon:"chatbubbles" },
      { title: '3M Stores', component: StoreLocator, icon:"cart"  },
      { title: 'My Profile', component: Login, icon:"contact"  }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component).catch(()=> console.log('should I stay or should I go now'));
  }
}
