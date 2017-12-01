import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { PowellServices } from './app.service';

import { NotificationsPage } from '../pages/notifications/notifications';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserTab } from '@ionic-native/browser-tab';

import { IonicStorageModule } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { FCM } from '@ionic-native/fcm';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  declarations: [
    MyApp,
    NotificationsPage,
    SettingsPage,
    HomePage,
    TabsPage,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationsPage,
    SettingsPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    PowellServices,
    BrowserTab,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
