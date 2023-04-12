import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive';
import { MatSelectionListMultipleDirective } from './mat-selection-list-multiple.directive';

@NgModule({
	imports: [CommonModule],
	exports: [ClickOutsideDirective, MatSelectionListMultipleDirective],
	declarations: [ClickOutsideDirective, MatSelectionListMultipleDirective],
	providers: [],
})
export class SharedDirectiveModule {}
