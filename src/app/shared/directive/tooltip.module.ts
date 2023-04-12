import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PositionService } from './position.service';
import { Tooltip, TooltipDirective } from './tooltip.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule.withConfig({
			useColumnBasisZero: true,
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
	providers: [PositionService, { provide: 'Window', useValue: window }],
	exports: [Tooltip, TooltipDirective],
	declarations: [TooltipDirective, Tooltip],
	entryComponents: [Tooltip],
})
export class TooltipModule {}
