import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, AuthProviders,FirebaseListObservable } from 'angularfire2';

import {Login} from '../login/login';
import { StoreLocator } from '../store-locator/store-locator';
import { CategoryProductsPage } from './categories_products';
import { ShoppingProductsPage } from '../shopping/shopping_products'
import { AppService } from '../../app/app.service';
import { UserProvider } from '../../providers/user-provider/user-provider'

@Component({
  selector: 'page-products_details',
  templateUrl: 'product_details.html',
  styles:["h5 {font-size:12px;}   ion-card{ background:none } p{ padding-top:20px:margin-bottom:10px}"]
})
export class ProductDetailsPage {

  public item :String ;
  public mainCategoryName:String ;
  public id ;
  public data;
  public isshop = false ;
  public country = "uae"

  constructor(public navCtrl: NavController,private navParams: NavParams,public af: AngularFire ,public appService:AppService, public userProvider:UserProvider) {
    this.af.auth.subscribe(
      user => console.trace(user+" There is a user   "),
      error => console.trace(error)
    );

    this.data = navParams.get('productData');
    let name = navParams.get('name');
    this.isshop = navParams.get('isshop');
   //this.af.database.object(`/families/${family.$key}`)
    this.mainCategoryName = name;

    this.country =  appService.country

  }

  ionViewCanEnter(): boolean{
   // here we can either return true or false
   // depending on if we want to leave this view
      return true;
  }

  goToStores(){
    //this.navCtrl.push();
    this.navCtrl.push(StoreLocator,{data:this.data});
    //console.log(p);
  }

  addToMylist(p){
    if(!this.isshop)
     this.appService.addtoMyList(p.$key);
    else
     this.appService.addtoMyCart(p.$key);


     this.navCtrl.pop();


  }

  goToMylist(){
    this.navCtrl.push(CategoryProductsPage,{name:"My Favorite List"});
    //this.appService.sendMail();
  }
  goToMycart(){
    this.navCtrl.push(ShoppingProductsPage,{name:"My Cart List",mycart:true});
    //this.appService.sendMail();
  }

}
