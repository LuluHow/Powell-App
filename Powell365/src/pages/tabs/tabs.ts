import { Component } from '@angular/core';

import { NotificationsPage } from '../notifications/notifications';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { NgZone } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NotificationsPage;
  tab3Root = SettingsPage;
  public zone: NgZone;
  public badgeCount: any;

  constructor(private storage: Storage, public events: Events) {
  	this.zone = new NgZone({ enableLongStackTrace: false });
  	events.subscribe('notification:pushed', (notification) => {
  		this.zone.run(() => {
	    	this.badgeCount = (this.badgeCount === "") ? 1 : this.badgeCount +1;
	    });
	});

	this.storage.get('powell_badgeCount').then((data) => {
		this.zone.run(() => {
	  		if(data !== null && data !== "") {
	  			data = parseInt(data);
	  			this.badgeCount = data;
	  		} else {
	  			this.badgeCount = "";
	  		}
	  	});
  	});
  }

  resetBadgeCount(): void {
  	this.storage.get('powell_badgeCount').then((data) => {
  		this.zone.run(() => {
	  		data = "";
  			this.badgeCount = "";
  			this.storage.set("powell_badgeCount", data);
	  	});
  	});
  }
}
