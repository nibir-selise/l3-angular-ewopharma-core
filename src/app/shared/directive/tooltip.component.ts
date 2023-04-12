import {
	Input,
	Component,
	Directive,
	ViewContainerRef,
	ComponentRef,
	TemplateRef,
	ContentChild,
	AfterViewInit,
	ElementRef,
	OnInit,
	OnChanges,
	ComponentFactoryResolver,
} from '@angular/core';
import { PositionService } from './position.service';
import * as $ from 'jquery';

interface TooltipOptions {
	position: string;
	color: string;
	popupClass: string;
	margin: number;
	trigger: {
		on: string;
		off: string;
	};
	dismissable: boolean;
	active: boolean;
	offsetY: number;
	canHover: boolean;
	reference: string;
}

const defaultTooltipOptions: TooltipOptions = {
	position: 'top',
	color: 'red',
	popupClass: '',
	margin: 11,
	trigger: {
		on: 'mouseover',
		off: 'mouseleave',
	},
	dismissable: true,
	active: true,
	offsetY: 0,
	canHover: false,
	reference: null,
};

@Directive({
	selector: '[tooltip]',
})
export class TooltipDirective implements OnInit, OnChanges {
	@Input('tooltip') private tooltipOptions: any;
	@ContentChild('tooltipTemplate', { static: false }) private tooltipTemplate: TemplateRef<any>;

	private tooltip: ComponentRef<Tooltip>;
	private tooltipId: string;
	private tooltipElement: any;
	// private $: any = window['$'];
	private _: any = window['_'];
	private parentElement: any;

	constructor(
		private viewContainer: ViewContainerRef,
		public elementRef: ElementRef,
		private componentFactoryResolver: ComponentFactoryResolver,
		private position: PositionService
	) {
		this.tooltipId = this._.uniqueId('tooltip');
	}

	ngOnInit() {
		const element = $(this.elementRef.nativeElement);
		const parentElement = $(element.parent());

		let onTooltip = false;

		if (!this.options.trigger.off) {
			element.on(this.options.trigger.on, () => {
				this.tooltipElement.on('mouseout', () => {
					onTooltip = false;
				});
				if (this.tooltip) {
					this.hideTooltip();
				} else if (this.options.active === true) {
					this.showTooltip();
				}
			});
		} else {
			element.on(this.options.trigger.on, () => {
				if (!this.tooltip && this.options.active === true) {
					this.showTooltip();
					onTooltip = false;
					this.tooltipElement = $(this.tooltip.instance.elementRef.nativeElement);
				}
			});
			element.on(this.options.trigger.off, () => {
				if (this.tooltip) {
					if (!this.options.canHover) {
						this.hideTooltip();
					} else {
						this.tooltipElement[0].addEventListener('mouseleave', () => {
							onTooltip = false;
							this.hideTooltip();
						});
						this.tooltipElement[0].addEventListener('mouseover', () => {
							onTooltip = true;
						});
						setTimeout(() => {
							if (!onTooltip) {
								this.hideTooltip();
							}
						}, 100);
					}
				}
			});
		}
	}

	ngOnChanges() {
		if (this.options.active === false && this.tooltip) {
			this.hideTooltip();
		}
	}

	private showTooltip() {
		if (this.tooltipTemplate) {
			this.viewContainer.clear();
			const factory = this.componentFactoryResolver.resolveComponentFactory(Tooltip);
			this.tooltip = this.viewContainer.createComponent(factory);
			this.tooltip.instance['content'] = this.tooltipTemplate;
			this.tooltip.instance['parentEl'] = this.elementRef;
			this.tooltip.instance['tooltipOptions'] = this.options;
			$('html').on('click.' + this.tooltipId, (event: any) => {
				let $target = $(event.target);

				if (
					$target.closest(this.tooltip.instance.elementRef.nativeElement).height &&
					!$target.closest(this.elementRef.nativeElement).height
				) {
					this.hideTooltip();
				}
			});
		}
	}

	private hideTooltip() {
		if (this.tooltip) {
			this.tooltip.destroy();
			$('html').off('click.' + this.tooltipId);
			this.tooltip = undefined;
		}
	}

	private get options(): TooltipOptions {
		return this._.defaults({}, this.tooltipOptions || {}, defaultTooltipOptions);
	}
}

