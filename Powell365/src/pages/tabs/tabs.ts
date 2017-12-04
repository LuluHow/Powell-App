import { Component } from '@angular/core';

import { NotificationsPage } from '../notifications/notifications';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { PowellServices } from '../../app/app.service';
import { NgZone } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NotificationsPage;
  tab3Root = SettingsPage;

  public activeNotifications: boolean = false;
  public zone: NgZone;
  public badgeCount: any;
  configId:number;

  constructor(private storage: Storage, public events: Events, private service: PowellServices) {
  	this.zone = new NgZone({ enableLongStackTrace: false });
  	let badgeCount = 0;
  	let lastOpening
  	this.storage.get('powell_lastOpening').then((opening) => {
  		if(opening !== null) {
  			lastOpening = parseInt(opening);
  		} else {
  			lastOpening = Date.now();
  		}

  		this.getConfigId().then(() => {
	        this.service.getNotifications(this.configId).subscribe(data => {
	          let dateValue;
	          data.Notification.forEach((item, value) => {
	          	dateValue = new Date(item.Date).getTime();
	          	if(dateValue > lastOpening) {
	          		badgeCount++;
	          	}
	          });
	          this.storeNotification(data.Notification);
	          	this.zone.run(() => {
			  		this.badgeCount = (badgeCount === 0) ? "" : badgeCount;
			  		this.storage.set("powell_badgeCount", this.badgeCount.toString());
			  	});
	        }, err => {
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
	        });
		  	events.subscribe('notification:pushed', (notification) => {
		  		this.zone.run(() => {
			    	this.badgeCount = (this.badgeCount === "") ? 1 : this.badgeCount +1;
			    	this.storage.set("powell_badgeCount", this.badgeCount.toString());
			    });
			});

			events.subscribe('configuration:ready', (config) => {
		  		this.zone.run(() => {
			    	this.activeNotifications = config.App.IsNotification;
			    });
			});
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

  resetBadgeCount(): void {
  	this.storage.set('powell_lastOpening', Date.now());
  	this.storage.get('powell_badgeCount').then((data) => {
  		this.zone.run(() => {
	  		data = "";
  			this.badgeCount = "";
  			this.storage.set("powell_badgeCount", data);
	  	});
  	});
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
