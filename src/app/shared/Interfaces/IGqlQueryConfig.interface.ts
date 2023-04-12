export interface IGqlQueryConfig {
    entityName: string;
    fields: any [];
    filters: string;
    pageNumber?: number;
    pageSize?: number;
    orderBy?: string;
}
