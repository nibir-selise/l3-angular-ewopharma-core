export interface IConnection {
    ItemId?: string;
    Tags?: string[];
    ParentEntityID?: string;
    ParentEntityName?: string;
    ChildEntityID?: string;
    ChildEntityName?: string;
}


interface IConnectionSelectFields {
    ItemId?: 1 | 0,
    Tags?: 1 | 0,
    ParentEntityID?: 1 | 0,
    ParentEntityName: 1 | 0,
    ChildEntityID?: 1 | 0,
    ChildEntityName?: 1 | 0
}

export class ConnectionSelectFields {
    constructor(fields?: IConnectionSelectFields) {
        if (fields) Object.assign(this, fields);
    }

    static all() {
        return new ConnectionSelectFields({
            ItemId: 1,
            Tags: 1,
            ParentEntityID: 1,
            ParentEntityName: 1,
            ChildEntityID: 1,
            ChildEntityName: 1
        });
    }

}