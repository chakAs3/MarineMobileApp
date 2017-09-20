import {Injectable} from "@angular/core";


import { HomePage } from "../pages/home/home";
import { CategoryProductsPage } from "../pages/products/categories_products";
//import { ProductsPage } from "../pages/products/products";
import { Login } from "../pages/login/login";
import { MessengerTabsPage }  from '../pages/tabs/tabs';


@Injectable()
export class AppNavService {


  pages : Array<any> = new Array();
  constructor() {
    this.pages["home"] = HomePage;
    this.pages["categoryproducts"] = CategoryProductsPage;
    this.pages["login"] = Login;
    this.pages["messenger"] = MessengerTabsPage;
  //  this.pages["products"] = ProductsPage;
  }

  getPage(page:string){
     return this.pages[page];
  }






}
