import { Component } from '@angular/core';

import { NotificationsPage } from '../notifications/notifications';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NotificationsPage;
  tab3Root = SettingsPage;

  constructor(private storage: Storage) {

  }

  resetBadgeCount(): void {
  	this.storage.get('powell_badgeCount').then((data) => {
  		if(data !== null) {
  			data = parseInt(data);
  			data = 0;

  			this.storage.set("powell_badgeCount", data);
  		}
  	});
  }
}
