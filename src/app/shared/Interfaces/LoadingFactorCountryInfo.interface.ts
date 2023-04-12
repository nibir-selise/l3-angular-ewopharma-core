export interface ILoadingFactorCountryInfo {
    ItemId: string;
    Tags: string[];
    CountryName?: string;
    CountryCode?: string;
}



interface ILoadingFactorCountryInfoSelectFields {
    ItemId?: 1 | 0,
    Tags?: 1 | 0,
    CountryName?: 1 | 0;
    CountryCode?: 1 | 0;
}

export class LoadingFactorCountryInfoSelectFields {
    constructor(fields?: ILoadingFactorCountryInfoSelectFields) {
        if (fields) Object.assign(this, fields);
    }

    static all() {
        return new LoadingFactorCountryInfoSelectFields({
            ItemId: 1,
            Tags: 1,
            CountryName: 1,
            CountryCode: 1
        });
    }

}