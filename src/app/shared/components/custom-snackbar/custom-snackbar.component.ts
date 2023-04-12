import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
// import { MatSnackBarRef } from '@angular/material';
// import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
	selector: 'app-custom-snackbar',
	templateUrl: './custom-snackbar.component.html',
	styleUrls: ['./custom-snackbar.component.scss'],
})
export class CustomSnackbarComponent implements OnInit {
	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, public snackBarRef: MatSnackBarRef<CustomSnackbarComponent>) {}

	ngOnInit() {}
}
