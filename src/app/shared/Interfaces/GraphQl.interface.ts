export interface IMutationResponse {
	ErrorMessage?: string;
	Result?: any[];
	Success?: boolean;
	ValidationResults?: any;
}

export class IGQLOption {
	public isGql = true;
	public alias = '';

	constructor(fields?: { isGql?: boolean; alias?: string }) {
		if (fields) {
			Object.assign(this, fields);
		}
	}
}

export class IQueryModel {
	public PageNumber = 1;
	public PageSize?: number = undefined;
	public Sort?: string = undefined;
	public Filter?: string = undefined;

	constructor(fields?: { PageNumber?: number; PageSize?: number; Sort?: string; Filter?: string }) {
		if (fields) {
			Object.assign(this, fields);
		}
	}
}

export interface IPageFilter {
	PageNumber: number;
	PageSize: number;
}

export interface ISortConfig {
	Key: string;
	Direction: string;
}

export interface ISearchFilter {
	Key: string;
	FieldToSearchOn: string[];
}

export interface ICategoryFilter {
	Field: string;
	Value: any;
}

export interface IQueryResponse<T> {
	Data: T[];
	ErrorMessage: string;
	ValidationResult: string;
	Success: boolean;
	TotalCount: number;
}
