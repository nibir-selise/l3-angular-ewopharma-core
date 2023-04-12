import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material.module';
import { CustomSnackbarComponent } from './custom-snackbar.component';

@NgModule({
	declarations: [CustomSnackbarComponent],
	imports: [
		CommonModule,
		MaterialModule,
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
	],
	providers: [],
	entryComponents: [CustomSnackbarComponent],
	exports: [],
})
export class AppCustomSnackbarModule { }
