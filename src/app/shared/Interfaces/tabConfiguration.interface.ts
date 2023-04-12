export interface ITabConfiguration {
    title: string;
    translate: string;
    path: string;
    serialNumber: number;
    isDisable: boolean;
    FeaturesCanActive?: {
        Id: string,
        Name: string
    };
}
