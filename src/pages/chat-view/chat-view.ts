import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ChatsProvider } from '../../providers/chats-provider/chats-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';

@Component({
  templateUrl: 'chat-view.html',
  selector: 'chat-view',
  styles:[".toolbar .toolbar-background{ background: #fff; } "]
})
export class ChatViewPage {
  message: string;
  uid:string;
  interlocutor:string;
  chats:FirebaseListObservable<any>;
  @ViewChild(Content) content: Content;
  constructor(public nav:NavController,
  params:NavParams,
  public chatsProvider:ChatsProvider,
  public af:AngularFire,
  public userProvider:UserProvider) {

    this.uid = params.data.uid;
    this.interlocutor = params.data.interlocutor;

    // Get Chat Reference
    chatsProvider.getChatRef(this.uid, this.interlocutor)
    .then((chatRef:any) => {
        this.chats = this.af.database.list(chatRef);
        this.chats.debounceTime(700).subscribe(data => this.content.scrollToBottom());
        chatsProvider.setMessageRead(this.uid, this.interlocutor);
    });
  }

  ionViewDidEnter() {
    this.content.scrollToBottom();
  }


  sendMessage() {
      if(this.message) {
          let chat = {
              from: this.uid,
              message: this.message,
              type: 'message'
          };
          this.chats.push(chat);
          this.message = "";
          this.chatsProvider.setMessageUnRead(this.uid, this.interlocutor);

      }
  };

  sendPicture() {
      let chat = {from: this.uid, type: 'picture', picture:null};
      this.userProvider.getPicture()
      .then((image) => {
          chat.picture =  image;
          this.chats.push(chat);
      });
  }

  getUserPicture(uid){
   return  this.userProvider.getUserPicture(uid);
  }
}
