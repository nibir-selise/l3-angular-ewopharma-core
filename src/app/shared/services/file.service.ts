import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
	AggregateService,
	PlatformDataService,
	ShellDomainProvider,
	SqlQueryBuilderService,
	StorageDataService,
	UtilityService,
} from '@ecap3/core';
import { ARC_CONFIG } from '../constant/arc-config.constant';

@Injectable()
export class FileService {
	private ConversionPipelineId = 'ECAP-IRPL-v.1';
	conversionPipelineSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
	private azureHeader = {
		headers: new HttpHeaders({
			'x-ms-blob-type': 'BlockBlob'
		})
	};

	constructor(
		private sqlQueryBuilderService: SqlQueryBuilderService,
		private platformDataService: PlatformDataService,
		private aggregateService: AggregateService,
		private storageDataService: StorageDataService,
		private utilityService: UtilityService,
		private http: HttpClient
	) { }

	resourceUpload(imageFiles, fileId) {
		if (imageFiles && imageFiles.length) {
			const fileData = imageFiles[imageFiles.length - 1];
			return this.storageDataService.getPreSignedUrl(fileId, fileData.name, null, [ARC_CONFIG.Tags.IsAResource], null).pipe(
				switchMap((response: any) => {
					let modifiedUrl = '';
					if (response && response.body) {
						modifiedUrl = response.body.UploadUrl;
						if (ShellDomainProvider['api'].IsStaging) {
							modifiedUrl = response.body.UploadUrl.replace('http://', 'https://');
						}
					}
					fileData['modifiedUrl'] = modifiedUrl;

					if (modifiedUrl) {
						return this.storageDataService
							.uploadPresignedFile(modifiedUrl, fileData)
							.toPromise()
							.then(
								(presignedResponse) => {
									console.log(fileData);
									console.log('File successfully uploaded to cloud', presignedResponse);
									return presignedResponse;
								},
								(error) => {
									console.error('Error: File uploading to cloud', error);
									return error;
								}
							);
					}
					return of(response);
				})
			);
		}
	}

	getFilePresignedUrl(fileId, fileName): Observable<any> {
		return this.storageDataService.getPreSignedUrl(fileId, fileName, null, [ARC_CONFIG.Tags.IsAResource], null).pipe(
			map((response: any) => {
				let modifiedUrl = '';
				if (response && response.body) {
					modifiedUrl = response.body.UploadUrl;
					if (ShellDomainProvider['api'].IsStaging) {
						modifiedUrl = response.body.UploadUrl.replace('http://', 'https://');
					}
				}
				return modifiedUrl;
			})
		);
	}

	getFileById(fileId) {
		return this.storageDataService.getFileInfo(fileId).pipe(
			map(
				(response: any) => {
					// console.log('GetFileInfo', response.body);
					const data = response.body;
					if (data && data.Url) {
						return data;
					}
				},
				(error) => {
					console.log('Error GetFileInfo', error);
					return null;
				}
			)
		);
	}

	getFilesByIds(fileIds) {
		const fileList = [];
		return this.storageDataService.getFilesInfo(fileIds).pipe(
			map((response: Response) => {
				const file: any = response.body;
				for (let i = 0; i < file.length; i++) {
					fileList.push({
						fileObj: file[i],
						fileId: file[i].ItemId,
					});
				}
				return fileList;
			})
		);
	}

	getFileConnectionWithConversionAggregatePayloads(fileId, tagName, parentEntityName, parentEntityItemId, dimensions?) {
		const connectionId = this.utilityService.getNewGuid();
		const connection = {
			ItemId: connectionId,
			ParentEntityName: parentEntityName,
			ParentEntityID: parentEntityItemId,
			ChildEntityName: ARC_CONFIG.Entity.File,
			ChildEntityID: fileId,
			Tags: [tagName],
		};

		let callList = [];
		const connectionPayload = this.aggregateService.aggregateConnectModel(connection);
		callList.push(connectionPayload);

		return callList;
	}

	getResourceImage(entityName, entityItemId, tag): Observable<any> {
		return this.platformDataService.getResource(entityName, entityItemId, tag).pipe(
			map((response: any) => {
				const data = response.body;
				if (data && data.Result !== '') {
					return data.Result;
				} else {
					return null;
				}
			})
		);
	}

