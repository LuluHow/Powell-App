import { Component, Renderer, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, private browserTab: BrowserTab, elementRef: ElementRef,
  renderer: Renderer, private storage: Storage, private service: PowellServices, private sanitized: DomSanitizer) {
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

  	_this.service.get(1081).subscribe(config => { 
  				_this.config = config;

  				_this.htmlString = _this.sanitized.bypassSecurityTrustHtml(`<div>



<meta name="viewport" content="width=device-width,initial-scale=1"> 
<meta charset="UTF-8">
<title>Document</title>
<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">	   
<style>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
margin: 0;
padding: 0;
border: 0;
font-size: 100%;
font: inherit;
vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
display: block;
}
body {
line-height: 1;
}
ol, ul {
list-style: none;
}
blockquote, q {
quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
content: "";
content: none;
}
table {
border-collapse: collapse;
border-spacing: 0;
}

@-webkit-keyframes zoomIn {
0% {
-webkit-transform: scale3d(1,1,1);
transform: scale3d(1.3,1.3,1.3)
}

50% {
opacity: 1
}
}

@keyframes zoomIn {
0% {
-webkit-transform: scale3d(1,1,1);
transform: scale3d(1.3,1.3,1.3)
}

50% {
opacity: 1
}
}

@media screen and (max-width: 360px) {
.app_menu_container {
font-size: 11px;
line-height: 14px;
}
.app_menu_container .link-title {
height: 28px; 
overflow: hidden;
}
.app_menu_container.line .link-title {
height: auto;
}
.app_menu_container.line .link-title {
font-size: 13px;
}
.app_menu_container .menu-item {
width: 33.3%;
}
}

@media screen and (min-width: 361px) and (max-width: 500px) {
.app_menu_container {
font-size: 11px;
line-height: 16px;
}
.app_menu_container .link-title {
height: 32px; 
overflow: hidden;
}
.app_menu_container.line .link-title {
height: auto;
}
.app_menu_container.line .link-title {
font-size: 13px;
}
.app_menu_container .menu-item {
width: 25%;
}
}

@media screen and (min-width: 501px) and (max-width: 720px) {
.app_menu_container {
font-size: 13px;
line-height: 16px;
}
.app_menu_container .link-title {
height: 32px; 
overflow: hidden;
}
.app_menu_container.line .link-title {
height: auto;
}
.app_menu_container.line .link-title {
font-size: 16px;
line-height: 19px;
}
.app_menu_container .menu-item {
width: 20%;
}
}

@media screen and (min-width: 721px) and (max-width: 1280px) {
.app_menu_container {
font-size: 16px;
line-height: 19px;
}
.app_menu_container .link-title {
height: 38px; 
overflow: hidden;
}
.app_menu_container.line .link-title {
height: auto;
}
.app_menu_container.line .link-title {
font-size: 18px;
line-height: 21px;
}
.app_menu_container .menu-item {
width: 20%;
}
}

@media screen and (min-width: 1281px) {
.app_menu_container {
font-size: 16px;
line-height: 19px;
}
.app_menu_container .link-title {
height: 38px; 
overflow: hidden;
}
.app_menu_container.line .link-title {
height: auto;
}
.app_menu_container.line .link-title {
font-size: 18px;
line-height: 21px;
}
.app_menu_container .menu-item {
width: 16.6%;
}
}

.app_menu_container {
font-family: "Open Sans", sans-serif;
	
background: url('https://r7-cdn.powell-365.com//app-mobile/1/bg-app-mobile.png') no-repeat; background-size: cover; background-position: center;

height: 100vh;
padding: 10vh 10vw;
overflow: auto;
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;
display: flex;
-webkit-flex-direction: row;
-moz-flex-direction: row;
-ms-flex-direction: row;
-o-flex-direction: row;
flex-direction: row;
-webkit-flex-wrap: wrap;
-moz-flex-wrap: wrap;
-ms-flex-wrap: wrap;
-o-flex-wrap: wrap;
flex-wrap: wrap;
justify-content: center;
-ms-align-items: center;
align-items: center;
}

.app_menu_container .menu-item {
float: left;
display: block;
padding: 1.5vh 2vw;
margin-bottom: 1vh;
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;
}

.app_menu_container .menu-link {
display: block;
text-decoration: none;
user-select: none;
}

.app_menu_container .link-text {
display: block;
margin-top: 1vh;
text-align: center;
color: #FFF;
text-shadow: 1px 1px 2px #000;
}

.app_menu_container .link-description {
display: none;
}

.app_menu_container .link-image {
display: block;
max-width: 100%;
}

.app_menu_container .menu-link:focus .link-image {
-webkit-animation-name: zoomIn;
animation-name: zoomIn
-webkit-animation-duration: 0.4s;
animation-duration: 0.4s;
-webkit-animation-fill-mode: both;
animation-fill-mode: both;
outline: 0 none;
}

.app_menu_container .menu-link:focus {
outline: none;
}

.app_menu_container.line {
display: block;
padding: 1vh 0;
}

.app_menu_container.line .menu-item {
width: 100%!important;
}

.app_menu_container.line .menu-link {
display: flex;
-webkit-flex-direction: row;
-moz-flex-direction: row;
-ms-flex-direction: row;
-o-flex-direction: row;
flex-direction: row;
-webkit-flex-wrap: wrap;
-moz-flex-wrap: wrap;
-ms-flex-wrap: wrap;
-o-flex-wrap: wrap;
flex-wrap: wrap;
justify-content: stretch;
-ms-align-items: center;
align-items: center;
}

.app_menu_container.line .link-text {
flex: 1 0 0;
margin-left: 5vw;
margin-top: 0;
text-align:  left;
}

.app_menu_container.line .link-title {
height: 
} 

.app_menu_container.line .menu-link .link-image {
width: 20vw;
}

.app_menu_container .link-title {
display: block;
}

.app_menu_container.line .link-description {
display: block;
}

.app_menu_container.line .link-title {
font-weight: 800;
margin-bottom: 1vh;
}
</style>                 


<ul class="app_menu_container line">

		<li class="menu-item">
			<a href="javascript:void(0)" to="https://expertime365.sharepoint.com/sites/retail-portal-v2/Pages/default.aspx" class="menu-link" style="transition: none;">
				<img src="data:image/png;base64,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" alt="" class="link-image">
				<span class="link-text">
					<span class="link-title">Home</span>
					<span class="link-description">Your home portal !</span>
				</span>
			</a>
		</li>
		

		<li class="menu-item">
			<a href="javascript:void(0)" to="https://expertime365.sharepoint.com/sites/retail-portal-v2/news/Pages/default.aspx" class="menu-link">
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAABkCAYAAACSPo4tAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAEZ0FNQQAAsY8L/GEFAAAACXBIWXMAAAsPAAALDwGS+QOlAAAAGXRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjE2RGmv9QAAAAd0SU1FB+ECEhICMJpRi8MAACIISURBVHhe7Z0JnI/V/sd/6baQtYWkW//u1m253ZR0lW5Fm0Sp/pWUbv0VpbIkRYqEKDEia5YiUjIaskSD7LuIGTMGM8yYMWMWM2RL/8/78XznHj8zsvx+g3Rer+/8nuec85zzPd/P+S7nPMsETqB0mqiY6HT/l3NLZ86aNavcsmXLKi1atOjPK1euvGLFihXXxMXFVV6yZEkVowULFlxLfmxs7N/1+6eYmJiLdE1ZXX/G/ma8dKh+TtmEEFzBmHCKZWRklEbgqampNdPT0x/Py8t7dceOHT1/+umnUbt27fp279698/fs2bNaFLd79+4k0SZ+ORetUvk81Zui+p9t3769e05OTsstW7Y8tnHjxhrr1q27/Jdffimpfgrq23g6JVIwAH8QMWvPYhYnJSXds23btjY7d+78REKdKVov2iHh7vIFvlTCnZabmxupesOzs7OHZmZm9s/Kyuqn3wGcK3+Eysepje9Uf7koRdfvph1RgkCarrIhqtc6LS3troiIiAr07/MBP795YAwAF4Tiffv2LZ+cnHw3s14Cm4OwRDkSYIYENmPr1q29NZNfkvmpFx0dXXP06NHVevXqVblz585XPvHEE39p2LDhn1944YVLocaNG/8P5/Xr1/9rx44dr6LeqFGjbpo6deodCxcufGj9+vXNBVpftTtH7W9VP9mitep3lgDuhtZ89tln54uvs33+DBQD5qRPwSAUS0hIKDNnzpyrZTqaSxizRVsknM2iVZrZg6Uh/xk+fPgN3bt3/zsC1jUVRRf4xCyGLnSIciM33+ratRc1atToMtodPHjwjWvWrHlW4AxXv7H0Lz7SpDXR4uF5TOS+fftK6Zp8vn06KUGBaQPCGwyDExC3aBZ21cDXidCA5Rr8EA3+SYSkeheLLhIVJmQTMFT+EOTWs2uD26Ofi9EiTYBnfGBWiq9c0Wr5qfbSpmqqc47IBeWkAsRAMH9wdmJiYnUN7gMNcq3oJwEyXQNtExkZeYvKEQpCCxaWCZxZjfk4z6dzfSp3CLI6dg3X044BVRA4lSZMmHD7pk2b3sKUic+dohjx2kVaVFXl5ldOClBcTQCIs2bMmPFXOdMOsss/amAa1/bp8fHxTaUF16vcZm4wAAjNhI5gCU3LiEr7hPmAiIgKI6tj13A97RhQtE8/wcB4PGHGpMUtBMo8+Bb/ywksNHkwm2eKgh39CZVcbfjD5MmTz9UMe0SDmKvBZCnEXCRT8Fy7du3+oXIbdEEAmPBN6AgWM1FCVNwnHCzETC2MrI5dw/W0Y0DRPv0UBgzHF/Xp0+fatWvXNpP5IozOwadoXHX8tYs3VtEJAwhMQKYNZ7DgkknqBQiitSkpKZ3btGlzjcpcX8AvJgPzgUAMAFf4JnBmIubBDT1dQhhGwWUeTz7RjgFl4AQDAz/w5fJZCU3R2qe/QNmkMaVL27sqSvubyownA+S4gULHMGEDLqEw9C4WZWJY/OZGykzVVX4lEQMLBgEtwHwgEATDDHaFb4J3BxpMBaWC6kEGlvFr4NCvAQM/8BUMSkXC56VLlz4uUztJ49uucU6WL7xTZQAbDEqRJhscDJxJfK5F14ticg2zR2uHDr5Jcs1RMAhogWlAQXY4XIMy3l1w6N80Br5cUGwMUAXWL6mpqV01zi0ab6zWQs+xVaMyG0ORAWJCygdi/vz5F8ssRYixrfINmjxLH1c+IaoNgt9gEEwLjreaB48HfkxbXFDMp3gTCy1ZsWLFM74vwWx1eu+995hwRQZIMONnRkVF/Z39H9RW0cY3WvHepnyYgmCeQWCLXRBgmEG7WnAiJBsbfBkopin4FBz9AaZr/Pjxd8tsfafx5+7YsWOQLMSflF8kJssY9YCYNm3aNQIiEiC0mh7ZrVu3KsrPV2cR2sAgsMUMyjThRAMhOBUGCo7+INM1cODAf2n8owFE8hhRiGMPaTIGPebkmP+hmTBeDGxTlDHACVnNNzCL0AYco+sTTmQQgpON2Zt8IsZhpsu0xAOEaFG+Y4gPyOc+IGEZs8vUWZMmTbpcQEQBRFpaWsSDDz7INoaZJswSs4dZZNrAdcyykwUEN8HzAeMXmZZgfhmvN3a2VTQxB/qAjPQXiDb+kADiMnLmhAkTLlVHnkqq448effRRZkAwEJgl8w0nukk63GRyYDyMi/ExTnPu+YBkZWUNk3zy5EsGtW/fnrUV9bEoxySHA4Bg319OugcaIZUc6muEmSbzD6gx6my+gTZOdiAs2VjMl5jZYtwGSMXXXnvtn/IhXyIn/XYeO3YsJu2YTBYX5AMhKiNNYMt7q8K4CcTaygsGwvyDC8RvMRUGCHLwAMGpE2Up9N28ZcuWRspDi1xAjii5QJSIi4urIyDWy0Qt/vrrr2soz1NLkQvEye4fjiQFA8L4XUAunDJlSi2BwQZpTGxsLDJzTfdhy+eAjkaPHn2lf3csaeHChU8oz4BANU9FICyZnBg343dNlhf6/vjjj89Jbty0mjxo0KC/KM8sx2GZKyqYVpw9ePDgC2SW+grdnOTk5HeUZytrAwIGTkUgLBkgrsnKd+rcqVTE2VPyy8vOzu7ql7kR1iGTNc4FxZOSkhoI2S0CZLy/lkAjiK9plI5PBR/xa6kwQJBTBRbD3MeRHJMTExPZOKXOr5qrAxplYSfzNBPzFB0dXVt5AIFWEF8TZ2MDT3UgLLmyQy62DkFeFWTeH5WpSpU8J/Xr1++vyvvVSWzmCa0orfC1A+q1adOmzjo380SYZgu634E4MBkgXtAjYqWOQ0dulyqq6o25T09Pf0Xnrp89yFy5DZ0tJG/VhasVPc3v0aPHdcqjQTdyOuKo4BRJrhwtwvIcev/+/atJO1ZJposk3xuUBxgHyZED0PHME05bzqY7WrF69eqmymM9QYOunzgsB3SMCb6KmkKRzMIgJ9YXmCv8R6V169a9JrnuyMzMfFPnBTpzmAAdCkrMmjWruvzERq22J7KaVB5AmHkyP8HFoWLeEu2Fo90jTfRvdDTJxoGczFwhvwuGDRtWNS8v73sBskZ+mIcyDlp72IUUnItWCIyMNWvWvKhzELUwNpzmyQYA0Qd9XiYiNv9zEdGlImarjQ9ejjZxPe2YuaJdz1yhHZJvTkZGRns/353g/71o8uTJ/xRq64XeTP8hAtMK1C2c5ok24SPAXbS9e/eu+Pnnn3/R706HfgoDeW1rzD9JQL8oDYMHP8HT0Y7VwHTNlacdPNwgv7FQfcb07t2bjVZ3kudrRSmh9YaYSt+wYUM7nRekFXQQaq0gGeMBnqGVgJIVfYxTGNhQDD/30UcfNYHkBJu+//77T7/66qv3NmvWrO6RUPPmzevwq4Ck0YABA16gPbXfOCIi4v+GDx/eSH0maAJMgAc/mYYcbQrWjnxnvnnz5vexPopU8cmuH/Yql2BGKg6eoUrxbHQpDzBwPq5WhAMIl+nAww8/fLkEkyHfhZm05M7Sv3Xs2PH9N954o5MWou9Kg7v8GlGvbdu2neUDX9f1CIREn9ZmgHs0AiNah6b9+bP1GJJNMlc7yrO/Jzknqs9vOnXqRICEb/HGT8Xi8fHx/6sKSWyP65zHa4paK+Aj8MADD1whMNIFBtpJ3yw2uS8AT6dXr179CeyJeN2kwazULw8uH5JUb4V+07mucuXKNdUOs5H2IM98aCJOExjf6Zixwo9FOseSCtOOS+SbuWW9duXKlXfrHDC88XNQSuFWDzGcJyE8onMEUBS+gkS7ZioDdevWvdIBA97QUAOk2F133fUcQm3RokXjqlWr3nLPPffUufvuu+vy6xJ5lq/rqsocdeW6a6+99g6dA4Z3y1SE9p/PlrcPBuOFn1CAQbLJxviISJHrhWwiCowcTf63dQ5QjDVQgp1ZMTONRYm/BwV6eHrTCtANh1aQDAyPmdq1a18NGNOnTy8IjD+ovCFCVR2cb64o7zCIenuCwLAnHD0wpBkGBkJjzAbKsY7btANw6deLrHjeWJM/CfMo+RM5euMv/sMPP9RVwSY58AH+OxGgF7yuCFeibVPj02rVqvUPCS7j22+/bUWhEoOAD8rh5coGDRq8+tBDD7WqX7/+69Bjjz3WBrLzAug16ssfNdb1fxQhaAYPeWZEk3GSwJju51mfoQCD5E44b93Biz1ZWVmjpB1r5s6dywShv0DplJSUVySAn1EdnbuO21Q1XFpBKgiMjVLfJbNnz+4p6iNm+0Lz588fOGnSpA8VCXVQJNRZv+/qt2tBRJlR3759uygS66TApOO0adM+mjdvXn9rU+bww0WLFvVRn1kioin4AKxQgkEbyJF2kSvyrbB27dqX1eeuxMTEJjo/J/Dyyy9fotX2UJmozRMnTrzLrxjsuMOZCgIjYd++fb/k5ORsSktLS9QkiV2txK8c3hodxq1YscIjzletWpWgUHiz/F6qFlWJfl68kVuXNiDlr46JiVmrazbRDyZM1mGsz0eowSC540S+5/p3AzOkIRHeE4njxo2rzOaV1HQqj8BTSYQqoVKhZKawdAAYcrjXCIwMTYy3dI6NvQSAatasWblGjRrX3XLLLVWrVat2E877hhtu+Pf1119/G+eqxyL1KtG1VapUudUl6lH/5ptv/tett95a5c4777yWtlSXlTcmuYIWuvgMQlv4CLWZIjFO11SV43U59TsHfz1y5MirAry4KLuVzRavKhDq4WAsigqn47bkgkG09E/AmDBhQkednyFbX1OTdrEoW/mYkq2iTJ84z5MTHIeAVf+ypUuXYnJYXVsdl+xafvdJ+JG65hLR+dKO6T4YNvZQg0E7Zqrwx+V4x5ClBP5a5rJ6QCrfUGDslnq/SgWfmJHMDsAIdzoUGMXuuOOOBzEhM2fOjBo6dOhbo0aN6q5Z9MGwYcO667ibBhOj+rFojur/8UklLap6UM8lruFXkct7X331VbfJkyf3at++/QtcI6rog4EDt7GHGgxScFR13saNG3mza4/M6AOB9PT0LtyFWr58eUMVYssgM1EIKtypQDPlg3G61gr3A4bMy2M6JxFgsD7gt4yc70eqn4Ap0zk3weDfZiHtMnhmI8S5q+3kEeJeInMRHWYzRXLHCp9l5LeaSDNyCKICmhGjdBI7Y8aMe/0KFtKGO4qydFhg6NeeP2Inl1uXPPFdadmyZR+r/lr/obryN910UzW0CZK2PCTf8L8ukSeTVo/j66677nZdAxgVHTDCEdpaoi3aNL9RVhHiw5L/Bp7QDMh5zxEt4IV3CkXHE4xAEBiAUwcw9PuMzuGLdRCEeSmvqGig6sc//fTTgFNamh5B/cNJEv5EXcPCr6ycKGC4i75wgYFcaRs5l8Fns12Tm5sbFWB/RIx8x1cHVAgYtr4oCn9BMjCYLQFb9Gk90YHze++9tzaC08r7KZ3Ck+0pIcRy8nn9VT8OZ6jzMjfeeGN1Vul16tR54r777nuSY671qSF5lGmR+Mz999/PvhC3k89zVuBmzsIFBmOgD+RcVr6sipRhLgoBGJk8ssmuLYUic2AIKdzJmKM/TzMMDK3AufnC9si9gIF54VwJIQEcAiMAiXA0A6dIW4ebmKVcU6GIwCDZeJFz2a5du16BMqAUAQYqv/GlCoIfOAgnGIW2zQyXcNOmTp3KBlqAzT54/O6774YqLn9K5vRlSJHRi2PGjHlei7YFqr+a7QVVL12vXr07R4wY0UrUQvVbfvzxx6208n4V4njIkCEtKdP66vUmTZoAMOM+twjBYOz5YLD9xFtfLP4MjFEU+GRghJoJEm1CMFSGexc4Xs3+qwlpecUgIiICTciOiopi0Xeayu+QsNfDp35/Fu1xaC/5EuKU1q1bE0mVkM/o4dd16+32KT/Pv268rgGMc5wt9KIAg/aRc5m2bdtWkmX6WpqR64Gh5finFPhkYW2omTAQPF+0YcOG2hLKZlGOyHZWt4m2w1NkZGRzVYOfvwm0GtDjjz/+7/r169/qEovCZ5999kbVI9w93/+yjlcmcG+za6nHL3mUcSzfwYqdPti1LSowaC8fDFF5gfGVwNjjgZGdnf2JXxBuMAACOx1gUxLB6/cdObFnv/jii+aDBg16XubobeXvGj9+fFtVY9YSNaHS8MQgUHEEBnFMHjyz7uD5LqIU+iCfOpRxPYQATNjwwjl9lC9CM0V7tHsAGBrzfjBks0b6BeEEA60wIZ02b948dixT/LefSEQX+Xf6FE3hM9gnK920adN6Wml/Kmc9ROB9/MMPP3jEsU+DtHgaGBsbO4BQl3NIdQZDWtAOMbL6CQkJI7///vsWap+9KULbogYDOTNxKgqMcVKMPA8MnXyhzHBvEAIG7TLY0+fMmQMYqb6JoV/2iMrJoVVVfsaUKVMIbck/XWF3U+VtEsWLvO2PILI8fgsit55RivzLYLXPjbSSu3btKkozlQ9Gy5Yt/6iJMF4OPDPAUlxgROFIKPQrhYMJzAKD9NqfNWtWcwkkTdETDz8YGGWlBVWUn67QFgeOtrBCPo8tZsJvog/8ghHRF3mUcTvA6pBvZHUJfymzerQrYszcAz8emlGKx3UExlRpxjrA2MBJv/1PRzP4cIKBjcdWnjlz5kwPDF8zEAiToVSNGjWuA4xp06bZFjqLO2+BJ0J7mcmc2z1sjvEV5EMcW54du3XxLdQDCDvGZxwPB16K2xbqe7YWfUvZDlmgk7lyoDxuWGRgTJ8+vQVgYJZ0jtDRgJLsviqfR3XsHnixDh06NFDeMvG6BH537NixUH5uIb9Gyl+sOvP69u3LOxAlGzRocIvM0OjU1NQlKl9k9VXPq6v8+fIbEaqLhpQ+XmAoYPm3+OJ7VpPYKPxK2rFKg+cLMRZxULkowEh9/vnneSKbPGZtCX8L3Z4OQTDFZGoekYP+PlpJzE+V1hyUKJs7d+6Ut99+m3dJTm/Xrl1dtZMrocdoATnFrzZNx9PU9zcZGRmE1QmqSwBRXNbheKwzSi5duvR+TJQmzqBAWlraBwIjWVHIo34FA4OLQpkOAEPCbiZhpOEjdI4AMBdn+dshLhiYGi/S8pO1QxnEMUIjH569RRxPD6qdvE6dOtXSOcnqUzfQv39/QuhtOgSMkkUYTcEjPHsTX9rJB2Eyk5KS2hHvNxYyOxMTE5tR6FeiclGAkSpninkkHyGewWo8CAxAMh+A3Wfdwa4tG4MQxzh/fA6mjpV4Phjvvvsu92low+pjls4YMWIEn2/N0jFb76UERlHs2pJMDsi51JYtW9qKjz1Llix5LKBB1yLGldq+r0KcGpUQAheFMh0RGLNnz35D5/ARUKTXBMEppWmBmlwQqYzPsSZJyGh4QCHjfbom74MPPuCTS2zzABJAAthpo0aN6kGbOgaM0kUEBm0hB8ZVkkc7xXc/hdVbvFe6ea5WDmSFmBnfs2fPy6kkghEWaKFk5GjAIP9MhaE1169fP0A+AeqrNUo/lyxv8eLFvd98803uyxR75ZVX2G7JU5RYX+eYOYuq0LDAl19++QGbDzr0wHBuLoUbDORK2yU//fTTqzGPCihme2+IAYCc+OeEuDNmzODTpggrHIwcrWYgPGY2vNhgyCfSgk+uJY/2IUxSCdMMje9BP5+1DOT5n6FDh3ZVeY4OryC/CMGgTXgvOW/evNvw17JKA1kPUaG8nMdbYmyvnDgv3bsLv1D6jSMCQ+XmM85lsfbhhx/W6NKlyz0dO3a8l4ipffv290Ec46QhnfNkHj7kbD+a2g6obdq0uVn1akLvvPNODd7IWr58+Wcqz1BdbqoVFRjIk7aRQRmct1zEbv221DkuIlAW5yGEtmzdurWn/6F2KiMgBBiqdAAYElJLCSOlVatWPGLDwL1oyn/wOXX+/Pks+jyfodU3C0Qev8mgrBBK51fmhzuCgdatW9fSOfV5JpeP0xPKGiWL9omWqyqaUVrWYarM1gwde/yJwgFGvgz44o583SAskjSEtRHaHyjnv2vm3Qv3P6tgTjyUfsMFg+2QxhJGpq8ZzBjseTE2CrHlWhK8pnN48BaCWl88O3bs2CZanDaW833eJfIoi4yMbIRm6ZpyDz/88OVRUVGPKo8yrn12zJgxz/FLfWjw4MH1VBenzs2ledKMb3QMAPBJ36EEg3bMxJbkc+PSilj5jG/9h83ZYfC2GC7koWcV5soZ3qNzbCszI1xgnP7UU0/dzCblxIkTec88P0lArcnnKQ8/i1nqmkuOTWCUceyWc86AKYN3I+q4ZPV4QacGfX7++edElCSbjKEGg/ZwAWViY2MfQd6s83SOiQYH7895K1eubKQQK0WmqpefZ+rqDvRYEu3QHszQ9tmrV6/uhRCmTJkyRL7gGc1ingbkbl6sQGnerVu3JooyXoJ69+7dDJIZbaFw9RUjOeiW5EGU9+nT52Ujyy+IuFazsxkPRas/bmrF8wqb+EJgHn+iUJppGz9tn79t27ZPZKISFQHyPgz+wtMMbNX5qApmShVWcpNcee56IxSzw2YjGkeQQNslFi5cSFSzC1BICrP35ebmbtXE4O4ft0rtBcujoV0OFXa+TxMwunnz5jx7i7YhFCYMggsVGMgv30SxDyitiJeJml6/fn02aAEDa+QJhhNe/OO14zRFV7z4RwhoTiwU2kEb+QyJGDS/9I+dZyudrREcOvtVmCl2dNlI5NyIc/JdCq7j1nXr00cw8Viot0kpwlzAjzvuUE9Eb9UtOad7WyD7d46Rvxdym2DKyxnehqnS7JzITQ/luTPkWJnievMbtMugMYdEUTDDr2152OLMtrghBAVxTL5LbjltGdm1BV1j5NbDSpiJCtUktHF7Jpr7FwoWeJF1A0+hK49+bWLudyii8xXZXCKVHQYgcXFxrDkog7FQOXLTjoIAYYXMDLWH1DiGAIayYDLQ3DwAdMktgwqqT9/wABAIBN4AIpTm2SzCORs3bmyMVkg7PtQ5E54JhPyRh1cJFYGh8nxMXpUzFOqO8u+GoVqh1A5jjjZpGwEgCGYHs9Sd4fAEUQZRz+oGk5UVRgVdgxCYEPCARrhAhForinMDT1aHW6zJU6dOZYGKZjI++gcHryKMwLD3qAvaoQsy16xZw5PfxiQCDAWDtAGDLiD0AUNMCoQDcWxEWaiJPiFmJDwEAxFqrSi1YcOGRoSzqampvfyJzqRD7vCALPIdCwLw7Ke0o57A4E3Mb7Qg5Em9UGoHCSaNUfqnbYQB0xD92bER5aEm+oXgwSZbqIBwtaIE343n9qrkGss31JUHEGgFcmd88OBdAGPMElT3AlDjTSahuF0R1kvKswtgOBSMngrJ1YqyWlS3kzz5mNq7OscnugGDTXTvooO0Y8SIEbdLM5argdValRMemiqFSjt+y8m0gkleYtmyZbdLjnyKdq7/KRCAQM7IG7mbVh5woWkHjuXCdevWtcJ3aLU4zP/GhalTqFT5t5hMnsjp7AkTJlyqST1Gcsz4cf+r3RbBBWtFvjxNpVztKM/TftnZ2WNpyDdXOD5A+91cFZ5MlsipdGZm5uvSiiyCIv+1BcDAVxCYHKAVlgxNUAItUAO9CiwEBUaMGlyltQdPkKAdv5urgpMrx+IxMTF1JbcEmaclvnkCCHddUagcDVGEDWqgh7mqxEMLaIeigUmjR4/mZoyZq98B+W8yIDzzNGfOnMqSF5+iTV68eHED5WHmkSduAAuDDAu1MGQCCGiBGuhhriqgXnywSijnbt++fTA3RpT/OyD/TQcAoQl7GYtmAZGdlJTU3l9T2NaLOW3qIu9CZWfaEWyuyguAq2X/Phcg27KysuxfEZj/OMDmnWLJBeIsAp2cnJw+klOe/MRQbnIpHyBsgVeg0y4oURhsriy68v7NphCfoY4yFTe38f+TIw2fqoC48vL+RZ4mahfJh4fJJ/if/8BPFGSeuO6QYJCsA5B2oysarcj6Qw5pvlSQe+atZu3/H3XUPewOfiPpICAUebYXEFncp+Cjwso3P+FGT79qnoITFVGjg/yHqOLUqVPvESALBUi6GHhTGoMpo+4Rd3SSJpOPZ5r4J/MyTe9gMbAcRKDKBwjkhdx+NXo6VKKyoW6LQUwSds/biubzPKwoUUktCrv773dQFwaPuMOTKB0AhCYmn7rg3x9lSyOisRzKt+15C2ORH7LhuqOarMGAYO/MoXuAREZG1vR9CF+2GTh37lzuIZtT/y0CYkB4Mlm6dOmVmpCfaPy5PNL/ySefVFe+e58EebkL5WOyGgYIswDHcxAgOHWZKr5Embtr167xsbGxNyvfDXuPiYETJJkcECjjKr5hw4aaGm+0xk10+VnQ/6EKORCWaMTUskBA2rRpcw13rvAhe/fuXZ6WlvYfP/SFiZAxchwSPEM2/jPwD+np6U0EQqzASE1JSenGs14qKwgId1KGbPy/BsiF3JSKi4vjH5nzn4/TZb4+lBrzYXtmhjF0MoECn/DLZMLx8mFNHhIfJCAy9buCjT/eEVQZMjAfURAQtBPSVBggMAAjMHQxjp0YWwznieajJU60xcBcUE40YIwnGyv8nqX1VCWZolbS+pUaU64ipy/9/8pG0FLkQFgqCBA37PW0hP/kmJiY+IYYj2cWSZ3HYGNRcZUbIC4oJ0JyQfDGyBu2CQkJ94l/3kbdJo1fzUPKQf9ClTFZ+Io83AAmbEBYMoa9WSOydYhtLMIg9rPS5MmT79SMGq7BpGgwWxX6fbx58+b7IvY/XG2DNqZtVhZ1cgHwhBgTE3NRcnJyvZ07dw4X39kCISkzM3Owv35wn1hB4+3WKXIoUiAs2SyiY1sY2taJmS2PYTYZ+eSeTBcvcmZqcJs1yE8FyqP8Y3fVQcsgdxDhAsbaNf4NAI8HbgTJOT+pcJU9uHTxu0UmaSRP6fubfYwJMrPEeBm3Lehoy/gv0uQOyHNwItdsmZZ4qswjoz4oY3yVT0H9FZ+/ocFW8fe5bLuANg0YF5wjGaR7DWRtWdv0U5ztnPXr11eT1r4tfvgXbmmirQJhxKJFi+r7n9NgLKYNwWYJc834jd8j4TGkyQZpgzOzhdqalrgDuRB7KwHUkdrz75rXMftEiRLERJwkgpk5c+YfZeJQfwZqQgwFFSfkZtXMekgT4TXfHyTBh37jeBAjOjr6bh8Em0zwzzhMG1yzZJOH9o8bEJbcmWdmy9UShIptNdNldAkfZ5fwW0hboiSM1QhEEQufPOJF+oEyGU0Vx9datWrVjax2EaIfmWEabDa6if4RUGnqYXYWLFhw1caNG/8lIddWPy/JRA5R+z/42okW/Kgw/Kv4+PgX/V1WnvJz+YRv8w2mDYwv2CwddyDcZIAEawmCwwSh2gaKzTaI44tHjx5967p1616SxvSXyWC2xom2S3C79LteNFezeJzKBguonhJsRwnxTc3u1kY6f0v576g8AqFL0PwTeZ6sT1I7u3VMuB2j8skZGRl9BUBTfwsDpxzMUzAI5htOOG04VArWEkyNCwqDM/PlagvH5Hv/U1umrJaimv8oqmkrgAagPXKsCyTMeDRIvztE3j9KssS5aLvKU/UbJ0Dm6bpxMn/9FGq/rkXaU5gg/00hBE5/xoMBYOYoGATzDcfNSR9tcrXEBYXdSwZn5otBM/sKAoZ8b/3C6p47jTy1HRUVVV3m53b5lbsQrCKy2hDf5eWcfMqZ8dTnOv+pDPqwwCK4L/KsP3yCgQC/Lghh1IZA4P8BG9SxRLE2lToAAAAASUVORK5CYII=" alt="" class="link-image">
				<span class="link-text">
					<span class="link-title">News</span>
					<span class="link-description">News aggregator of your portal</span>
				</span>
			</a>
		</li>
		

		<li class="menu-item">
			<a href="javascript:void(0)" to="https://expertime365.sharepoint.com/sites/retail-portal-v2/Search/Pages/peopleresults.aspx?k=*" class="menu-link">
				<img src="data:image/png;base64,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" alt="" class="link-image">
				<span class="link-text">
					<span class="link-title">People</span>
					<span class="link-description">Access to your people directory</span>
				</span>
			</a>
		</li>
		</ul>


</div>`);
  			},
  			err => {
  				alert('fuck off');
  			});

  	// _this.storage.get('powell_settings').then((data) => {
  	// 	if(data !== null) {
  	// 		data = JSON.parse(data);
  	// 		_this.service.get(data.ConfigId).subscribe(config => { 
  	// 			_this.config = config;

  	// 			_this.htmlString = _this.sanitized.bypassSecurityTrustHtml(_this.config.App.ContentHtml);
  	// 		},
  	// 		err => {
  	// 			alert('fuck off');
  	// 		});
  	// 	} else {
  	// 		_this.navCtrl.setRoot(SettingsPage, {}, { animate: true, direction: 'forward' });
  	// 	}
  	// });

  	return returnValue;
  }

  navigateTo(url: string): void {
  	console.log(url);
  }

}
