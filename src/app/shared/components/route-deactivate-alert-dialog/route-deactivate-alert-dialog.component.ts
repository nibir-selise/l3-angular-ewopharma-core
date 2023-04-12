import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as langFromRoot from '@ecap3/core';
import { Subscription, Observable, Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-route-deactivate-alert-dialog',
	templateUrl: './route-deactivate-alert-dialog.component.html',
	styleUrls: ['./route-deactivate-alert-dialog.component.scss'],
})
export class RouteDeactivateAlertDialogComponent implements OnInit {
	firedFrom: any = null; // ['CancelButton', 'RouteChange']
	langSub: Subscription;
	lang$: Observable<string>;
	private unsubscribe$ = new Subject<void>();
	constructor(
		public dialogRef: MatDialogRef<RouteDeactivateAlertDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private currentRoute: ActivatedRoute,
		private readonly translateService: TranslateService,
		private store: Store<langFromRoot.State>
	) {
		this.lang$ = this.store.select(langFromRoot.getCurrentLanguage);
	}

	ngOnInit() {
		this.langSub = this.lang$.subscribe((lang) => this.translateService.use(lang));
		this.firedFrom = this.data.FiredFrom;
	}
	choose(action: boolean) {
		if (this.firedFrom == 'CancelButton') {
			this.dialogRef.close({ ExitEditMode: action });
		} else if (this.firedFrom == 'RouteChange') {
			// this.directoryService.navigateAwaySelection$.next(action);
			this.dialogRef.close();
		}
	}
}
