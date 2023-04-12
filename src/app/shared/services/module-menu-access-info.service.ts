import { Injectable } from '@angular/core';
import { ShellDomainProvider } from '@ecap3/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class ModuleMenuAccessInfoService {
	constructor(private http: HttpClient) { }

	getApps() {
		return this.http.get<any[]>(ShellDomainProvider['api'].Apps, { withCredentials: true });
	}
}
