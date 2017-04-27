import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { ChatsProvider } from '../../providers/chats-provider/chats-provider';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/map';
import { ChatViewPage }  from '../chat-view/chat-view';

@Component({
    templateUrl: 'chats.html',
    styles:[".badge { border-radius: 14px;}"]
})
export class Chats_Page {
    chats:Observable<any[]>;
    constructor(public chatsProvider: ChatsProvider,
        public userProvider: UserProvider,
        public af:AngularFire,
        public nav: NavController) {

            this.chatsProvider.getChats()
            .then(chats => {
                this.chats = chats.map(users => {
                    return users.reverse().reverse().map(user => {
                      console.log("chat -->"+user.$value);
                      console.log(user);
                        user.unread = user.$value ;
                        user.info = this.af.database.object(`/users/${user.$key}`);
                        return user;
                    });
                });
            });
        }


    openChat(key) {
        this.userProvider.getUid()
        .then(uid => {
            let param = {uid: uid, interlocutor: key};
            this.nav.push(ChatViewPage,param);
        });
    }

    getDisplay(email){
        if(email && email.split("@"))
        return  email.split("@")[0];
      return "Unknown";
    }
}
