import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { UserInfoService, AggregateService, ShellDomainProvider } from '@ecap3/core';
import { of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

export enum ResponseKeyCollection {
	MessagingThreadNotification,
	UserRoleModified,
}

@Injectable({
	providedIn: 'root',
})
export class OfflineNotificationService implements OnDestroy {
	onNotificationBtnClicked = new EventEmitter<any>();
	private _unsubscribeAll = new Subject<void>();
	private currentUser;
	responseKeyCollection;

	constructor(private aggregateService: AggregateService, private userInfoService: UserInfoService) {
		this.responseKeyCollection = ResponseKeyCollection;
	}

	private getNotificationPayload(responseKey, message, title, recieverUserId, messageParamObj) {
		const denormalizedObj = {
			time: new Date(),
			Success: true,
			messageKey: message,
			titleKey: title,
		};
		for (const key in messageParamObj) {
			if (messageParamObj.hasOwnProperty(key)) {
				denormalizedObj[key] = messageParamObj[key];
			}
		}
		return {
			UserIds: [recieverUserId],
			NotificationType: 'UserSpecificReceiverType',
			ResponseKey: responseKey,
			// SubscriptionFilters: [{
			//   Context: responseKey
			// }],
			// ResponseValue: JSON.stringify({
			//   identifier: responseKey
			// }),

			DenormalizedPayload: JSON.stringify(denormalizedObj),
		};
	}

	saveTaskAsNotification(messageKey, proposedUserId, detailRoute, responseKey, titleKey?, paramObj?) {
		if (!titleKey) {
			titleKey = null;
		}
		this.userInfoService.currentUser.pipe(takeUntil(this._unsubscribeAll)).subscribe((response: any) => {
			if (response) {
				this.currentUser = response;
				this.sendNotificationToResponsiblePerson(
					messageKey,
					proposedUserId,
					detailRoute,
					responseKey,
					titleKey,
					paramObj
				).subscribe((result) => {});
			}
		});
	}

	getNotificationPayloadModel(messageKey, proposedUserId, detailRoute, responseKey, titleKey?, paramObj?) {
		if (!titleKey) {
			titleKey = null;
		}
		if (!this.currentUser) {
			this.userInfoService.currentUser.pipe(takeUntil(this._unsubscribeAll)).subscribe((response: any) => {
				if (response) {
					this.currentUser = response;
				}
			});
		}

		const messageParamObj = this.getParamsObj(detailRoute, titleKey, paramObj);
		// const messageParamObj = {
		//     TaskTitle: titleKey,
		//     TaskCreator: this.currentUser.DisplayName,
		//     DetailRoute: detailRoute,
		// };

		const _responsiblePerson = {
			ProposedUserId: proposedUserId,
		};

		const payload = this.getNotificationPayload(
			responseKey,
			messageKey,
			titleKey,
			_responsiblePerson.ProposedUserId,
			messageParamObj
		);

		return payload;
	}

	saveTaskAsNotificationWithAggregate(payloads) {
		const subject = new Subject();
		const callList = [];
		const responseKeyList = [];
		payloads.forEach((payload, index) => {
			callList.push(this.aggregateNotificationModel(payload));
			responseKeyList.push('Notify' + index);
		});
		this.aggregateService.aggregateExecute(callList, responseKeyList).subscribe((response) => {
			if (response.FailedCallIndex !== -1) {
				subject.next(false);
			}
			return subject.next(true);
		});
		return subject.asObservable();
	}

	getParamsObj(detailRoute, titleKey, paramObj?) {
		let messageParamObj: any = {};
		if (paramObj) {
			messageParamObj = JSON.parse(JSON.stringify(paramObj));
		}
		messageParamObj.TaskTitle = titleKey;
		messageParamObj.TaskCreator = this.currentUser.DisplayName;
		messageParamObj.DetailRoute = detailRoute;
		return messageParamObj;
	}

	private sendNotificationToResponsiblePerson(messageKey, proposedUserId, detailRoute, responseKey, titleKey, paramObj) {
		const callList = [];
		const responseKeyList = [];
		const messageParamObj = this.getParamsObj(detailRoute, titleKey, paramObj);

		const _responsiblePerson = {
			ProposedUserId: proposedUserId,
		};

		if (this.currentUser.UserId !== _responsiblePerson.ProposedUserId) {
			const payload = this.getNotificationPayload(
				responseKey,
				messageKey,
				titleKey,
				_responsiblePerson.ProposedUserId,
				messageParamObj
			);
			callList.push(this.aggregateNotificationModel(payload));
			responseKeyList.push('Notify' + _responsiblePerson);
		}

		return this.aggregateService.aggregateExecute(callList, responseKeyList).pipe(
			map((response: any) => {
				if (response.FailedCallIndex !== -1) {
					return of(false);
				}
				return of(true);
			})
		);
	}

	private aggregateNotificationModel(notificationModel) {
		const model = {
			Uri: ShellDomainProvider['api'].NotificationService + '/api/Notifier/Notify',
			Verb: 'Post',
			Payload: JSON.stringify(notificationModel),
			SuccessIf: JSON.stringify({ Success: 'True' }),
		};

		return model;
	}

	getBulkNotificationPayloadModel(messageKey, proposedUserId, detailRoute, responseKey, titleKey?, paramObj?) {
		if (!titleKey) {
			titleKey = null;
		}
		if (!this.currentUser) {
			this.userInfoService.currentUser.pipe(takeUntil(this._unsubscribeAll)).subscribe((response: any) => {
				if (response) {
					this.currentUser = response;
				}
			});
		}

		const messageParamObj = this.getParamsObj(detailRoute, titleKey, paramObj);
		const _responsiblePerson = {
			ProposedUserId: proposedUserId,
		};

		const payload = this.getBulkNotificationPayload(
			responseKey,
			messageKey,
			titleKey,
			_responsiblePerson.ProposedUserId,
			messageParamObj
		);

		return payload;
	}

	private getBulkNotificationPayload(responseKey, message, title, recieverUserId, messageParamObj) {
		const denormalizedObj = {
			time: new Date(),
			Success: true,
			messageKey: message,
			titleKey: title,
		};
		for (const key in messageParamObj) {
			if (messageParamObj.hasOwnProperty(key)) {
				denormalizedObj[key] = messageParamObj[key];
			}
		}
		return {
			UserIds: recieverUserId,
			NotificationType: 'UserSpecificReceiverType',
			ResponseKey: responseKey,
			DenormalizedPayload: JSON.stringify(denormalizedObj),
		};
	}

	ngOnDestroy() {
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
	}
}
