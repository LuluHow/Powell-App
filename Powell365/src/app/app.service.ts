import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class PowellServices {

	private R7CDNRootUrl: string = "https://r7-cdn.powell-365.com";
	private CDNRootUrl: string = "https://cdn.powell-365.com";

	constructor(private http: Http) { }

	createRefererHeader(headers: Headers, configId: number):void {
    	headers.append('X-Powell-Phone', configId.toString());
    	headers.append('Accept', "application/json");
	}

	dataToJson(res: Response): any {
		return res.json();
	}

	get(configId: number): Observable<Response> {
	    let headers = new Headers();
	    this.createRefererHeader(headers, configId);

	    let url = this.CDNRootUrl + '/api/Manager/GetConfigAppPhone/' + configId;
	    return this.http.get(url, { headers: headers }).map(res => res.json());
	}

	getNotifications(configId: number): Observable<any> {
		let headers = new Headers();
	    this.createRefererHeader(headers, configId);

	    let url = this.CDNRootUrl + '/app-mobile/notification/' + configId;
	    return this.http.get(url, { headers: headers }).map(res => res.json());
	}
}