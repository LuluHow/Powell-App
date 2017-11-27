import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NgZone } from '@angular/core';
import { BrowserTab } from '@ionic-native/browser-tab';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

	public notifications: any[] = [];
	public zone: NgZone;

  constructor(public navCtrl: NavController, public events: Events, private storage: Storage, private browserTab: BrowserTab) {
  	this.zone = new NgZone({ enableLongStackTrace: false });
  	events.subscribe('notification:pushed', (notification) => {
  		this.zone.run(() => {
	    	this.notifications.push(notification);
	    });
	});

	this.getNotifications();
  }

  getNotifications(): void {
  	this.storage.get('powell_notifications').then((data) => {
      alert(data);
  		if(data !== null) {
  			data = JSON.parse(data);
  			this.notifications = data;
  		}
  	});
  }

  removeNotification(notif: any): void {
  	this.notifications.forEach((item, i ) => {
  		if(item.url === notif.url) {
  			this.zone.run(() => {
		    	this.notifications.splice(i, 1);
		    	this.storage.set("powell_notifications", JSON.stringify(this.notifications));
		    });
  		}
  	})
  }

  navigateTo(url: string): void {
  	this.browserTab.openUrl(url);
  }
}
