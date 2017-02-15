import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { HelpRequestPage } from '../pages/helpRequest/helpRequest';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { ProductsPage } from '../pages/products/products';
import { CategoriesPage } from '../pages/products/categories';
import { CategoryProductsPage } from '../pages/products/categories_products';
import { ProductDetailsPage } from '../pages/products/product_details';

import { TipsPage } from '../pages/tips/tips';
import { WeatherComponent } from '../pages/weather/weather.component';
import { ContestIntroPage } from '../pages/contest/contest-intro';
import { StoreLocator } from '../pages/store-locator/store-locator';
import { UtilitiesTabsPage } from '../pages/utilities-tabs/tabs';
import { CompassPage } from '../pages/compass/compass';
import { NautChartPage } from '../pages/naut-chart/naut-chart';

import { MessengerTabsPage } from '../pages/tabs/tabs';
import { Users_Page } from '../pages/users/users';
import { Chats_Page } from '../pages/chats/chats';
//import { AccountPage } from '../pages/account/account';
import { ChatViewPage } from '../pages/chat-view/chat-view';

import { AuthProvider } from '../providers/auth-provider/auth-provider';
import { ChatsProvider } from '../providers/chats-provider/chats-provider';
import { UserProvider } from '../providers/user-provider/user-provider';
import { UtilProvider } from '../providers/utils';

import { AppService } from './app.service';
import { Ng2MapModule} from 'ng2-map';


import {
  AngularFireModule,
  AuthMethods,
  AuthProviders
} from "angularfire2";

const firebaseConfig = {
      apiKey: "AIzaSyA0xInbZjg2qT2mUG793ZkLzE4dNJq3OjA",
      authDomain: "mmarine-a3a8b.firebaseapp.com",
      databaseURL: "https://mmarine-a3a8b.firebaseio.com",
      storageBucket: "mmarine-a3a8b.appspot.com",
      messagingSenderId: "222878468353"
};


@NgModule({
  declarations: [
    MyApp,
    HelpRequestPage,
    ContactPage,
    HomePage,
    ProductsPage,
    CategoriesPage,
    CategoryProductsPage,
    TipsPage,
    WeatherComponent,
    ContestIntroPage,
    MessengerTabsPage,
    Users_Page,
    Chats_Page,
    ChatViewPage,
    StoreLocator,
    Login,
    UtilitiesTabsPage,
    CompassPage,
    NautChartPage,
    ProductDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    Ng2MapModule,
    AngularFireModule.initializeApp(firebaseConfig,{
    /*  provider: AuthProviders.Facebook,*/
    provider: AuthProviders.Password,
    method: AuthMethods.Password
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelpRequestPage,
    ContactPage,
    HomePage,
    ProductsPage,
    CategoriesPage,
    CategoryProductsPage,
    TipsPage,
    WeatherComponent,
    ContestIntroPage,
    MessengerTabsPage,
    Users_Page,
    Chats_Page,
    ChatViewPage,
    StoreLocator,
    Login,
    UtilitiesTabsPage,
    CompassPage,
    NautChartPage,
    ProductDetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},AppService,AuthProvider, ChatsProvider, UserProvider, UtilProvider, Storage]
})
export class AppModule {}
