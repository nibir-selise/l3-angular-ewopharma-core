import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { filter, isEmpty } from 'lodash';

import { deleteFeatures } from './feature.value';
import { FeatureProvider } from '@ecap3/core';
import { UserInfoService } from '@ecap3/core';
// import { TokenProvider } from './token.provider';

@Injectable({
	providedIn: 'root',
})
export class FeatureCanActivate implements CanActivate {
	private platformIdValue: string;

	constructor(
		@Inject(PLATFORM_ID) platformId: string,
		private userInfoService: UserInfoService,
		private router: Router,
		private featureProvider: FeatureProvider
	) // private tokenProvider: TokenProvider
	{
		this.platformIdValue = platformId;
	}

	public canActivate(route: ActivatedRouteSnapshot): Promise<boolean> | boolean {
		// if (this.platformIdValue === 'browser') {
		//     const expectedCookie = this._cookieService.getCookie("REFRESH_TOKEN");
		//     if (!expectedCookie) {
		//         return this.tokenProvider.getAnnonymousToken().then((response: any) => {
		//             let currentDate = new Date();
		//             let expiryDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1)).toUTCString();
		//             document.cookie = `REFRESH_TOKEN=${response.refresh_token}; path=/;expires=${expiryDate}`;
		//             this.userInfoService.setLoggedInUser();
		//             this.userInfoService.setTenantInfo();
		//             return this.getAuthorizedRouter(route);
		//         });
		//     }
		//     else {
		//         return this.getAuthorizedRouter(route);
		//     }
		// }
		// else {
		//     if (process.env.ACCESS_TOKEN === 'undefined' || process.env.REFRESH_TOKEN === 'undefined') {
		//         return this.tokenProvider.getAnnonymousToken().then((response: any) => {
		//             process.env.REFRESH_TOKEN = response.refresh_token;
		//             process.env.ACCESS_TOKEN = response.access_token;
		//             this.tokenProvider.setAccessToken(response.access_token);
		//             this.tokenProvider.setRefreshToken(response.refresh_token);
		//             this.userInfoService.setLoggedInUser();
		//             this.userInfoService.setTenantInfo();
		//             return this.getAuthorizedRouter(route);
		//         });
		//     }
		//     else {
		//         return this.getAuthorizedRouter(route);
		//     }
		// }
		return this.getAuthorizedRouter(route);
	}

	private checkAuthorizedRoute(route: any, features: any, currentUser: any) {
		const canActivatedFeature = features
			.map((feature) => (feature.Features.includes(route.data.requiredFeature) ? feature : null))
			.filter((feat) => feat);

		let canActivate = canActivatedFeature.length > 0;

		if (currentUser && currentUser.IsSuccess && route.data.isPublic) {
			canActivate = false;
		}

		if (canActivate) {
			return true;
		} else {
			let tempRedirection: any;
			const redirectUrl = route._routerState.url;
			let authFailRedirection: any;

			if (currentUser && currentUser.Roles && currentUser.Roles.length) {
				authFailRedirection = route.data.authFailRedirection.find((x: any) => currentUser.Roles.indexOf(x['role']) > -1);
			}

			if (currentUser && currentUser.IsSuccess && authFailRedirection) {
				tempRedirection = authFailRedirection.loggedInredirectTo;
				this.routeRedirection(tempRedirection, null, authFailRedirection.loggedInRedirectToExternal);
			} else if (currentUser && !currentUser.IsSuccess) {
				tempRedirection = route.data.authFailRedirection[0].loggedOutredirectTo;
				this.routeRedirection(
					tempRedirection,
					redirectUrl,
					route.data.authFailRedirection[0].loggedOutRedirectToExternal
				);
			}

			return false;
		}
	}

	getAuthorizedRouter(route: any) {
		return new Promise<boolean>((resolve) => {
			this.featureProvider.getFeatures().then((features) => {
				const userInfo = this.userInfoService.userInfo;
				if (!isEmpty(userInfo)) {
					const result = this.checkAuthorizedRoute(route, features, userInfo);
					resolve(result);
				} else {
					this.userInfoService.currentUser.subscribe((currentUser: any) => {
						if (currentUser !== 'DEFAULT_MESSAGE' && !currentUser.PersonId) {
							const result = this.checkAuthorizedRoute(route, features, currentUser);
							resolve(result);
						}
					});
				}
			});
		});
	}

	public getAuthorizedRouter_Old(route) {
		return this.featureProvider.getFeatures().then((features) => {
			let currentUser = this.userInfoService.getUserInfo();
			let canActivatedFeature = filter(features, (feature) => {
				const tempObj: any = feature;
				return tempObj.Name === route.data.requiredFeature;
			});
			let canActivate = canActivatedFeature.length > 0 ? true : false;
			if (currentUser && currentUser.IsSuccess && route.data.isPublic) {
				canActivate = false;
			}
			if (canActivate) {
				return true;
			} else {
				let tempRedirection;
				let goRedirection = route._routerState.url;

				route.data.authFailRedirection.forEach((value, index) => {
					if (
						currentUser &&
						currentUser.IsSuccess &&
						currentUser.Roles &&
						currentUser.Roles.length &&
						currentUser.Roles.indexOf(value.role) > -1
					) {
						tempRedirection = value.loggedInredirectTo;
						this.routeRedirection(tempRedirection, null);
					} else if (currentUser && !currentUser.IsSuccess) {
						tempRedirection = value.loggedOutredirectTo;
						this.routeRedirection(tempRedirection, goRedirection);
					}
				});

				return false;
			}
		});
	}

	public routeRedirection(tempRedirection, go, isExternalUrl = false) {
		if (isExternalUrl) {
			window.location = tempRedirection;
		} else {
			this.router.navigate([tempRedirection], {
				queryParams: {
					go: go,
				},
				queryParamsHandling: 'merge',
				// preserve the existing query params in the route
				replaceUrl: true,
			});
		}
	}

	public resetFeatures() {
		deleteFeatures();
	}
}
