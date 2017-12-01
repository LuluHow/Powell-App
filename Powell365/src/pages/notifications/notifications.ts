import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NgZone } from '@angular/core';
import { BrowserTab } from '@ionic-native/browser-tab';
import { PowellServices } from '../../app/app.service';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

	public notifications: any[] = [];
	public zone: NgZone;
  public dataLoaded: boolean;
  private configId: number;

  constructor(public navCtrl: NavController, public events: Events, private storage: Storage, private browserTab: BrowserTab, private service: PowellServices) {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.getConfigId().then(() => {
      this.service.getNotifications(this.configId).subscribe(data => {
        this.storeNotification(data.Notification).then(() => {
          this.getNotifications();
        });
      }, err => {
        this.getNotifications();
      });
    });
  	events.subscribe('notification:pushed', (notification) => {
  		this.zone.run(() => {
        let parsedNotification = {
          Body: notification.aps.alert.body,
          Title: notification.aps.alert.title,
          Author: notification.aps.alert.author,
          Date: Date.now(),
          Url: notification.aps.alert.url,
        };
	    	this.notifications.unshift(parsedNotification);
	    });
	});

  }

  getConfigId(): Promise<void> {
    return new Promise((resolve, reject) => {
       this.storage.get('powell_settings').then((data) => {
        if(data !== null) {
          data = JSON.parse(data);
          this.configId = data.ConfigId;
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  getNotifications(): void {
  	this.storage.get('powell_notifications').then((data) => {
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

  storeNotification(notif: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get('powell_notifications').then((data) => {
        if(data !== null) {
          data = JSON.parse(data);
        } else {
          data = [];
        }

        if(Array.isArray(notif)) {
          data = notif;
        }
         else {
           data.push(notif);
         }
        // data.splice(30);
        this.storage.set("powell_notifications", JSON.stringify(data)).then(() => {
          resolve();
        });
      });
    });  
  }
}
