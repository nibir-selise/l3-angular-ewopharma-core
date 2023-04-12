import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShellDomainProvider } from '@ecap3/core';
import { map } from 'rxjs/operators';
import { IPageFilter } from '../Interfaces/GraphQl.interface';

@Injectable({
	providedIn: 'root',
})
export class CommonDataService {
	header: any = new HttpHeaders({
		'Content-Type': 'application/json',
	});
	constructor(private http: HttpClient) {}

	getRegionList() {
		return this.http
			.get(ShellDomainProvider['api'].BusinessService + `v1/region/list?PageNumber=0&PageSize=100`, {
				headers: this.header,
				withCredentials: true,
				observe: 'response',
			})
			.pipe(map((response: any) => response.body.Data));
	}

	getRegionSpecificRoleList(region: string, roles: string) {
		return this.http
			.get(
				ShellDomainProvider['api'].BusinessService +
					`v1/role?PageNumber=${0}&PageSize=${1000}&Region=${region}&RoleHiererchy=${roles}`,
				{
					headers: this.header,
					withCredentials: true,
					observe: 'response',
				}
			)
			.pipe(map((response: any) => response.body.Data));
	}

	getUsers(page: IPageFilter, sort: any, filter?: any) {
		return this.http
			.get(
				ShellDomainProvider['api'].BusinessService +
					`v1/employee/users?PageNumber=${page.PageNumber ? page.PageNumber : 0}&
					PageSize=${page.PageSize ? page.PageSize : 100}
					&Keyword=${filter.Keyword ? filter.Keyword : ''}&
					SortKey=${sort && sort.SortKey ? sort.SortKey : ''}&
					SortType=${sort && sort.SortType ? sort.SortType : -1}&
					IsActive=${filter && filter.ActivityStatus ? filter.ActivityStatus : ''}&
					EmploymentLocation=${filter && filter.EmploymentLocation ? filter.EmploymentLocation : ''}&
					RoleKey=${filter && filter.RoleKey ? filter.RoleKey : ''}`,
				{
					headers: this.header,
					withCredentials: true,
					observe: 'response',
				}
			)
			.pipe(map((response: any) => response.body.Data));
	}

	getDepartments(region: string = '') {
		return this.http
			.get(ShellDomainProvider['api'].BusinessService + `v1/department/list?PageNumber=0&PageSize=300&Region=${region}`, {
				withCredentials: true,
				observe: 'response',
			})
			.pipe(map((response: any) => response.body.Data));
	}
}
