export interface RowLevelConfig{
    Entity: string;
    ItemId: string;
    Roles: {
        IdsAllowedToWrite?: string[];
        IdsAllowedToUpdate?: string[];
        IdsAllowedToRead?: string[];
        IdsAllowedToDelete?: string[];
        RolesAllowedToRead?: string[];
        RolesAllowedToWrite?: string[];
        RolesAllowedToUpdate?: string[];
        RolesAllowedToDelete?: string[];
    }
}