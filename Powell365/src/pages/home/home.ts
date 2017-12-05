import { Component, Renderer, ElementRef, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Content, Nav, NavParams } from 'ionic-angular';

import { Events } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SettingsPage } from '../settings/settings';
import { PowellServices } from '../../app/app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { normalizeURL } from 'ionic-angular';
import { NgZone } from '@angular/core';

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
  public zone: NgZone;
  @ViewChild(Content) content: Content;
  @ViewChild(Nav) navChild: Nav;

  constructor(public navCtrl: NavController, private browserTab: BrowserTab, elementRef: ElementRef,
  renderer: Renderer, private storage: Storage, private service: PowellServices, private sanitized: DomSanitizer, private splashScreen: SplashScreen, public events: Events, public navParams: NavParams) {
  		var _this = this;
      _this.init(renderer, elementRef);
      _this.events.subscribe('app:isConfigured', () => {
        _this.init(renderer, elementRef);
      });
  }

  init(renderer: Renderer, elementRef: ElementRef): void {
    var _this = this;
      _this.zone = new NgZone({ enableLongStackTrace: false });
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
  				_this.setConfiguration(config);
  			},
  			err => {
          _this.storage.get("powell_render").then((config) => {
            if(config !== null) {
              config = JSON.parse(config);
              _this.setConfiguration(config);
            }
          })
  			});
  		} else {
        _this.splashScreen.hide();
  			_this.navCtrl.push(SettingsPage);
  		}
  	});

  	return returnValue;
  }

  setConfiguration(config: any): void {
    let _this = this;
    _this.zone.run(() => {
      _this.config = config;
      _this.events.publish('configuration:ready', config);
      _this.barTitle = _this.config.App.BarTitle;
      _this.storage.set("powell_render", JSON.stringify(_this.config));
      _this.htmlString = _this.sanitized.bypassSecurityTrustHtml(_this.config.App.ContentHtml);
      _this.cssString = _this.sanitized.bypassSecurityTrustHtml("<style>"+_this.config.App.ContentCss+"</style>");
      _this.splashScreen.hide();
      _this.content.resize();
    });
  }

  navigateTo(url: string): void {
  	console.log(url);
  }

}
