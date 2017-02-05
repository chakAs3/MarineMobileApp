import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AngularFire, AuthProviders,FirebaseListObservable } from 'angularfire2';

import {Login} from '../login/login';
import {CategoriesPage} from '../products/categories';
import { AppService } from '../../app/app.service';

@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage {
  public products: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController,public af: AngularFire ,public appService:AppService) {
    this.af.auth.subscribe(
      user => console.trace(user+" There is a user   "),
      error => console.trace(error)
    );

    // add categories to firebase database ;
    //appService.addProductCategorys();
    this.products = appService.products;

  }

  ionViewCanEnter(): boolean{
   // here we can either return true or false
   // depending on if we want to leave this view

      return true;

  }
  openSubCategories(p){
    this.navCtrl.push(CategoriesPage,{id:p.$key,name:p.name});
    console.log(p);
  }

}