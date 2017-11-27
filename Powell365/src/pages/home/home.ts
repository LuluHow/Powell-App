import { Component, Renderer, ElementRef, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Content } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';
import { PowellServices } from '../../app/app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { normalizeURL } from 'ionic-angular';

import { BrowserTab } from '@ionic-native/browser-tab';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	private config;
	public htmlString;
  public cssString;
  public barTitle;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, private browserTab: BrowserTab, elementRef: ElementRef,
  renderer: Renderer, private storage: Storage, private service: PowellServices, private sanitized: DomSanitizer, private splashScreen: SplashScreen) {
  		var _this = this;
  		_this.checkForSettings();

  		renderer.listen(elementRef.nativeElement, 'click', (event) => {
		    var rc;
		    	var currentNode = event.target;
		    	for (var i = 0; i < 3; i++) {
		    		if(currentNode.attributes.to) {
		    			rc = _this.processClickOnATag(currentNode.attributes.to.value);
		    		} else {
		    			currentNode = currentNode.parentNode;
		    		}
		    	}
		    return rc;
		  })
  		}

	  processClickOnATag(href: string): void {
		  this.browserTab.isAvailable()
	    	.then((isAvailable: boolean) => {

	      if (isAvailable && href) {

	        this.browserTab.openUrl(href);

	      }

	    });
	}

  checkForSettings(): Boolean {
  	let _this = this;
  	let returnValue: Boolean;

  	// _this.service.get(1081).subscribe(config => { 
  	// 			_this.config = config;

  	// 			_this.htmlString = _this.sanitized.bypassSecurityTrustHtml(_this.config.App.ContentHtml);
   //        _this.cssString = _this.sanitized.bypassSecurityTrustHtml("<style>"+_this.config.App.ContentCss+"</style>");
  	// 		},
  	// 		err => {
  	// 			alert('fuck off');
  	// 		});

  	_this.storage.get('powell_settings').then((data) => {
  		if(data !== null) {
  			data = JSON.parse(data);
  			_this.service.get(data.ConfigId).subscribe(config => { 
  				_this.config = config;
          _this.barTitle = _this.config.App.BarTitle;
   _this.storage.set("powell_render", JSON.stringify(_this.config.App));
  				_this.htmlString = _this.sanitized.bypassSecurityTrustHtml(_this.config.App.ContentHtml);
          _this.cssString = _this.sanitized.bypassSecurityTrustHtml("<style>"+_this.config.App.ContentCss+"</style>");
          _this.splashScreen.hide();
          _this.content.resize();
  			},
  			err => {
  			});
  		} else {
        _this.splashScreen.hide();
  			_this.navCtrl.setRoot(SettingsPage, {}, { animate: true, direction: 'forward' });
  		}
  	});

  	return returnValue;
  }

  navigateTo(url: string): void {
  	console.log(url);
  }

}
