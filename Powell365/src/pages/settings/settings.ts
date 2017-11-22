import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { MyApp } from '../../app/app.component';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, private scanner: BarcodeScanner, private storage: Storage) {
  	
  }

  scan(): void {
  	let _this = this;

  	this.scanner.scan().then((data) => {
		 	if(data.text) {
		 		let parsedData = JSON.parse(data.text);
		 		let settings = {
		 			"ConfigId": parsedData.siteCollConfigId,
					"SiteCollUrl": parsedData.siteCollUrl,
					"UserLoginName": parsedData.userLoginName,
	                "ClearWebCache": true
		 		}

		 		_this.storage.set("powell_settings", JSON.stringify(settings)).then(() => {
		 			_this.navCtrl.setRoot(MyApp, {}, { animate: true, direction: 'forward' });
		 		});
		 	}
		}, (err) => {
		    
		});
  }

}