// <ng-template [ngTemplateOutlet]="tooltipTemplate"> </ng-template>
@Component({
	selector: 'tooltip',
	template: ` <div class="inner">
			<ng-template [ngTemplateOutlet]="content"></ng-template>
		</div>
		<div class="arrow"></div>`,
	styles: [
		`
			:host {
				background: #fafafa;
				-webkit-box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12),
					0 3px 5px 0 rgba(0, 0, 0, 0.2);
				box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px 0 rgba(0, 0, 0, 0.2);
				border-radius: 4px;
				padding: 0;
				/*font-size: 12px;*/
				color: #262633 !important;
				/*letter-spacing: 0.02px;*/
				text-align: left;
				position: fixed;
				z-index: 99999999999999999999999999999999999999999999999999;
				transition: all 0.75s ease-out;
				-webkit-transition: all 0.75s ease-out;
			}

			:host > .arrow {
				position: absolute;
				display: block;
				width: 0;
				height: 0;
				border-color: transparent;
				color: #e9ecee;
				border-style: solid;
				border-width: 11px;
			}

			:host > .arrow:after {
				position: absolute;
				display: block;
				width: 0;
				height: 0;
				border-color: transparent;
				border-style: solid;
				border-width: 10px;
				content: '';
			}

			:host(.top) > .arrow {
				left: 50%;
				margin-left: -11px;
				border-bottom-width: 0;
				border-top-color: #ccc;
				bottom: -11px;
			}

			:host(.top) > .arrow:after {
				bottom: 1px;
				margin-left: -10px;
				border-bottom-width: 0;
				border-top-color: #fff;
			}

			:host(.bottom) > .arrow {
				left: 50%;
				margin-left: -11px;
				border-top-width: 0;
				border-bottom-color: #ccc;
				top: -11px;
			}

			:host(.bottom) > .arrow:after {
				top: 1px;
				margin-left: -10px;
				border-top-width: 0;
				border-bottom-color: #fff;
			}

			:host(.right) > .arrow {
				top: 40px;
				left: -11px;
				margin-top: -11px;
				border-left-width: 0;
				border-right-color: #ccc;
			}

			:host(.right) > .arrow:after {
				left: 1px;
				bottom: -10px;
				border-left-width: 0;
				border-right-color: #fff;
			}

			:host(.left) > .arrow {
				top: 50%;
				right: -11px;
				margin-top: -11px;
				border-right-width: 0;
				border-left-color: #ccc;
			}

			:host(.left) > .arrow:after {
				right: 1px;
				bottom: -10px;
				border-right-width: 0;
				border-left-color: #fff;
			}

			.mr-10 {
				margin-right: 10px;
			}

			:host(.RedBorder) {
				border-top: 4px solid #e57373 !important;
			}

			:host(.PinkBorder) {
				border-top: 4px solid #ec407a !important;
			}

			:host(.PurpleBorder) {
				border-top: 4px solid #ab48bc !important;
			}

			:host(.DeepPurpleBorder) {
				border-top: 4px solid #673ab7 !important;
			}

			:host(.IndigoBorder) {
				border-top: 4px solid #3f51b5 !important;
			}

			:host(.BlueBorder) {
				border-top: 4px solid #01adc1 !important;
			}

			:host(.TealBorder) {
				border-top: 4px solid #009688 !important;
			}

			:host(.GreenBorder) {
				border-top: 4px solid #8bc34a !important;
			}

			:host(.OrangeBorder) {
				border-top: 4px solid #ffa725 !important;
			}

			:host(.DeepOrangeBorder) {
				border-top: 4px solid #ff7043 !important;
			}

			:host(.GreyBorder) {
				border-top: 4px solid #808080 !important;
			}

			.inner {
				font-size: 13px !important;
				/*max-width: 300px;*/
				width: auto;
				min-width: 200px;
				word-break: break-all;
				transition: all 0.75s ease-out;
				-webkit-transition: all 0.75s ease-out;
				white-space: normal !important;
			}
		`,
	],
})
export class Tooltip implements AfterViewInit {
	@Input() public content: TemplateRef<Object>;
	@Input() public parentEl: ElementRef;
	@Input() public tooltipOptions: TooltipOptions;
	// private $: any = window['$'];
	private _: any = window['_'];

	constructor(private positionService: PositionService, public elementRef: ElementRef) {}

	public position() {
		$(this.elementRef.nativeElement).addClass(
			[this.tooltipOptions.position, this.tooltipOptions.color, this.tooltipOptions.popupClass].join(' ')
		);
		let position = this.positionService.positionElements(
			this.parentEl.nativeElement,
			this.elementRef.nativeElement,
			this.tooltipOptions.position,
			this.tooltipOptions.margin,
			true,
			this.tooltipOptions.offsetY
		);
		$(this.elementRef.nativeElement).css({
			top: position.top + 'px',
			left: position.left + 'px',
			display: 'block',
		});
	}

	ngAfterViewInit(): void {
		this.position();
	}
}
