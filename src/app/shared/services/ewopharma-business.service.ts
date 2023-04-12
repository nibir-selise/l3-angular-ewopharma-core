import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShellDomainProvider } from '@ecap3/core';
import { map } from 'rxjs/operators';

@Injectable()
export class EwopharmaBusinessService {
	constructor(private http: HttpClient) {}

	header: any = new HttpHeaders({
		'Content-Type': 'application/json',
	});

	getEmployee(userId) {
		return this.http
			.get(ShellDomainProvider['api'].BusinessService + `v1/employee/user/${userId}`, {
				headers: this.header,
				withCredentials: true,
				observe: 'response',
			})
			.pipe(map((response: any) => response.body.Data));
	}
}
