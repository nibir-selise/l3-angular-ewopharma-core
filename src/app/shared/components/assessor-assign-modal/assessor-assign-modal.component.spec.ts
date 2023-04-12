import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorAssignModalComponent } from './assessor-assign-modal.component';

describe('AssessorAssignModalComponent', () => {
	let component: AssessorAssignModalComponent;
	let fixture: ComponentFixture<AssessorAssignModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AssessorAssignModalComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AssessorAssignModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
