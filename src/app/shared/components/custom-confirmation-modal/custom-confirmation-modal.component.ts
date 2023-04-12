import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({ 
	selector: 'app-custom-confirmation-modal',
	templateUrl: './custom-confirmation-modal.component.html',
	styleUrls: ['./custom-confirmation-modal.component.scss'],
})
export class CustomConfirmationModalComponent implements OnInit {
  
  data;
	constructor(public dialogRef: MatDialogRef<CustomConfirmationModalComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.data = data;
	}

	ngOnInit(): void {}

	onConfirm() {
		this.dialogRef.close({ 
			confirm: true,
		});
	}
} 
