import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class AppService {
  public products: FirebaseListObservable<any>;

  public categories :   FirebaseListObservable<any>;
  constructor(public af: AngularFire) {
    this.products = this.af.database.list('products');
  //  this.product = this.af.database.object('products/-Kbf9H_DiFjXj5kTjkxg')
    //this.addProductCategorys();
    //this.product.update({categories:[{name:'Compounds',image:'',products:["produc1","product2"]  },
      //             {name:'Polishes',image:'',products:["produc1","product2"]  }
    //]})

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
     this.products.push({name:"Buffing and Polishing" ,image:"http://3mmarine.com/media/marine/misc/categories-vam.jpg" , categories:[]})
     this.products.push({name:"Sanding and Grinding" ,image:"http://3mmarine.com/media/marine/misc/categories-abrasives.jpg" , categories:[]})
     this.products.push({name:"Spray Equipment" ,image:"http://3mmarine.com/media/marine/misc/categories-spray.jpg" , categories:[]})
     this.products.push({name:"Masking" ,image:"http://3mmarine.com/media/marine/misc/categories-masking.jpg" , categories:[]})
     this.products.push({name:"Marine Body Fillers" ,image:"http://3mmarine.com/media/marine/misc/categories-fillers.jpg" , categories:[]})
 }
 getProductsMainCategories(){
   return this.products ;
 }
 getCategories(id){
   this.categories = this.af.database.list('products/'+id+'/categories');
   return this.categories;
 }

 getCategoriesProducts(id,category){
   return this.af.database.list('products/'+id+'/categories/'+category+'/products');
 }





}
