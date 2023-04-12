export interface IPersonInformation {
    ItemId?: string;
    Tags?: string[];
    Email: string;
    FirstName?: string;
    LastName?: string;
    DisplayName?: string;
    Organization?: string;
    PhoneNumber?:string;
    Salutation?:string;
    Sex?:string;
    ProposedUserId?:string
}

interface IPersonInformationSelectFields {
    ItemId?: 1 | 0,
    Tags?: 1 | 0,
    Email: 1 | 0,
    FirstName?: 1 | 0,
    LastName?: 1 | 0,
    DisplayName?: 1 | 0,
    Organization?: 1 | 0,
    PhoneNumber?: 1 | 0;
    Salutation?:1 | 0,
    Sex?:1 | 0,
    ProposedUserId?:1 | 0
}

export class PersonInformationSelectFields {
    constructor(fields?: IPersonInformationSelectFields) {
        if (fields) Object.assign(this, fields);
    }

    static all() {
        return new PersonInformationSelectFields({
            ItemId: 1,
            Tags: 1,
            Email: 1,
            FirstName: 1,
            LastName: 1,
            DisplayName: 1,
            Organization: 1,
            PhoneNumber: 1,
            Salutation:1,
            Sex:1
        });
    }

}