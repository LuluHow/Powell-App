import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { TabsPage } from '../pages/tabs/tabs';
import { FCM } from '@ionic-native/fcm';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';
import { ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  configId:number;

  constructor(platform: Platform, statusBar: StatusBar, private toastCtrl: ToastController, private browserTab: BrowserTab, private fcm: FCM, private storage: Storage, public events: Events) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      this.getConfigId().then(() => {
        this.enableNotifications(this.configId.toString());
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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

  enableNotifications(configId: string): void {
    this.fcm.subscribeToTopic(configId);
    this.fcm.onNotification().subscribe(data=>{
      this.storeNotification(data).then(() => {
        this.events.publish('notification:pushed', data);

        if(data.wasTapped) {
          this.browserTab.openUrl(data.url);
        } else {
          let toast = this.toastCtrl.create({
          message: data.body,
          duration: 5000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: "Ok"
        });

        toast.onDidDismiss((role) => {
          // this.browserTab.openUrl(data.url);
        });

        toast.present();
        }
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

        notif.date = Date.now();
        data.push(notif);

        this.storage.set("powell_notifications", JSON.stringify(data)).then(() => {
          resolve();
        });
      });
    });  
  }
}
