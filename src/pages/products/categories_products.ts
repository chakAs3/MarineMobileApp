import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, AuthProviders,FirebaseListObservable } from 'angularfire2';

import {Login} from '../login/login';
import { AppService } from '../../app/app.service';

@Component({
  selector: 'page-categories_products',
  templateUrl: 'categories_products.html'
})
export class CategoryProductsPage {
  public categories_products: FirebaseListObservable<any>;
  public item :String ;
  public mainCategoryName:String ;
  constructor(public navCtrl: NavController,private navParams: NavParams,public af: AngularFire ,public appService:AppService) {
    this.af.auth.subscribe(
      user => console.trace(user+" There is a user   "),
      error => console.trace(error)
    );

    let id = navParams.get('id');
    let name = navParams.get('name');
    let category = navParams.get('category');

    this.mainCategoryName = name;
    this.categories_products = appService.getCategoriesProducts(id,category);

  }

  ionViewCanEnter(): boolean{
   // here we can either return true or false
   // depending on if we want to leave this view

      return true;

  }
  openSubCategories(p){
    //this.navCtrl.push();
    console.log(p);
  }

}
