import { Component ,Input} from '@angular/core';

import { NavController } from 'ionic-angular';

import { ContestIntroPage} from '../contest/contest-intro';
import { AppNavService } from '../../app/appNav.service';

import { ChatsProvider } from '../../providers/chats-provider/chats-provider';

@Component({
  selector: 'page-header',
  templateUrl: 'header.html'
})
export class Header {
  @Input() title: string;
  @Input() subtitle: string;

   unreads_msg ;
  constructor(public navCtrl: NavController,public appNav:AppNavService,public chatsProvider:ChatsProvider) {
      console.log("Header =>")
      chatsProvider.getUndreadChats().then(chats => {
        console.log(chats) ;console.log("coming chats") ;
        chats.subscribe(unreads=>this.unreads_msg = unreads.length  );

       });
  }

  gotoContestPage(){
    this.navCtrl.setRoot(ContestIntroPage);
  }
  goHomePage(){
    //console.log("goHomePage "+this.appNav.getPage("home"));
    this.navCtrl.setRoot(this.appNav.getPage("home"));
  }

  goMessengerPage(){
    //console.log("goHomePage "+this.appNav.getPage("home"));
    console.log("goMessengerPage")
    this.navCtrl.setRoot(this.appNav.getPage("messenger"));
  }

}
