import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { EcapGql } from '@ecap3/app-platform-graphql';
import {
    AggregateService,
    FeatureProvider,
    GqlQueryBuilderService,
    ShellDomainProvider,
    StorageDataService,
    UtilityService
} from '@ecap3/core';
import * as FileSaver from 'file-saver';
import { combineLatest, forkJoin, Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
let EXCEL_EXTENSION = '.xlsx';

@Injectable({
    providedIn: 'root',
})
export class EwopharmaGqlService {
    constructor(
        private GQL: EcapGql,
        private gqlQueryBuilderService: GqlQueryBuilderService,
        private featureProvider: FeatureProvider,
        private storageService: StorageDataService,
        private aggregateService: AggregateService,
        private utilityService: UtilityService,
    ) {
    }

    queryAllData(entityName: string, fields: any, filters: any, orderBy?: string): Observable<any> {
        return this.queryEntityData(entityName, fields, filters, orderBy, null, 100).pipe(
            switchMap((res: any) => {
                const pageSize = 100;
                if (res && res.TotalCount > pageSize) {
                    const numberOfPages = Math.ceil(res.TotalCount / pageSize);
                    const pageArray = this.getPageNumbersArray(numberOfPages);
                    return this.queryMultiplePageEntityData(entityName, fields, filters, orderBy, pageArray);
                } else {
                    return of(res);
                }
            })
        );
    }

    queryMultiplePageEntityData( entityName: string, fields: any, filters: any, orderBy?: string, pages?: number[]
    ) {
        return this.GQL.watchQuery<any>({
            query: this.gqlQueryBuilderService.prepareQueryForMultiplePage(entityName, fields, filters, orderBy, pages)
        }).valueChanges.pipe(
            map((response: any) => {
                if (response.data) {
                    let resultData = [];
                    pages.forEach(page => {
                        if (
                            response.data[`${entityName}s_${page}`] &&
                            response.data[`${entityName}s_${page}`].Data
                        ) {
                            resultData = [
                                ...resultData,
                                ...response.data[`${entityName}s_${page}`].Data
                            ];
                        }
                    });
                    return { Data: resultData, TotalCount: resultData.length };
                }
                return { Data: [], TotalCount: 0 };
            }),
            catchError(e => of({ Data: [], TotalCount: 0 }))
        );
    }

    getPageNumbersArray(numberOfPages) {
        const array = [];
        for (let i = 1; i <= numberOfPages; i++) {
            array.push(i);
        }
        return array;
    }

    queryEntityData(entityName: string, fields: any, filters: any, orderBy?: string, pageNumber?: number, pageSize?: number) {
        return this.GQL.watchQuery<any>({
            query: this.gqlQueryBuilderService.prepareQuery(entityName, fields, filters, orderBy, pageNumber, pageSize),
        }).valueChanges.pipe(
            map((response: any) => {
                if (response.data && response.data[`${entityName}s`] && response.data[`${entityName}s`].Data.length) {
                    return response.data[`${entityName}s`];
                }
                return { Data: [], TotalCount: 0 };
            }),
            catchError((e) => of({ Data: [], TotalCount: 0 }))
        );
    }

    getEntityData(entityName, propertyNames, filter, pageNumber?, pageSize?, orderBy?) {
        return this.GQL.watchQuery<any>({
            query: this.gqlQueryBuilderService.prepareQuery(entityName,
                propertyNames,
                filter,
                orderBy ? ((orderBy.Key && orderBy.Direction) ? `${orderBy.Key}: ${orderBy.Direction}` : orderBy) : 'CreateDate: -1',
                pageNumber ? pageNumber : 0,
                pageSize ? pageSize : 100
            )
        }).valueChanges.pipe(map((res: any) => {
                if (res.data && res.data[`${entityName}s`] && res.data[`${entityName}s`].Data) {
                    return res.data[`${entityName}s`];
                }
                return {Data: [], TotalCount: 0, Success: false};
            }),
            catchError((e) => of({Data: [], TotalCount: 0, Success: false}))
        );
    }

    insertEntityData(entityName, data) {
        if (!data.Tags) {
            data.Tags = [entityName];
        }
        if (!data.Language) {
            data.Language = 'en-Us';
        }
        return this.GQL.mutate({
            mutation: this.gqlQueryBuilderService.prepareInsertModel(entityName, data),
        }).pipe(
            map((res: any) => {
                if (res && res.data && res.data[`${entityName}`].Success) {
                    return {res, success: true};
                }
                return {res, success: false};
            }),
            catchError((e) => of({e, success: false}))
        );
    }

    updateEntityData(entityName, updatedvalue, entityId) {
        if (!updatedvalue.Tags) {
            updatedvalue.Tags = [entityName];
        }
        if (!updatedvalue.Language) {
            updatedvalue.Language = 'en-Us';
        }
        return this.GQL.mutate({
            mutation: this.gqlQueryBuilderService.prepareUpdateModel(entityName, updatedvalue, entityId),
        }).pipe(
            map((res: any) => {
                if (res && res.data && res.data[`${entityName}`].Success) {
                    return {res, success: true};
                }
                return {res, success: false};
            }),
            catchError((e) => of({e, success: false}))
        );
    }

    updateMultipleEntity(models: any[]) {
        const queries = [];
        if (models.length > 0) {
            models.forEach((model, i) => {
                const entityId = model.ItemId;
                const entity = model.Entity;
                delete model.Entity;
                delete model.ItemId;
                const a = `model_${i}: ${this.gqlQueryBuilderService.buildUpdateQuery({
                    entityName: entity,
                    model: model,
                    entityId: entityId,
                })}`;
                queries.push(a);
            });
        }
        return this.GQL.mutate({
            mutation: this.gqlQueryBuilderService.aggregateMultipleMutation(queries),
        });
    }

    deleteEntityData(entityName: string, ItemId: string) {
        return this.GQL.mutate({
            mutation: this.gqlQueryBuilderService.prepareDeleteModel(
                entityName,
                ItemId
            )
        }).pipe(map((res: any) => {
                if (res && res.data && res.data[entityName].Success) {
                    return {success: true};
                } else {
                    return {success: false};
                }
            }),
            catchError(e => of({e}))
        );
    }

    ////
    deleteMultipleEntity(models: any[]) {
        const queries = [];
        models.forEach((model, i) => {
            const a = `model_${i}: ${this.gqlQueryBuilderService.buildQueryForDelete({
                entityName: model.Entity, entityId: model.ItemId
            })}`;
            queries.push(a);
        });
        return this.GQL.mutate({
            mutation: this.gqlQueryBuilderService.aggregateMultipleMutation(queries),
        });
    }

    insertMultipleEntity(models: any[]) {
        const queries = [];
        models.forEach((model, i) => {
            let entity = model.Entity;
            delete model.Entity;
            const a = `model_${i}: ${this.gqlQueryBuilderService.buildInsertQuery({
                entityName: entity,
                model: model,
            })}`;
            queries.push(a);
        });
        return this.GQL.mutate({
            mutation: this.gqlQueryBuilderService.aggregateMultipleMutation(queries),
        });
    }

    queryMultipleEntity(configs: any[]) {
        let query = [];
        for (let idx = 0; idx < configs.length; idx++) {
            let config = configs[idx];
            query.push(`${config.entityName}_${idx}:` + this.gqlQueryBuilderService.buildQueryBasic(config));
        }
        return this.GQL.watchQuery<any>({
            query: this.gqlQueryBuilderService.aggregateMultipleQuery(query),
        }).valueChanges;
    }

    multipleEntityMutation(models: any[]) {
        const queries = [];
        models.forEach((model, i) => {
            let queryType = model.QueryType;
            delete model.QueryType;
            if (queryType == QueryType.INSERT) {
                let entity = model.Entity;
                delete model.Entity;
                const a = `model_${i}: ${this.gqlQueryBuilderService.buildInsertQuery({
                    entityName: entity,
                    model: model,
                })}`;
                queries.push(a);
            } else if (queryType == QueryType.UPDATE) {
                let entityId = model.ItemId;
                let entity = model.Entity;
                delete model.Entity;
                delete model.ItemId;
                const a = `model_${i}: ${this.gqlQueryBuilderService.buildUpdateQuery({
                    entityName: entity,
                    model: model,
                    entityId: entityId,
                })}`;
                queries.push(a);
            } else if (queryType == QueryType.DELETE) {
                const a = `model_${i}: ${this.gqlQueryBuilderService.buildQueryForDelete({
                    entityName: model.Entity, entityId: model.ItemId
                })}`;
                queries.push(a);
            } else {
                console.log('Wrong Query Type Found', queryType);
            }
        });
        return this.GQL.mutate({
            mutation: this.gqlQueryBuilderService.aggregateMultipleMutation(queries),
        });
    }

    getAuthorizedTabs(tabs): any {
        const subject = new Subject();
        this.featureProvider.getFeatures().then((features: any[]) => {
            tabs = tabs.filter(tab => {
                if (tab.FeatureCanActive) {
                    return features.find(feature => {
                        return (feature.Name === tab.FeatureCanActive.AppName) &&
                            feature.Features.indexOf(tab.FeatureCanActive.FeatureId) >= 0;
                    });
                } else {
                    return true;
                }
            });
            subject.next(tabs);
            subject.complete();
        });
        return subject.asObservable();
    }

    getAuthorizedTabWithFeatureList(tabs): any {
        const subject = new Subject();
        this.featureProvider.getFeatures().then((features: any[]) => {
            tabs = tabs.filter(tab => {
                if (tab.FeaturesCanActive) {
                    let found = false;
                    tab.FeaturesCanActive.forEach(elementFeature => {
                        found = found || features.some(feature => {
                            return (feature.Name === elementFeature.AppName) &&
                                feature.Features.indexOf(elementFeature.FeatureId) >= 0;
                        });
                    });
                    return found;
                } else {
                    return true;
                }
            });
            subject.next(tabs);
            subject.complete();
        });
        return subject.asObservable();
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

    stringArrayToGQLString(inputArray: string[]): string {
        let stringifiedArray = '';
        if (inputArray && inputArray.length) {
            stringifiedArray += '[';
            inputArray.forEach(function (item, index) {
                stringifiedArray += '"' + item + '"';
                if (!(index === (inputArray.length - 1))) {
                    stringifiedArray += ',';
                }
            });
            stringifiedArray += ']';
        }
        return stringifiedArray;
    }

    routeParams(route: ActivatedRoute): Observable<Params> {
        return combineLatest(route.pathFromRoot.map((t) => t.params)).pipe(
            map((paramObjects) => Object.assign({}, ...paramObjects))
        );
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            if (control instanceof FormArray) {
                for (let c of control.controls) {
                    if (c instanceof FormGroup) {
                        this.validateAllFormFields(c);
                    } else if (c instanceof FormControl) {
                        c.markAsDirty({onlySelf: true});
                    }
                }
            } else if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    uploadDocument(selectedFiles, tag: string, connectionObj?: any, accessModifier?: any) {
        const resultAggregate = [];
        const aggreagetPayload = [];
        for (let idx = 0; idx < selectedFiles.length; idx++) {
            const file = selectedFiles[idx];
            const
                ItemId = this.utilityService.getNewGuid(),
                MetaData = file,
                Name = file.name,
                ParentDirectoryId = null,
                Tags = [tag];
            aggreagetPayload.push(
                this.aggregateService.aggregatePresignedModel(
                    JSON.stringify(this.storageService.generatePSU(ItemId, Name, ParentDirectoryId, Tags, accessModifier))
                )
            );
        }
        return this.aggregateService
            .aggregateExecute(aggreagetPayload)
            .pipe(
                switchMap((response: any) => {
                    if (response.FailedCallIndex > -1) {
                        return of(response);
                    }

                    const firstResponseList = response.HttpAggregateCallResults;
                    firstResponseList.forEach((responseItem) => {
                        const firstResponse = JSON.parse(responseItem.Response);
                        if (ShellDomainProvider['api'].IsStaging) {
                            firstResponse.UploadUrl = firstResponse.UploadUrl.replace('http:', 'https:');
                        }

                        resultAggregate.push(firstResponse);
                    });

                    const callArray = [];

                    resultAggregate.forEach((item, key) => {
                        callArray.push(this.storageService.uploadPresignedFile(item.UploadUrl, selectedFiles[key]));
                    });

                    return forkJoin(callArray);
                })
            )
            .pipe(
                map((response: any) => {
                    const fileResponse = {
                        resultAggregate: resultAggregate,
                        FileIds: resultAggregate.length > 0 ? resultAggregate.map(item => item.FileId) : [],
                        fileUploaded: resultAggregate.length > 0,
                    };

                    return fileResponse;
                })
            );
    }

    getAttachments(data) {
        return this.storageService.getFilesInfo(data).pipe(
            map((response: any) => {
                if (ShellDomainProvider['api'].IsStaging && response && response.body && response.body.Url) {
                    response.body.Url = response.body.Url.replace('http:', 'https:');
                }
                return response;
            })
        );
    }

    removeFile(FileId) {
        return this.storageService.deleteFile(FileId);
    }
}

export const QueryType = {
    INSERT: 'insert',
    UPDATE: 'update',
    DELETE: 'delete'
};
