import { Component } from '@angular/core';

import { NavController, NavParams ,AlertController } from 'ionic-angular';

import { AngularFire, AuthProviders,FirebaseListObservable } from 'angularfire2';

import {Login} from '../login/login';
import { ProductDetailsPage } from '../products/product_details';
import { MyOrdersPage } from '../shopping/myorders';
import { AppService } from '../../app/app.service';
import { UserProvider} from '../../providers/user-provider/user-provider';

@Component({
  selector: 'page-shopping_products',
  templateUrl: 'shopping_products.html'
})
export class ShoppingProductsPage {
  public categories_products: FirebaseListObservable<any>;
  public products: Array<any>;
  public item :String ;
  public mainCategoryName:String ;
  public total=0;

  public country = "uae";

  public currencies = {uae:"AED",bahrain:"BHD",qatar:"QAR",kuwait:"KWD"};
  constructor(public navCtrl: NavController,private navParams: NavParams,public af: AngularFire ,public appService:AppService ,public userProvider:UserProvider,public alertCtrl:AlertController) {
    this.af.auth.subscribe(
      user => console.trace(user+" There is a user   "),
      error => console.trace(error)
    );

    let id = navParams.get('id');
    let name = navParams.get('name');
    let category =  navParams.get('mycart');

    this.mainCategoryName = name;



    let mappingFun =  (products) => this.products = products.map( product => {
      product.info = {name:"-"+product.$key,image:" "} ;
      //product.quatity = 1;
      this.total=0;
       this.af.database.object(`/shopping_products/${product.$key}`).subscribe(data =>
         { product.info = data

           if(data.PRICE)
           this.total+=parseFloat(data.PRICE[this.country].split(" ")[1])* parseFloat(product.quatity) ;
         });

      return product ;
    } );

    if( !category ){
    this.categories_products = appService.getShopProducts();
    this.categories_products.subscribe( mappingFun );
    }else // show favorite list
    this.userProvider.getUid().then( uid => {
        console.log('====UID ',uid);
        this.categories_products = appService.getMyCartProducts(uid);
        this.categories_products.subscribe(mappingFun)
      }

    );





  }

  ionViewCanEnter(): boolean{
   // here we can either return true or false
   // depending on if we want to leave this view

      return this.af.auth.getAuth() != undefined;

  }
  goProductDetail(p){
    this.navCtrl.push(ProductDetailsPage ,{productData:p,isshop:true});

  }
  removeFromList(p){
    //console.log(' removeFromList ' + p);
    this.userProvider.getUid().then( uid => {
        this.appService.removeFromMyCartProducts(uid,p);
      }
    );
  }
  goToMylist(){
    this.navCtrl.push(ShoppingProductsPage,{name:"My Favorite List"});
  }
  goToMycart(){
    this.navCtrl.push(ShoppingProductsPage,{name:"My Cart List",mycart:true});
  }
  contactForlist(){
    // let html = "<ul>\r"
    // for (let entry of this.products) {
    //    console.log(entry.info); // 1, "string", false
    //    html=html+ '\r\n<li>['+entry.info['STOCK NUMBER']+' : '+entry.info['PRODUCT DESCRIPTION']+']<li>'
    // }
    // html = html+"</ul>";
    // this.appService.sendMail(html);
    this.confimationOrder();

  }
  confimationOrder(){


    let alert = this.alertCtrl.create({
                 title: 'Confirm purchase',
                 message: 'Do you want to buy these products?',
                 buttons: [
                   {
                     text: 'Cancel',
                     role: 'cancel',
                     handler: () => {
                       console.log('Cancel clicked');
                     }
                   },
                   {
                     text: 'Buy',
                     handler: () => {
                       console.log('Buy clicked');
                       this.sendShoppingMail();
                     }
                   }
                 ]
                });
        alert.present();

  }

  sendShoppingMail(){

   /*  let html = "<ul>\r"
    for (let entry of this.products) {
       console.log(entry.info); // 1, "string", false
       html=html+ '\r\n<li>['+entry.info['STOCK NUMBER']+' : '+entry.info['PRODUCT DESCRIPTION']+']<li>'
    }
    html = html+"</ul>";*/

  //  console.log(html);
    this.appService.addOrder(this.products,this.currencies[this.country]+" "+this.total);

    this.orderDone = true ;

    // this.appService.sendMail(html);

  }
  orderDone = false ;
  getTotal(){

  }
  setCurrency(country){
     this.country = country ;
     this.appService.country = country;
  }
  gotoMyOrders(){
    this.navCtrl.push(MyOrdersPage);
  }

  setQuatity(p,q){
    this.userProvider.getUid().then( uid => {
        this.appService.setQuatity(uid,p,q);
      }
    );
  }

}
