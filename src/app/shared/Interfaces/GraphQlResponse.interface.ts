export interface IMutationResponse {
    ErrorMessage?: string;
    Result?: string;
    Success?: string;
    ValidationResults?: boolean;
}

export class IGQLOption {
    public isGql = true;
    public alias = '';
    constructor(fields?: {
        isGql?: boolean,
        alias?: string
    }) {
        if (fields) { Object.assign(this, fields); }
    }
}

export class IQueryModel {
    public PageNumber = 1;
    public PageSize?: number = undefined;
    public Sort?: string = undefined;
    public Filter?: string = undefined;
    constructor(fields?: {
        PageNumber?: number,
        PageSize?: number,
        Sort?: string,
        Filter?: string
    }) {
        if (fields) { Object.assign(this, fields); }
    }
}

export class GqlFilterModel {
    property: string;
    operator = '=';
    value: string;
}
