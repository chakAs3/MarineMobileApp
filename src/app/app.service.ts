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
  constructor(public af: AngularFire,public userProvider: UserProvider,public alertCtrl:AlertController) {
    this.products = this.af.database.list('portfolios',{
      query: {
        orderByChild: 'order',
      }
    });


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
     this.categories =  this.af.database.list('portfolios/'+id+'/families')

     return this.categories;
   }

   getCategoriesProducts(id,category){
     return this.af.database.list('families/'+category+'/products/');
   }

   getMyListProducts(uid){
      return this.af.database.list('mylistproducts/'+uid) ;
   }
   removeFromMyListProducts(uid,p){
      this.af.database.object(`mylistproducts/${uid}/${p.$key}`).remove();
   }
   addtoMyList(key){
     //console.log( `mylistproducts/${userId}/${key}` );
     this.userProvider.getUid().then(userID => this.af.database.object(`mylistproducts/${userID}/${key}`).set(true) );

   }
   getStores(){
     return this.af.database.list('stores/');
   }

   saveQRCode(qrcode){
     this.userProvider.getUid().then(userID => this.af.database.object(`user/${userID}/qrcode`).set(qrcode) );
   }

   sendMail(productslist?){
      // Check if sharing via email is supported
      SocialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
      //this.presentAlert('Sharing via email is possible');
      // Share via email
        SocialSharing.shareViaEmail('Hi i want more info about '+productslist, '3M Product list request',[ 'javachakir@gmail.com' ]).then(() => {
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

   presentAlert(message) {
     let alert = this.alertCtrl.create({
       title: 'Alert Message',
       subTitle: message,
       buttons: ['Dismiss']
     });
     alert.present();
   }



}
