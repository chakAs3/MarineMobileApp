import { Component } from '@angular/core';
import { Chats_Page } from '../chats/chats';
//import { AccountPage } from '../account/account';
import { Users_Page } from '../users/users';

@Component({
	selector: 'tabs-page',
	templateUrl: 'tabs.html'
})
export class MessengerTabsPage {
	chats = Chats_Page;
	users = Users_Page;
  //  profile = AccountPage;
}
