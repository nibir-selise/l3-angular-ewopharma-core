import { Observable } from 'rxjs';
import { TransferState } from '@angular/platform-browser';
import { PLATFORM_ID, Injectable, Inject, Injector } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShellDomainProvider } from '@ecap3/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { EcapCookieService } from '@ecap3/core';

@NgModule()
@Injectable()
export class TokenProvider {
	private isPlatformServer: boolean;
	private accessToken: string;
	private refreshToken: string;
	private gettingAccessToken: boolean;
	private isPlatformBrowser: boolean;
	constructor(
		private state: TransferState,
		@Inject(PLATFORM_ID) platformId: string,
		private _cookieService: EcapCookieService,
		private injector: Injector
	) {
		// console.log('=====TokenProvider INITIALIZED=====');
		this.isPlatformServer = isPlatformServer(platformId);
		this.isPlatformBrowser = isPlatformBrowser(platformId);
		if (this.isPlatformServer) {
			// console.log('setting access token and refresh token in provider from process.env');
			this.accessToken = process.env.ACCESS_TOKEN;
			this.refreshToken = process.env.REFRESH_TOKEN;
		} else {
			let currentOrigin = window.location.hostname;
			this.accessToken = this._cookieService.getCookie(currentOrigin);
			this.refreshToken = this._cookieService.getCookie('REFRESH_TOKEN');
		}
	}

	public getAccessToken() {
		return this.accessToken;
	}

	public getRefreshToken() {
		if (this.isPlatformServer) {
			return process.env.REFRESH_TOKEN;
		} else {
			return this._cookieService.getCookie('REFRESH_TOKEN');
			//const expectedCookie = this._cookieService.getCookie("REFRESH_TOKEN");
			//return this.refreshToken || expectedCookie;
		}
	}

	public setAccessToken(token) {
		this.accessToken = token;
	}

	public setAccessTokenToCookie(token) {
		//let currentDate=new Date();
		//let expiryDate=new Date(currentDate.setMonth(currentDate.getMonth()+1)).toUTCString();
		//document.cookie = 'ACCESS_TOKEN=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
		document.cookie = `ACCESS_TOKEN=${token}`;
	}

	public setRefreshToken(token) {
		this.refreshToken = token;
	}

	public setRefreshTokenToCookie(token) {
		if (this.isPlatformBrowser) {
			const currentDate = new Date();
			const expiryDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1)).toUTCString();
			document.cookie = `REFRESH_TOKEN=${token}; path=/;expires=${expiryDate}`;
		}
	}

	public setRefreshTokenForNodeResponse(tokenString) {
		let targetDataStructure;
		if (!process.env.cookiesForResponse) {
			targetDataStructure = [];
		} else {
			targetDataStructure = JSON.parse(process.env.cookiesForResponse);
		}
		targetDataStructure.push(tokenString);
		process.env.cookieArray = JSON.stringify(targetDataStructure);
	}

	public refreshTokenObservable(): Observable<any> {
		const http = this.injector.get(HttpClient);
		const body = new HttpParams()
			.set('grant_type', 'refresh_token')
			.set('client_id', ShellDomainProvider['api'].Client_ID)
			.set('refresh_token', this.getRefreshToken());
		const header = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return http.post(ShellDomainProvider['api'].Token, body.toString(), { headers: header, withCredentials: true }).pipe(
			tap((response: any) => {
				this.set_may_access(response);
				this.gettingAccessToken = false;
			})
		);
	}

	public set_may_access(response: any) {
		const responseObj = {
			may_access: null,
		};

		if (response && response.may_access) {
			responseObj.may_access = this.getFilteredSSODomains(response.may_access);
			if (this.isPlatformBrowser) localStorage.setItem('may_access', responseObj.may_access);
			else process.env.may_access = responseObj.may_access;
		}

		return responseObj;
	}

	private getFilteredSSODomains(may_access: any) {
		const ssoIgnoreDomains = ShellDomainProvider['api']['ssoIgnoreDomains'];

		if (ssoIgnoreDomains && ssoIgnoreDomains.length) {
			let accessDomainList = may_access.split(',');

			accessDomainList = accessDomainList.filter((el: string) => !ssoIgnoreDomains.includes(el));

			return accessDomainList.join(',');
		}

		return may_access;
	}

	public getAnnonymousToken(): Promise<any> {
		const http = this.injector.get(HttpClient);
		const body = new HttpParams().set('grant_type', 'authenticate_site');
		const header = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});

		return http
			.post(ShellDomainProvider['api'].Token, body.toString(), { headers: header, withCredentials: true })
			.toPromise();
	}

	public securityLogout(): Promise<any> {
		let refreshToken = this.refreshToken;
		const http = this.injector.get(HttpClient);
		const header = new HttpHeaders({
			'Content-Type': 'application/json',
		});
		// itsm config
		let userInfo = {
			name: '',
			email: '',
			isLoggedIn: false,
		};
		window['supportITSM'] &&
			window['supportITSM'].emitEvent({
				config: userInfo,
			});
		const body = { RefreshToken: refreshToken };
		return http
			.post(ShellDomainProvider['api'].SecurityIdentity + 'Authentication/logout', body, {
				headers: header,
				withCredentials: true,
			})
			.toPromise();
	}
}
