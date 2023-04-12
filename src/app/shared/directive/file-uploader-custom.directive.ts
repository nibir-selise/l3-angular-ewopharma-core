import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
	selector: '[appFileUploaderCustom]',
})
export class FileUploaderCustomDirective {
	@Output() public onFilesSelected: EventEmitter<File[]> = new EventEmitter<File[]>();
	@Output() public onDragover: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() public onDrop: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() public onDragenter: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() public onDragleave: EventEmitter<boolean> = new EventEmitter<boolean>();
	constructor(private element: ElementRef) {}

	@HostListener('change')
	public onChange(): any {
		let files = this.element.nativeElement.files;
		this.onFilesSelected.emit(files);
		this.element.nativeElement.value = '';
	}

	@HostListener('dragover', ['$event'])
	public OnDragover(event: any): any {
		event.preventDefault();
		this.onDragover.emit(true);
	}
	@HostListener('dragenter', ['$event'])
	public OnDragenter(event: any): any {
		event.preventDefault();
		this.onDragenter.emit(true);
	}
	@HostListener('dragleave', ['$event'])
	public OnDragleave(event: any): any {
		event.preventDefault();
		this.onDragleave.emit(true);
	}
	@HostListener('drop', ['$event'])
	public OnDrop(event: any): any {
		let files = event.dataTransfer.files;
		this.onFilesSelected.emit(files);
		event.preventDefault();
		event.stopPropagation();
		this.onDrop.emit(true);
	}
}
