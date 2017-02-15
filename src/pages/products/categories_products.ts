import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, AuthProviders,FirebaseListObservable } from 'angularfire2';

import {Login} from '../login/login';
import { ProductDetailsPage } from '../products/product_details';
import { AppService } from '../../app/app.service';

@Component({
  selector: 'page-categories_products',
  templateUrl: 'categories_products.html'
})
export class CategoryProductsPage {
  public categories_products: FirebaseListObservable<any>;
  public products: FirebaseListObservable<any>;
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

    if(category)
    this.categories_products = appService.getCategoriesProducts(id,category);
    else // show favorite list
    this.categories_products = appService.getMyListProducts();

    this.categories_products.subscribe( products => this.products = products.map( product => {
      product.info = {name:"-"+product.$key,image:" "} ;
       this.af.database.object(`/products/${product.$key}`).subscribe(data => product.info = data);
      return product ;
     } ));

  }

  ionViewCanEnter(): boolean{
   // here we can either return true or false
   // depending on if we want to leave this view

      return true;

  }
  goProductDetail(p){
    this.navCtrl.push(ProductDetailsPage ,{productData:p});

  }

}
