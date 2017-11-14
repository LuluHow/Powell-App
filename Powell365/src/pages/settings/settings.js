var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, scanner, storage) {
        this.navCtrl = navCtrl;
        this.scanner = scanner;
        this.storage = storage;
        this._init();
    }
    SettingsPage.prototype._init = function () {
        var _this = this;
        this.scanner.scan().then(function (data) {
            if (data.text) {
                var parsedData = JSON.parse(data.text);
                alert(data.text);
                var settings = {
                    "ConfigId": parsedData.siteCollConfigId,
                    "SiteCollUrl": parsedData.siteCollUrl,
                    "UserLoginName": parsedData.userLoginName,
                    "ClearWebCache": true
                };
                _this.storage.set("powell_settings", settings).then(function () {
                    _this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' });
                });
            }
        }, function (err) {
        });
    };
    SettingsPage = __decorate([
        Component({
            selector: 'page-settings',
            templateUrl: 'settings.html'
        }),
        __metadata("design:paramtypes", [NavController, BarcodeScanner, Storage])
    ], SettingsPage);
    return SettingsPage;
}());
export { SettingsPage };
//# sourceMappingURL=settings.js.map