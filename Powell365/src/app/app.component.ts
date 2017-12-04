import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { TabsPage } from '../pages/tabs/tabs';
import { FCM } from '@ionic-native/fcm';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';
import { ToastController, Nav } from 'ionic-angular';
import { PowellServices } from '../app/app.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  configId:number;

  constructor(platform: Platform, statusBar: StatusBar, private toastCtrl: ToastController, private browserTab: BrowserTab, private fcm: FCM, private storage: Storage, public events: Events, private service: PowellServices) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      this.getConfigId().then(() => {
        this.enableNotifications(this.configId.toString());
      });

      this.events.subscribe('app:isConfigured', () => {
        this.getConfigId().then(() => {
          this.enableNotifications(this.configId.toString());
        });
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
        this.events.publish('notification:pushed', data);
        if(data.wasTapped) {
          this.browserTab.openUrl(data.url);
        } else {
          let toast = this.toastCtrl.create({
          message: data.aps.alert.body,
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
  }
}
