import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SidePanelStatusService {
	sidePanelStatus = new BehaviorSubject('open');
	constructor() {}
}
