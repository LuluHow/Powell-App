var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
var PowellServices = /** @class */ (function () {
    function PowellServices(http) {
        this.http = http;
    }
    PowellServices.prototype.createRefererHeader = function (headers) {
        headers.append('Referer', 'https://expertime365.sharepoint.com/sites/intranet/Pages/default.aspx');
    };
    PowellServices.prototype.dataToJson = function (res) {
        return res.json();
    };
    PowellServices.prototype.get = function (configId) {
        var headers = new Headers();
        this.createRefererHeader(headers);
        var url = 'https://cdn.powell-365.com/api/Manager/GetConfigAppMobile?projectConfigId=' + configId;
        return this.http.get(url, { headers: headers }).map(this.dataToJson);
    };
    PowellServices = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], PowellServices);
    return PowellServices;
}());
export { PowellServices };
//# sourceMappingURL=app.service.js.map