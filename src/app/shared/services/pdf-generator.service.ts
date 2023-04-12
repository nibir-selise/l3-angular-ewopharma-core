import { JobPdfTemplate } from '../constant/ewopharma-config.constant';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StorageDataService, UtilityService, ShellDomainProvider } from '@ecap3/core';
import { SignalrNotificationService } from '@ecap3/signalr-notification';
import { CommonService } from './common.service';
import { CustomToastService } from './custom-toast.service';
@Injectable({
	providedIn: 'root',
})
export class PdfGeneratorService {
	private isPdfDownloaded: boolean;
	private fileId: string;

	fileDownloadResponse: EventEmitter<boolean> = new EventEmitter<boolean>(false);

	constructor(
		private http: HttpClient,
		private utilityService: UtilityService,
		private signalNotificationService: SignalrNotificationService,
		private storageService: StorageDataService,
		private commonService: CommonService,
		private customToastService: CustomToastService
	) {}

	pdfGenerator(templateId, payload, metaDataName): Observable<any> {
		this.isPdfDownloaded = false;
		const outputFileId = this.utilityService.getNewGuid();
		const pdfGenerationPayload = {
			MessageCoRelationId: this.utilityService.getNewGuid(),
			EventReferenceData: null,
			CreateFromHtmlCommands: [
				{
					TemplateFileId: templateId,
					HtmlFileId: this.utilityService.getNewGuid(),
					FooterHtmlFileId: null,
					HeaderHtmlFileId: null,
					DirectoryId: null,
					OutputPdfFileId: outputFileId,
					OutputPdfFileName: `${payload.Title}.pdf`,
					HeaderHeight: 100,
					FooterHeight: 0,
					FirstPageHeaderFileId: null,
					FirstPageFooterFileId: null,
					IsPageNumberEnabled: false,
					IsTotalPageCountEnabled: true,
					UseFormatting: false,
					Engine: 3,
					Profile: `${JobPdfTemplate.PdfUtilityProfileId}`,
					HasHeader: true,
					HasFooter: true,
					MetaDataList: [
						{
							Name: metaDataName,
							Values: [payload],
						},
					],
				},
			],
		};

		this.http
			.post(
				ShellDomainProvider['api'].PdfGeneratorService + 'Commands/CreatePdfsFromHtmlUsingTemplateEngine',
				pdfGenerationPayload,
				{
					headers: new HttpHeaders({
						'Content-Type': 'application/json',
					}),
					withCredentials: true,
					observe: 'response',
				}
			)
			.subscribe();

		return new Observable((subscriber) => {
			this.signalNotificationService.subscribeSingle(
				'PdfsFromHtmlCreatedEvent',
				pdfGenerationPayload.MessageCoRelationId,
				'PdfsFromHtmlCreatedEvent',
				(message) => {
					this.fileId = JSON.parse(message.value).Response.OutputFileId;
					this.commonService.downloadFileById(this.fileId).subscribe((res) => {
						if (res !== null) {
							this.fileDownloadResponse.emit(true);
							// this.customToastService.showWarningToast(res);
						} else {
							this.fileDownloadResponse.emit(false);
							this.customToastService.showSuccessToast('File Downloaded Successfully');
							this.isPdfDownloaded = true;
						}
					});

					// if (!this.isPdfDownloaded) {
					// 	this.getGeneratedPdfUrl(outputFileId)
					// 		.pipe(take(1))
					// 		.subscribe((pdfGenerationRes) => {
					// 			const link = document.createElement('a');
					// 			link.setAttribute('target', '_blank');
					// 			document.body.appendChild(link);
					// 			link.href = pdfGenerationRes;
					// 			link.click();
					// 			link.remove();
					// 			subscriber.next(true);
					// 		});
					// }
					// this.isPdfDownloaded = true;
				}
			);
		});
	}

	getGeneratedPdfUrl(fileId: string) {
		return this.storageService.getFileInfo(fileId).pipe(
			map((response: any) => {
				return response.body.Url;
			})
		);
	}
}
