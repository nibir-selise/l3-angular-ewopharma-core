import { Injectable } from '@angular/core';
import { BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  menuIconVisibilityObserver$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  setMenuItemVisibility(status: boolean) {
    // console.log(status)
    this.menuIconVisibilityObserver$.next(status);
  }
}
