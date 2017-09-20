import { Component } from '@angular/core';

import { NavController, NavParams ,AlertController } from 'ionic-angular';

import { AngularFire, AuthProviders,FirebaseListObservable } from 'angularfire2';

import {Login} from '../login/login';
import { ProductDetailsPage } from '../products/product_details';
import { AppService } from '../../app/app.service';
import { UserProvider} from '../../providers/user-provider/user-provider';
import { ShoppingProductsPage } from '../shopping/shopping_products';

@Component({
  selector: 'page-myorders',
  templateUrl: 'myorders.html'
})
export class MyOrdersPage {
  public myorders: FirebaseListObservable<any>;
  public products: Array<any>;



  constructor(public navCtrl: NavController,private navParams: NavParams,public af: AngularFire ,public appService:AppService ,public userProvider:UserProvider,public alertCtrl:AlertController) {
    this.af.auth.subscribe(
      user => console.trace(user+" There is a user   "),
      error => console.trace(error)
    );

      // show favorite list
     this.userProvider.getUid().then( uid => {
        console.log('UID ',uid);
        this.myorders = appService.getMyOrders(uid);
        this.myorders.subscribe(data => this.products = data);
      });







  }

  ionViewCanEnter(): boolean{
   // here we can either return true or false
   // depending on if we want to leave this view

      return this.af.auth.getAuth() != undefined;

  }

  goToMycart(){
    this.navCtrl.push(ShoppingProductsPage,{name:"My Cart List",mycart:true});
  }



}
