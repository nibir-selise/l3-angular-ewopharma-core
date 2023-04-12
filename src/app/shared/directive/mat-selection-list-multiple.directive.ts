import { SelectionModel } from '@angular/cdk/collections';
import { Directive, Host, Input, OnChanges } from '@angular/core';
import { MatListOption, MatSelectionList } from '@angular/material/list';

@Directive({
	selector: 'mat-selection-list[multiple]',
})
export class MatSelectionListMultipleDirective implements OnChanges {
	private matSelectionList: MatSelectionList;

	@Input()
	public multiple: boolean;

	constructor(@Host() matSelectionList: MatSelectionList) {
		this.matSelectionList = matSelectionList;
	}

	public ngOnChanges(): void {
		if (this.multiple) {
			this.matSelectionList.selectedOptions = new SelectionModel<MatListOption>(
				true,
				this.matSelectionList.selectedOptions.selected
			);
		} else {
			let selected = this.matSelectionList.selectedOptions.selected.splice(0, 1);
			this.matSelectionList.selectedOptions = new SelectionModel<MatListOption>(false, selected);
		}
	}
}
