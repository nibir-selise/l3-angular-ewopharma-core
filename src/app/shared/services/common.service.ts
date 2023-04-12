import { EventEmitter, Injectable } from '@angular/core';
import {
	AggregateService,
	FeatureProvider,
	PagerService,
	PlatformDataService,
	ShellDomainProvider,
	SqlQueryBuilderService,
	StorageDataService,
	UserInfoService,
	UtilityService,
} from '@ecap3/core';
import { BehaviorSubject, forkJoin, Observable, of, Subject, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
// import { GoogleAnalyticsService } from './../../root/service/google-analytics.service';
import { FileSaverService } from 'ngx-filesaver';
import * as JSZip from 'jszip';

declare var gtag: any;

@Injectable({
	providedIn: 'root',
})
export class CommonService {
	header: any = new HttpHeaders({
		'Content-Type': 'application/json',
	});

	private navigationChangeData: string;
	public navigationChange: EventEmitter<any> = new EventEmitter<any>();
	private profileImageSubscription: Subscription;
	public isBackButtonPressed: boolean = false;
	commandIdForAssignmentObserver$ = new Subject();

	public modulesSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
	public dmsStorageAmount: BehaviorSubject<any> = new BehaviorSubject<any>({});
	public modules = this.modulesSubject.asObservable();
	notificationCountEmitter: EventEmitter<any> = new EventEmitter();

	//for google analytics
	private sessionStartTime: any;
	private dimensionMap: any;
	userId: string;

	constructor(
		private sqlQueryBuilderService: SqlQueryBuilderService,
		private platformDataService: PlatformDataService,
		private utilityService: UtilityService,
		private aggregateService: AggregateService,
		private pagerService: PagerService,
		private userInfoService: UserInfoService,
		private http: HttpClient,
		// private googleAnalyticsService: GoogleAnalyticsService,
		private storageDataService: StorageDataService,
		private _FileSaverService: FileSaverService,
		public _featureProvider: FeatureProvider
	) { }

	/* Get all modules */
	getAllModules() {
		return this.http.get(ShellDomainProvider['api'].BusinessService + `v1/feature/modules`, {
			headers: this.header,
			withCredentials: true,
			observe: 'response',
		});
	}

	setNavigationChange(data) {
		this.navigationChangeData = data;
		// this.navigationChange.emit(this.navigationChangeData);
	}
	// navigation related works
	getNavigationChange(): Observable<any> {
		if (this.navigationChangeData) {
			return of(this.navigationChangeData);
		} else {
			return of(null);
		}
	}
	/* Generate new Guid from Core package */
	getNewGuid() {
		return this.utilityService.getNewGuid();
	}

	/* Generate new ISO date from Core package */
	getISODate(data) {
		return this.utilityService.getISODate(data);
	}

	private createFilterFromConnectionObject(conneciton) {
		const filters = [];
		if (conneciton.ParentEntityName) {
			filters.push({
				property: 'ParentEntityName',
				operator: '=',
				value: conneciton.ParentEntityName,
			});
		}
		if (conneciton.ParentEntityID) {
			filters.push({
				property: 'ParentEntityID',
				operator: '=',
				value: conneciton.ParentEntityID,
			});
		}
		if (conneciton.ChildEntityName) {
			filters.push({
				property: 'ChildEntityName',
				operator: '=',
				value: conneciton.ChildEntityName,
			});
		}
		if (conneciton.ChildEntityID) {
			filters.push({
				property: 'ChildEntityID',
				operator: '=',
				value: conneciton.ChildEntityID,
			});
		}
		if (conneciton.Tags && conneciton.Tags.length > 0) {
			filters.push({
				property: 'Tags',
				operator: 'contains',
				value: [conneciton.Tags],
			});
		}
		return filters;
	}

	getAllConnectionByPropertyFilter(conneciton, parentExpend, childExpend) {
		const filters = [];
		if (conneciton.ParentEntityName) {
			filters.push({
				PropertyName: 'ParentEntityName',
				Value: conneciton.ParentEntityName,
			});
		}
		if (conneciton.ParentEntityID) {
			filters.push({
				PropertyName: 'ParentEntityID',
				Value: conneciton.ParentEntityID,
			});
		}
		if (conneciton.ChildEntityName) {
			filters.push({
				PropertyName: 'ChildEntityName',
				Value: conneciton.ChildEntityName,
			});
		}
		if (conneciton.ChildEntityID) {
			filters.push({
				PropertyName: 'ChildEntityID',
				Value: conneciton.ChildEntityID,
			});
		}
		if (conneciton.Tags) {
			filters.push({
				PropertyName: 'Tags',
				Value: conneciton.Tags,
			});
		}
		let payload = {
			EntityName: 'Connection',
			IncludeConnection: true,
			DataFilters: filters,
		};
		if (parentExpend) {
			payload['ExpandParent'] = parentExpend;
		}
		if (childExpend) {
			payload['ExpandChild'] = childExpend;
		}
		return this.platformDataService.getConnections(payload);
	}

	disConnectChildParentRelationship(connectionModel) {
		return this.aggregateService.aggregateDisConnectModel(connectionModel);
	}

	insertAggregatePayload(entity: any, model: any) {
		return this.aggregateService.aggregateInsertModel(this.sqlQueryBuilderService.prepareInsertModel(entity, model));
	}

	aggregateInsertModel(entity, model) {
		return this.aggregateService.aggregateInsertModel(this.sqlQueryBuilderService.prepareInsertModel(entity, model));
	}

	aggregateConnectModel(connection) {
		return this.aggregateService.aggregateConnectModel(connection);
	}

	updateAggregatePayload(entity: any, model: any) {
		return this.aggregateService.aggregateUpdateModel(this.sqlQueryBuilderService.prepareInsertModel(entity, model));
	}

	deleteAggregatePayload(entity: any, model: any) {
		return this.aggregateService.aggregateDeleteModel(this.sqlQueryBuilderService.prepareDeleteModel(entity, model));
	}

	fetchData(entityName, fields?, filters?, orderBy?, pageNumber?, pageSize?) {
		const query = this.sqlQueryBuilderService.prepareQuery(entityName, fields, filters, null, 0, 100);
		return this.platformDataService.getBySqlFilter(entityName, query).pipe(
			map((response: any) => {
				return response.body.Results;
			})
		);
	}

	fetchResponseData(entityName, fields?, filters?, orderBy?, pageNumber?, pageSize?) {
		const query = this.sqlQueryBuilderService.prepareQuery(entityName, fields, filters, null, 0, 100);
		return this.platformDataService.getBySqlFilter(entityName, query).pipe(
			map((response: any) => {
				return response;
			})
		);
	}

	fetchDataSingle(entityName, fields?, filters?, orderBy?) {
		const query = this.sqlQueryBuilderService.prepareQuery(entityName, fields, filters, orderBy, 0, 1);
		return this.platformDataService.getBySqlFilter(entityName, query).pipe(
			map((response: any) => {
				return response.body.Results ? response.body.Results[0] : null;
			})
		);
	}

	removeConnectionAggregate(connectionModel) {
		return this.aggregateService.aggregateDisConnectModel(connectionModel);
	}

	executeAggregateCall(callList): Observable<any> {
		return this.aggregateService.aggregateExecute(callList).pipe(
			map(
				(response: any) => {
					const data = response;
					if (response.AggregateCallCompleted) {
						return true;
					} else {
						console.error('AggregateCallError: ', response);
					}
				},
				(errorResponse) => {
					console.error('AggregateCallError: ', errorResponse);
					return false;
				}
			)
		);
	}

	getProjectListForNavigation() {
		const filters = [];
		const fields = [
			'ItemId',
			'CreateDate',
			'CreatedBy',
			'Tags',
			'ProjectName',
			'ClientName',
			'StartDate',
			'EndDate',
			'IsCompleted',
			'IsDeleted',
			'ProjectImageId',
			'ProjectManager',
			'ProjectManagerId',
			'IsArchived',
			'Address',
			'TotalSite',
			'Latitude',
			'Longitude',
			'AdministrativeClientId',
			'RolesAllowedToRead',
		];
		const Entity = 'Project';
		const query = this.sqlQueryBuilderService.prepareQuery(Entity, fields, filters, 'CreateDate __desc', 0, 1);
		return this.platformDataService.getBySqlFilter(Entity, query, undefined).pipe(
			map((response: Response) => {
				const results = response.body['Results'];
				return results;
			})
		);
	}

	getBySqlFilterAll(
		entity,
		fields,
		filters = [],
		orderBy = 'CreateDate __asc',
		pageNumber = 0,
		pageSize = 10
	): Observable<any> {
		let results = [];
		const query = this.sqlQueryBuilderService.prepareQuery(entity, fields, filters, orderBy, pageNumber, pageSize);
		return this.platformDataService.getBySqlFilter(entity, query, undefined).pipe(
			switchMap((response: Response) => {
				const totalRecordCount = response.body['TotalRecordCount'];
				results = results.concat(response.body['Results']);

				// Get result data
				if (totalRecordCount > pageSize) {
					const noOfCall = Math.ceil(totalRecordCount / pageSize);
					const multiCall$ = [];
					for (let i = 0; i < noOfCall; i++) {
						pageNumber = pageNumber + 1;
						const queryMulty = this.sqlQueryBuilderService.prepareQuery(
							entity,
							fields,
							filters,
							orderBy,
							pageNumber,
							pageSize
						);
						multiCall$.push(this.platformDataService.getBySqlFilter(entity, queryMulty, undefined));
					}

					return forkJoin(multiCall$).pipe(
						map((resultsCallList: any) => {
							if (resultsCallList && resultsCallList.length > 0) {
								resultsCallList.forEach((_callList) => {
									results = results.concat(_callList['body']['Results']);
								});
							}
							return results;
						})
					);
				}

				return of(results);
			})
		);
	}

	/**
	 * @desc Force empty field value when no autocomplete value is selected.
	 * @param form
	 * @param field
	 */
	forceAutoCompleteSelection(form, field) {
		const autocompleteValue = form.get(field).value;
		if (autocompleteValue && !autocompleteValue['ItemId']) {
			form.get(field).setValue('');
		}
	}

	// download CSv file
	// downloadFile(fileDataUrl, fileName) {
	//     const FileSaver = require('file-saver');
	//     FileSaver.saveAs(fileDataUrl, fileName);
	// }

	downloadFile(fileDataUrl, fileName) {
		// window.open(fileDataUrl);
		window.location.href = fileDataUrl;
	}

	// downloadFile(data: Response) {
	//     const blob = new Blob([data], { type: 'text/csv' });
	//     const url= window.URL.createObjectURL(blob);
	//     window.open(url);
	// }


	unsubscribeProfileImage() {
		if (this.profileImageSubscription) {
			this.profileImageSubscription.unsubscribe();
		}
	}

	getUserRole() {
		const userdata = this.userInfoService.userInfo;
		return userdata.Roles.join(',');
		/* let role;
		if (userdata.Roles.indexOf('admin') > -1) {
			role = 'admin';
		} else if (userdata.Roles.indexOf('hr_admin') > -1) {
			role = 'hr_admin';
		} else if (userdata.Roles.indexOf('director') > -1) {
			role = 'director';
		}
		return role; */
	}

	getLoggedInUserRoles() {
		const loggedInUser = this.userInfoService.userInfo;
		let roles = '';

		for (let i = 0; i < loggedInUser.Roles.length; i++) {
			if (i < loggedInUser.Roles.length - 1) {
				roles += loggedInUser.Roles[i] + ',';
			} else {
				roles += loggedInUser.Roles[i];
			}
		}
		return roles;
	}

	/**
	 * Initialize analytics for first time
	 */
	// initializeAnalytics(userId: string) {
	// 	const dimensionMap = {
	// 		name: 1,
	// 		role: 2,
	// 		email: 3,
	// 		duration: 4,
	// 		customername: 5,
	// 		filename: 6,
	// 		productname: 7,
	// 	};
	// 	this.googleAnalyticsService.initializeAnalyticsForGTag(dimensionMap, userId);
	// }

	/**
	 * Send track event when user login into system
	 * @param userInfo
	 */
	// trackUserLoginEvent(userInfo: any) {
	// 	this.setSessionStartTime(new Date().getTime());

	// 	const userObj = {
	// 		role: userInfo['Roles'].filter((x: string) => x != 'anonymous' && x != 'appuser').join(','),
	// 	};

	// 	this.googleAnalyticsService.setUserProperties(userObj);

	// 	this.googleAnalyticsService.eventTrackWithGTag('User Logged In', 'Logged In', 'User Logged In', userObj);

	// 	this.userId = userInfo['UserId'];
	// }

	setSessionStartTime(time) {
		this.sessionStartTime = time;
	}
	getSessionStartTime() {
		return this.sessionStartTime;
	}

	/**
	 * Send track event when user logout from system
	 */
	trackUserLogOutEvent() {
		this.eventTrackWithGTag(
			'Application Closed',
			'Logged Out',
			'User Logged Out',
			{
				duration: this.convertMS(Number(new Date().getTime()) - Number(this.getSessionStartTime())),
			},
			this.userId
		);

		this.setSessionStartTime(null);
		this.userId = null;
	}

	eventTrackWithGTag(action, label, category, dimensions?, userId?: string) {
		const properties = {
			userId: userId || this.userInfoService.userInfo['UserId'],
			label: label,
			category: category,
		};

		if (dimensions) {
			Object.keys(dimensions).forEach((element) => {
				if (this.dimensionMap[element]) {
					const dimensionValue = 'dimension' + this.dimensionMap[element];
					properties[dimensionValue] = dimensions[element];
				}
			});
		}
		this.eventTrackByGTag(action, properties);
	}

	private convertMS(ms: number) {
		let d: number, h: number, m: number, s: number;
		s = Math.floor(ms / 1000);
		m = Math.floor(s / 60);
		s = s % 60;
		h = Math.floor(m / 60);
		m = m % 60;
		d = Math.floor(h / 24);
		h = h % 24;
		h += d * 24;
		return h + ' hour :' + m + ' min :' + s + ' sec';
	}

	private eventTrackByGTag(action: string, properties: any = {}) {
		this.eventTrackInternal(action, {
			event_category: properties.category || 'interaction',
			event_label: properties.label,
			value: properties.value,
			non_interaction: properties.noninteraction,
			...properties.gstCustom,
		});
	}

	private eventTrackInternal(action: string, properties: any = {}) {
		this.cleanProperties(properties);
		if (typeof gtag !== 'undefined' && gtag) {
			gtag('event', action, properties);
		}
	}

	private cleanProperties(properties: { [key: string]: any }): void {
		// GA requires that eventValue be an non-negative integer, see:
		// https://developers.google.com/analytics/devguides/collection/gtagjs/events
		if (properties.value) {
			const parsed = parseInt(properties.value, 10);
			properties.value = isNaN(parsed) ? 0 : parsed;
		}
	}

	download(document: any, name?: string) {
		if (ShellDomainProvider['api']['IsStaging']) {
			document.Url = document.Url.replace('http://', 'https://');
		}

		const options = {
			withCredentials: true,
			responseType: 'blob',
			reportProgress: true,
		};
		const req = new HttpRequest('GET', document.Url, options, { responseType: 'blob' });
		return this.http.request(req).pipe(
			map((event) => {
				if (event['body']) {
					this._FileSaverService.save(event['body'], name || document.Name);
					return null;
				}
				return `File is downloading`;
			})
		);
	}
	downloadAsZip(documents: any, name?: string) {
		for (let document of documents) {
			if (ShellDomainProvider['api']['IsStaging']) {
				document.Url = document.Url.replace('http://', 'https://');
			}
		}
		const options = {
			withCredentials: true,
			responseType: 'blob',
			reportProgress: true,
		};
		let zippedTillNow = 0;
		const zip = new JSZip();
		const obs = new Observable((observer) => {
			// observer.next({
			// 	message: 'Zipping is started',
			// 	type: 'warning',
			// });
			for (let document of documents) {
				const req = new HttpRequest('GET', document.Url, options, { responseType: 'blob' });
				this.http.request(req).subscribe((response) => {
					if (response['body']) {
						zip.file(document.Name, response['body']);
						++zippedTillNow;
						if (zippedTillNow == documents.length) {
							observer.next({
								message: 'Downloading is starting',
								type: 'warning',
							});
							zip.generateAsync({ type: 'blob' }).then((content) => {
								this._FileSaverService.save(content, 'attachments.zip');
								observer.next({
									message: 'File downloaded successfully',
									type: 'success',
								});
							});
						}
					}
				});
			}
		});
		return obs;
	}

	downloadFileById(id: any) {
		return this.storageDataService.getFileInfo(id).pipe(switchMap((response: any) => this.download(response.body)));
	}

	uploadFile(file: File, parentDirectory: string) {
		const sub = new Subject();
		this.storageDataService
			.getPreSignedUrl(this.utilityService.getNewGuid(), file['name'], parentDirectory, ['File'])
			.pipe(take(1))
			.subscribe((response) => {
				this.storageDataService
					.uploadPresignedFile(response.body.UploadUrl, file)
					.pipe(take(1))
					.subscribe(() => {
						sub.next(response['body']['FileId'] as string);
					});
			});
		return sub;
	}

	/* Link Copy Generator */
	copyToClipBoard(text: string) {
		const selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '1';
		selBox.value = text;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
	}

	/* 1st, 2nd Ordinal Suffix */
	ordinalSuffixOf(i: number) {
		let j = i % 10,
			k = i % 100;

		if (j == 1 && k != 11) {
			return i + 'st';
		}
		if (j == 2 && k != 12) {
			return i + 'nd';
		}
		if (j == 3 && k != 13) {
			return i + 'rd';
		}
		return i + 'th';
	}

	/* Get All Regions */
	getRegions() {
		return this.http
			.get(ShellDomainProvider['api'].BusinessService + `v1/region/list?PageNumber=0&PageSize=100`, {
				withCredentials: true,
				observe: 'response',
			})
			.pipe(map((response: any) => response.body.Data));
	}

	/* Table Row click permission check */
	checkFeatureAuthorization = ({ AppName, FeatureId }) => {
		return this._featureProvider.getFeatures().then((features: any[]) => {
			return features.find((feature) => {
				return feature.Name === AppName && feature.Features.includes(FeatureId);
			});
		});
	};

	/* Get All Leave Types */
	getLeaveTypes(region: string) {
		return this.http
			.get(ShellDomainProvider['api'].BusinessService + `v1/leave/category/region/${region}?PageSize=10&PageNumber=0`, {
				withCredentials: true,
				observe: 'response',
			})
			.pipe(map((response: any) => response.body.Data));
	}
}