	getImageConnectionWithConversionAggregatePayloads(
		fileId,
		tagName,
		parentEntityName,
		parentEntityItemId,
		taskId?,
		dimensions?
	) {
		const connectionId = this.utilityService.getNewGuid();
		const connection = {
			ItemId: connectionId,
			ParentEntityName: parentEntityName,
			ParentEntityID: parentEntityItemId,
			ChildEntityName: ARC_CONFIG.Entity.File,
			ChildEntityID: fileId,
			Tags: [tagName],
		};

		const callList = [];
		const connectionPayload = this.aggregateService.aggregateConnectModel(connection);
		callList.push(connectionPayload);

		// Create image conversions connections
		taskId = taskId || this.utilityService.getNewGuid();
		dimensions = dimensions || ARC_CONFIG.ThumbnailDimensions;

		const parentEntities = [
			{
				Id: parentEntityItemId,
				Name: parentEntityName,
				TagPrefix: tagName,
			},
		];
		const executeFileConversionPipelinePayload = this.fileConversionPipelineAggregatePayload(
			fileId,
			taskId,
			parentEntities,
			dimensions
		);
		callList.push(executeFileConversionPipelinePayload);
		return callList;
	}

	fileConversionPipelineAggregatePayload(sourceFileId, taskId, parentEntities, dimensions?) {
		const requestProperties = {
			SourceFileId: sourceFileId,
			Dimensions: ARC_CONFIG.ThumbnailDimensions,
			ParentEntities: [],
		};

		if (dimensions) {
			requestProperties.Dimensions = dimensions;
		}

		if (parentEntities) {
			requestProperties.ParentEntities = parentEntities;
		}

		const commandPayload = {
			ConversionPipelineId: 'ECAP-IRPL-v.1',
			TaskId: taskId,
			RequestProperties: {
				ImageResizeSetting: JSON.stringify(requestProperties),
			},
		};

		return this.aggregateService.aggregateExecuteFileConversionPipelineUrlModel(commandPayload);
	}

	createFileConnectionWithConversion(fileId, tagName, parentEntityName, parentEntityItemId, dimensions?) {
		const connectionId = this.utilityService.getNewGuid();
		const connection = {
			ItemId: connectionId,
			ParentEntityName: parentEntityName,
			ParentEntityID: parentEntityItemId,
			ChildEntityName: ARC_CONFIG.Entity.File,
			ChildEntityID: fileId,
			Tags: [tagName],
		};

		return this.platformDataService.connect(connection).pipe(
			map((response: any) => {
				const data = response.body;
				if (data.StatusCode === 0) {
					const taskId = this.utilityService.getNewGuid();
					const parentEntities = [
						{
							Id: parentEntityItemId,
							Name: parentEntityName,
							TagPrefix: tagName,
						},
					];
					return this.executePipeline(fileId, taskId, parentEntities, dimensions);
				} else {
					return response;
				}
			})
		);
	}

	executePipeline(sourceFileId, taskId, parentEntities, dimensions?) {
		let requestProperties = {
			SourceFileId: sourceFileId,
			Dimensions: [
				{
					Width: 32,
					Height: 32,
				},
				{
					Width: 128,
					Height: 128,
				},
				{
					Width: 64,
					Height: 64,
				},
				{
					Width: 2100,
					Height: 2100,
				},
			],
			ParentEntities: [],
		};

		if (dimensions) {
			requestProperties.Dimensions = dimensions;
		}

		if (parentEntities) {
			requestProperties.ParentEntities = parentEntities;
		}

		const commandPayload = {
			ConversionPipelineId: 'ECAP-IRPL-v.1',
			TaskId: taskId,
			RequestProperties: {
				ImageResizeSetting: JSON.stringify(requestProperties),
			},
		};

		return this.storageDataService.executePipeline(commandPayload).pipe(
			map((response) => {
				console.log('File successfully ExecuteFileConversionPipeline', response);
				return response;
			})
		);
	}

	uploadPresignedFileWithouthExpire(url, file): Observable<any> {
		return this.http.put(url, file, this.azureHeader).pipe(map((response) => {
			return response;
		}));
	}

	uploadFileWithouthExpire(file: any) {
		const subject = new Subject<any>();
		this.storageDataService.getPreSignedUrl(
			this.utilityService.getNewGuid(),
			file['name'],
			'DigitalDisplayUpload',
			['File'],
			"Public"
		).subscribe(resp => {
			this.uploadPresignedFileWithouthExpire(resp.body.UploadUrl, file)
				.subscribe((res) => {
					subject.next({
						Name: file['name'],
						FileId: resp['body']['FileId'] as string,
						Body: resp['body']
					});
					subject.complete();
				}, error => {
					subject.error(error);
					subject.complete();
				});
		}, error => {
			subject.error(error);
			subject.complete();
		});
		return subject.asObservable();
	}
}
