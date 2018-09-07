import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {SimpleListComponent} from './simple-list.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateListGuard implements CanDeactivate<SimpleListComponent> {
  canDeactivate() {
    return false;
  }
}
