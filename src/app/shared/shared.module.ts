import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MultiTranslateHttpLoader } from '@ecap3/core';
import { AvatarModule } from 'ngx-avatar';
import { RouteDeactivateAlertDialogComponent } from './components/route-deactivate-alert-dialog/route-deactivate-alert-dialog.component';
import { UtcToLocalTime } from './pipes/utc-to-local-time.pipe.ts.pipe';
import { AssessorAssignComponent } from './components/assessor-assign/assessor-assign.component';
import { AssessorAssignModalComponent } from './components/assessor-assign-modal/assessor-assign-modal.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FileUploaderCustomDirective } from './directive/file-uploader-custom.directive';
import { CustomConfirmationModalComponent } from './components/custom-confirmation-modal/custom-confirmation-modal.component';
import { JsonParsePipe } from './pipes/jsonParse.pipe';
import { MaterialModule } from './material.module';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { InternationalPhoneNumberModule } from '@ecap3/ngx-international-phone-number';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

registerLocaleData(localeDe, 'de');

export function HttpLoaderFactory(http: HttpClient) {
	return new MultiTranslateHttpLoader(http, [{ prefix: './assets/i18n/app-directory/', suffix: '.json' }]);
}

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		AvatarModule,
		FlexLayoutModule.withConfig({
			useColumnBasisZero: false,
			printWithBreakpoints: [
				'xs',
				'sm',
				'md',
				'lg',
				'xl',
				'lt-sm',
				'lt-md',
				'lt-lg',
				'lt-xl',
				'gt-xs',
				'gt-sm',
				'gt- md',
				'gt-lg',
			],
		}),
		HttpClientModule,
		// TranslateModule.forRoot({
		// 	loader: {
		// 		provide: TranslateLoader,
		// 		useFactory: HttpLoaderFactory,
		// 		deps: [HttpClient],
		// 	},
		// 	isolate: true,
		// }),
		MatButtonModule,
		MatIconModule,
		MatDatepickerModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		InternationalPhoneNumberModule,
		InfiniteScrollModule,
	],
	declarations: [
		RouteDeactivateAlertDialogComponent,
		UtcToLocalTime,
		AssessorAssignModalComponent,
		AssessorAssignComponent,
		FileUploaderCustomDirective,
		CustomConfirmationModalComponent,
		JsonParsePipe,
	],
	exports: [
		RouteDeactivateAlertDialogComponent,
		AssessorAssignModalComponent,
		AssessorAssignComponent,
		FileUploaderCustomDirective,
		CustomConfirmationModalComponent,
		JsonParsePipe,
	],
	entryComponents: [],
	providers: [
		/*{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},*/

		{
			// provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS
			provide: MAT_DATE_FORMATS,
			useValue: {
				parse: {
					dateInput: ['l', 'LL'],
				},
				display: {
					dateInput: 'L',
					monthYearLabel: 'MMM YYYY',
					dateA11yLabel: 'LL',
					monthYearA11yLabel: 'MMMM YYYY',
				},
			},
		},
		UtcToLocalTime,
	],
})
export class SharedModule { }
