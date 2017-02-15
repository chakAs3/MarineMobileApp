import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class AppService {
  public products: FirebaseListObservable<any>;

  public categories :   any;
  constructor(public af: AngularFire) {
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

   getMyListProducts(){
     return this.af.database.list('mylistproducts/');
   }
   addtoMyList(key){
     console.log( `mylistproducts/${key}` );
     this.af.database.object(`mylistproducts/${key}`).set(true);
   }
   getStores(){
     return this.af.database.list('stores/');
   }





}
