import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { UserProvider } from '../providers/user-provider/user-provider';

import { SocialSharing} from 'ionic-native';
import { AlertController }  from 'ionic-angular';

@Injectable()
export class AppService {
  public products: FirebaseListObservable<any>;

  public categories :   any;
  public email;

  public sendtoemail:string ;

  public country = "uae";
  constructor(public af: AngularFire,public userProvider: UserProvider,public alertCtrl:AlertController) {
    this.products = this.af.database.list('portfolios',{
      query: {
        orderByChild: 'order',
      }
    });

    this.af.database.object('email').subscribe(data => this.sendtoemail = data.$value);


  }

  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect,
    });
  }

  /**
   * Logs out the current user
   */
  logout() {
    return this.af.auth.logout();
  }

  /**
   *
   */


  /**
   * Saves a message to the Firebase Realtime Database
   * @param text
   */
  sendMessage(text) {

  }

  addProductCategorys(){
  }
   getProductsMainCategories(){
     return this.products ;
   }
   getCategories(id){
     this.categories =  this.af.database.list('portfolios/'+id+'/families',{
       query: {
         orderByChild: 'order',
       } });

     return this.categories;
   }

   getCategoriesProducts(id,category){
     return this.af.database.list('families/'+category+'/products/');
   }

   getShopProducts(){
     return this.af.database.list('shopping_products/');
   }

   getMyListProducts(uid){
      return this.af.database.list('mylistproducts/'+uid) ;
   }
   getMyCartProducts(uid){
      return this.af.database.list('myshoppingcarts/'+uid) ;
   }
   getMyOrders(uid){
      return this.af.database.list('myshopping/'+uid+'/orders') ;
   }
   removeFromMyListProducts(uid,p){
      this.af.database.object(`mylistproducts/${uid}/${p.$key}`).remove();
   }
   removeFromMyCartProducts(uid,p){
      this.af.database.object(`myshoppingcarts/${uid}/${p.$key}`).remove();
   }
   setQuatity(uid,p,q){
      this.af.database.object(`myshoppingcarts/${uid}/${p.$key}`).set({quatity:q});
   }
   addtoMyList(key){
     //console.log( `mylistproducts/${userId}/${key}` );
     this.userProvider.getUid().then(userID => this.af.database.object(`mylistproducts/${userID}/${key}`).set(true) );

   }
   addtoMyCart(key){
     //console.log( `mylistproducts/${userId}/${key}` );
     this.userProvider.getUid().then(userID =>  { console.log('userID '+userID); this.af.database.object(`myshoppingcarts/${userID}/${key}`).set({quatity:1}) });

   }
   getStores(){
     return this.af.database.list('stores/');
   }

   saveQRCode(qrcode){
     this.userProvider.getUid().then(userID => this.af.database.object(`user/${userID}/qrcode`).set(qrcode) );
   }
    getQRCode():Promise<any>{
        return this.userProvider.getUid().then(userID => this.af.database.object(`user/${userID}/qrcode`) );
    }

   sendMail(productslist?){
      // Check if sharing via email is supported
      // console.log(this.sendtoemail);
      SocialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
      //this.presentAlert('Sharing via email is possible');
      // Share via email
        SocialSharing.shareViaEmail('Hi i want more info about '+productslist, '3M Product list request',[ this.sendtoemail ]).then(() => {
         // Success!
         //this.presentAlert('Success');
        }).catch(() => {
         // Error!
         this.presentAlert('Error to send');
        });
      }).catch(() => {
      // Sharing via email is not possible
      this.presentAlert('Sharing via email is not possible');
      });

   }

   addOrder(products,total){
     console.log(products);
    //let pproducts=products.forEach(e=>{ e.$key = null ;console.log(e)})
     let pproducts=products.map(it=>{ ;return {  id:it.$key,stock:it.info["STOCK NUMBER"],photo:it.info["PRODUCT PHOTO"],description:it.info["PRODUCT DESCRIPTION"],price:it.info.PRICE[this.country],quatity:it.quatity} });
     console.log(pproducts);
     this.userProvider.getUid().then(userID => this.af.database.list(`myshopping/${userID}/orders`).push({products:pproducts,email:this.email,to:this.sendtoemail,total:total}) );
   }

   presentAlert(message) {
     let alert = this.alertCtrl.create({
       title: 'Alert Message',
       subTitle: message,
       buttons: ['Dismiss']
     });
     alert.present();
   }



}
