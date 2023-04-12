import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FileService } from '../../../shared/services/file.service';
import { CommonService } from '../../../shared/services/common.service';
import { IPageFilter } from '../../Interfaces/GraphQl.interface';
import { CommonDataService } from '../../services/common-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomToastService } from '../../services/custom-toast.service';

@Component({
	selector: 'app-assessor-assign-modal',
	templateUrl: './assessor-assign-modal.component.html',
	styleUrls: ['./assessor-assign-modal.component.scss'],
})
export class AssessorAssignModalComponent implements OnInit, OnDestroy {
	@Output('modalClosed') modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output('updateAssessors') updateAssessors: EventEmitter<any[]> = new EventEmitter<any[]>();
	isGetRegionList: boolean = false;
	isGetRegionSpecificRoleList: boolean = false;
	searchFormControl: FormControl = new FormControl();
	roleFormControl: FormControl = new FormControl();
	private _unsubscribeAll: Subject<void>;
	regions: string[] = [];
	selectedRegion: string = '';
	currentUserRoles: string = '';
	availableRoles: object[] = [];
	selectedRole: string = '';
	isUserListLoading: boolean = false;
	isNewUserListLoading: boolean = false;
	availableUsers: any[] = [];
	assessors: any[] = [];
	totalData: number = 0;
	currentPageIndex: number = 0;
	assignClicked: boolean = false;
	allowMultipleAssessor: boolean;

	constructor(
		private commonDataService: CommonDataService,
		private commonService: CommonService,
		private fileService: FileService,
		@Inject(MAT_DIALOG_DATA) data: any,
		private customToastService: CustomToastService
	) {
		this.assessors = cloneDeep(data.assessors);
		this.allowMultipleAssessor = data.allowMultipleAssessor;
		this._unsubscribeAll = new Subject<void>();
	}

	ngOnInit(): void {
		this.prepareExistingAssessorsData();
		this.getAssignableUsers('init');
		this.currentUserRoles = this.commonService.getUserRole();
		this.getRegionList();
		this.searchFormControlSubscribe();
	}

	prepareExistingAssessorsData() {
		let profileImageIds = this.assessors
			.filter((assessor) => assessor.ProfileImageId)
			.map((assessor) => assessor.ProfileImageId);
		profileImageIds = profileImageIds.filter((imageId, index) => profileImageIds.indexOf(imageId) == index);
		this.fileService
			.getFilesByIds(profileImageIds)
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((response: any) => {
				this.assessors = this.assessors.map((assessor) => {
					const filteredFileList = response.filter((file: any) => {
						return file.fileId == assessor.ProfileImageId;
					});
					return {
						UserProfileDetailId: assessor.UserProfileDetailId,
						DisplayName: assessor.DisplayName,
						ProfileImageId: assessor.ProfileImageId,
						ProfileImageUrl: filteredFileList.length ? filteredFileList[0].fileObj.Url : '',
						Designation: '',
						IsSelected: true,
					};
				});
			});
	}

	getAssignableUsers(type: string) {
		if (type == 'scroll') {
			if (this.availableUsers.length == this.totalData) {
				return;
			}
			this.currentPageIndex++;
		} else {
			this.currentPageIndex = 0;
			this.totalData = 0;
			this.availableUsers = [];
		}
		if (type == 'init') {
			this.isUserListLoading = true;
		} else {
			this.isNewUserListLoading = true;
			this.availableUsers.push('loading');
		}
		let filter = {
			Keyword: this.searchFormControl.value || '',
			EmploymentLocation: this.selectedRegion || '',
			RoleKey: this.selectedRole || '',
		};
		let pageFilter: IPageFilter = {
			PageNumber: this.currentPageIndex,
			PageSize: 15,
		};
		let sort = {
			SortKey: '',
			SortType: -1,
		};
		this.commonDataService
			.getUsers(pageFilter, sort, filter)
			.pipe(distinctUntilChanged(), takeUntil(this._unsubscribeAll))
			.subscribe((res: any) => {
				this.totalData = res.TotalData;
				let users = res.Items;
				let profileImageIds = users.filter((user: any) => user.ProfileImageId).map((user: any) => user.ProfileImageId);
				profileImageIds = profileImageIds.filter((imageId: any, index: any) => profileImageIds.indexOf(imageId) == index);
				this.fileService
					.getFilesByIds(profileImageIds)
					.pipe(takeUntil(this._unsubscribeAll))
					.subscribe((response: any) => {
						users = users.map((user: any) => {
							const filteredFileList = response.filter((file: any) => {
								return file.fileId == user.ProfileImageId;
							});
							return {
								UserProfileDetailId: user.ItemId,
								DisplayName: user.DisplayName,
								ProfileImageId: user.ProfileImageId,
								ProfileImageUrl: filteredFileList.length ? filteredFileList[0].fileObj.Url : '',
								Designation: user.Designation ? user.Designation : '',
								IsSelected: this.assessors.some((assessor) => assessor.UserProfileDetailId == user.ItemId)
									? true
									: false,
							};
						});
						this.availableUsers = this.availableUsers.concat(users);
						this.availableUsers = this.availableUsers.filter((user) => user != 'loading');
						this.isUserListLoading = false;
						this.isNewUserListLoading = false;
					});
			});
	}

	getRegionList() {
		this.commonDataService
			.getRegionList()
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((response: any) => {
				this.regions = response.Items.map((item: any) => item.Title);
				this.isGetRegionList = true;
			});
	}

	searchFormControlSubscribe() {
		this.searchFormControl.valueChanges
			.pipe(debounceTime(800), distinctUntilChanged(), takeUntil(this._unsubscribeAll))
			.subscribe((response: any) => {
				this.getAssignableUsers('init');
			});
	}

	onRegionSelect(event: any) {
		this.selectedRegion = event.value;
		this.selectedRole = '';
		this.roleFormControl.reset();
		this.getAssignableUsers('init');
		if (this.selectedRegion) {
			this.getRolesByRegion();
		}
	}

	onRoleSelect(event: any) {
		this.selectedRole = event.value;
		this.getAssignableUsers('init');
	}

	getRolesByRegion() {
		this.isGetRegionSpecificRoleList = false;
		this.commonDataService
			.getRegionSpecificRoleList(this.selectedRegion, this.currentUserRoles)
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((res: any) => {
				this.availableRoles = res.Items;
				this.isGetRegionSpecificRoleList = true;
			});
	}

	onClose() {
		this.modalClosed.emit(true);
	}

	clearSearchField() {
		this.searchFormControl.reset();
	}

	selectUser(user: any) {
		user.IsSelected = !user.IsSelected;
		if (!user.IsSelected) {
			this.removeUser(user);
		} else {
			if (this.assessors.length && !this.allowMultipleAssessor) {
				this.removeUser(this.assessors[0]);
			}
			this.assessors.push(user);
		}
	}

	removeUser(user: any) {
		this.assessors = this.assessors.filter((item) => item.UserProfileDetailId !== user.UserProfileDetailId);
		let tempUser = this.availableUsers.find((item) => item.UserProfileDetailId == user.UserProfileDetailId);
		if (tempUser) {
			tempUser.IsSelected = false;
		}
	}

	onAssign() {
		this.assignClicked = true;
		this.updateAssessors.emit(this.assessors);
	}

	onScrollDown() {
		if (!this.isNewUserListLoading) this.getAssignableUsers('scroll');
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
	}
}
