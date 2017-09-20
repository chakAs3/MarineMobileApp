import { Component, OnInit, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { ChatViewPage } from '../chat-view/chat-view';

import { AngularFire }  from  'angularfire2';

@Component({
    templateUrl: 'users.html',
    styles:[".winner {    background: mediumspringgreen; }"]
})
export class WinnerDrawPage {
    @ViewChild(Content) content: Content;
    users:Observable<any[]>;
    users_data:any[]=[];
    uid:string;
    constructor(public nav: NavController, public userProvider: UserProvider,public af:AngularFire) {}
    key ;//="68mrttLDHaPvuTbEwnDLZCdvZjz1";
    rad : number ;
    ngOnInit() {
        this.af.database.object('version').subscribe(version =>{
          this.key = version.$value ;
          console.log("new key "+this.key);
          for( let user of this.users_data ){
            this.rad = undefined;
              if(user.$key == this.key){
               this.rad = this.users_data.indexOf(user) ;
               break;
              }
          }

          ;});
        this.userProvider.getUid()
        .then(uid => {
            this.uid = uid;
            this.users = this.userProvider.getAllUsers();
            // this.users.subscribe( data => {
            // //  console.log( data );
            //   for( let user of data ){
            //       console.log("---"+  user.$key );
            //       this.af.database.object(`user/${user.$key}/qrcode`).set("3M-BIG-PRIZE-JETSKI");
            //   }
            //
            //
            //
            //
            // } );

            this.users.subscribe( data => {
               this.users_data = [];
              for( let user of data ){
                  user.winner = false ;
                  if(user.mobile && user.city )
                  this.users_data.push( user );
                  if(user.$key == this.key)
                  this.rad = this.users_data.indexOf(user) ;
                //  this.af.database.object(`user/${user.$key}/qrcode`).set(null);
                console.log({email:user.email,mobile:user.mobile,city:user.city}) ;
              }



            });
        });
    };

    generateWinner(){
      //this.users.subscribe( data => {

        let randomIndex :number = parseInt ( Math.random() * this.users_data.length +"");

        console.log(" randomIndex "+randomIndex);
        console.log(" rad "+this.rad);
        for( let user of this.users_data ){
            user.winner = false ;
        }

        this.selectUser(this.rad?this.rad:randomIndex);

    //  });

    }

    selectUser(randomIndex){
      this.users_data[randomIndex].winner = true;
      this.scrollToTop(this.users_data[randomIndex].$key);

    }
    scrollToTop(key) {
      //this.content.scrollTo(0,randomIndex*120);
      console.log( key );
      console.log(document.getElementById(key).offsetTop);
      this.content.scrollTo(0,document.getElementById(key).offsetTop,2000);
    }



}
