import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { ChatViewPage } from '../chat-view/chat-view';

import { AngularFire }  from  'angularfire2';

@Component({
    templateUrl: 'users.html'
})
export class Users_Page {
    users:Observable<any[]>;
    uid:string;
    constructor(public nav: NavController, public userProvider: UserProvider,public af:AngularFire) {}

    ngOnInit() {
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
        });
    };

    openChat(key) {
        let param = {uid: this.uid, interlocutor: key};
        this.nav.push(ChatViewPage,param);
    }
    getDisplay(email){
        if(email && email.split("@"))
        return  email.split("@")[0];
      return "Unknown";
    }
}
