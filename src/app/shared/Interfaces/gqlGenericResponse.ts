export interface Entity<T> {
    Data: T[];
    ErrorMessage?: string;
    Success: boolean;
    TotalCount: number;
    ValidationResult: any;
}

export interface IMutationResponse {
    ErrorMessage?: string;
    Result?: any[];
    Success?: boolean;
    ValidationResults?: IValidationResults;
    ValidationResult?: IValidationResults;
}

export interface IValidationResults {
    Errors: any[];
    IsValid: boolean;
}
