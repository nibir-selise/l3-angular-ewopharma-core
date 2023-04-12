export interface ICountryInformation {
    ItemId: string;
    Tags: string[];
    Name?: string;
    Code?: string;
    DialingCode?: string;
}



interface ICountryInformationSelectFields {
    ItemId?: 1 | 0,
    Tags?: 1 | 0,
    Name?: 1 | 0;
    Code?: 1 | 0;
    DialingCode?: 1 | 0;
}

export class CountryInformationSelectFields {
    constructor(fields?: ICountryInformationSelectFields) {
        if (fields) Object.assign(this, fields);
    }

    static all() {
        return new CountryInformationSelectFields({
            ItemId: 1,
            Tags: 1,
            Name: 1,
            Code: 1,
            DialingCode: 1
        });
    }

}