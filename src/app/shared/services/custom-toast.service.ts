import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { CustomSnackbarComponent } from '../components/custom-snackbar/custom-snackbar.component';

@Injectable({
	providedIn: 'root',
})
export class CustomToastService {
	constructor(
		private snackBar: MatSnackBar,
	) { }

	showSuccessToast(message: string) {
		this.snackBar.openFromComponent(CustomSnackbarComponent, {
			data: {
				message: message,
				notificationType: 'success',
				needDismissBtn: true,
			},
			duration: 3000,
			horizontalPosition: 'end',
			verticalPosition: 'bottom',
		});
	}

	showErrorToast(message: string) {
		this.snackBar.openFromComponent(CustomSnackbarComponent, {
			data: {
				message: message,
				notificationType: 'failure',
				needDismissBtn: true,
			},
			duration: 3000,
			horizontalPosition: 'end',
			verticalPosition: 'bottom',
		});
	}

	showWarningToast(message: string) {
		this.snackBar.openFromComponent(CustomSnackbarComponent, {
			data: {
				message: message,
				notificationType: 'warning',
				needDismissBtn: true,
			},
			duration: 3000,
			horizontalPosition: 'end',
			verticalPosition: 'bottom',
		});
	}
}
