import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, AuthProviders,FirebaseListObservable } from 'angularfire2';

import {Login} from '../login/login';
import { CategoryProductsPage } from './categories_products';
import { AppService } from '../../app/app.service';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
  styles:["h5 {font-size:12px;}"]
})
export class CategoriesPage {
  public categories: FirebaseListObservable<any>;
  public item :String ;
  public mainCategoryName:String ;
  public id ;
  constructor(public navCtrl: NavController,private navParams: NavParams,public af: AngularFire ,public appService:AppService) {
    this.af.auth.subscribe(
      user => console.trace(user+" There is a user   "),
      error => console.trace(error)
    );

    this.id = navParams.get('id');
    let name = navParams.get('name');

    this.mainCategoryName = name;
    this.categories = appService.getCategories(this.id);

  }

  ionViewCanEnter(): boolean{
   // here we can either return true or false
   // depending on if we want to leave this view

      return true;

  }
  openSubCategories(p){
    //this.navCtrl.push();
    this.navCtrl.push(CategoryProductsPage,{id:this.id,category:p.$key,name:p.name});
    console.log(p);
  }

}
