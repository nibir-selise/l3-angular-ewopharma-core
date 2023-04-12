export interface IPagination<T> {
    PageNumber: number;
    PageSize: number;
    CurrentPageNumber?: number;
    Sort?: {
        Direction: number,
        Key: string
    };
    SortBy?: string;
    SortDir?: string;
    TotalElements?: number;
    TotalPages?: number;
    filters?: string;
    MaxPage?: number;
    SearchObject?: T;
}
