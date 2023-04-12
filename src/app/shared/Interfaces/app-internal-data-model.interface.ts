
export interface IChipsModel {
	Key: string;
	Checked: boolean;
}
export interface ICountryInfo {
	CountryName: string;
	Code: string;
}

export interface IEnqueueMail {
	Purpose: string;
	Language: string;
	To: string[];
	Bcc?: string[];
	Cc?: string;
	Attachments?: string[];
	ReplyTo?: string;
	DataContext: {
		[prop: string]: any;
	};
	Subject: {
		[prop: string]: any;
	};
	UseOwnEmail?: boolean;
	UseHtmlInDataContext?: boolean;
	RaiseEvent?: boolean;
	CorrelationId?: string;
	OfflineNotification?: boolean;
	UseIntegrationService?: boolean;
}

export interface IFileInfos {
	Name?: string;
	ItemId: string;
	Url: string;
}

export interface IApplicantActivityData {
	AnnanowBoardId: string;
	AnnanowBoardColumnId: string;
	AnnanowApplicantId: string;
	ActivityPersonId: string;
	ActivityType: string;
	AdditionalData: string;
	ActivityPersonDisplayName: string;

	ActivityPersonProfileImageId: string;
}

export interface IAvailabilityType {
	name: string;
	isSelected: boolean;
	selectedDays: number[];
}

export interface IUserData {
	ItemId: string;
	FirstName?: string;
	LastName?: string;
	DisplayName: string;
	Email: string;
	PhoneNumber: string;
	ProfileImageId?: string;
	PersonId?: string;
	Roles?: string[];
	EmployeeId?: string;
	Designation?: string;
	DesignationId?: string;
	Department?: string;
	DepartmentId?: string;
	ProfileImageUrl?: string;
}
