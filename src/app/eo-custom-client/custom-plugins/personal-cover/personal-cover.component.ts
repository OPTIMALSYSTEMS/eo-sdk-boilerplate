import {Component, OnInit, Inject} from '@angular/core';
import {ObjectStateDetailsComponent} from '@eo-sdk/client';
import {BackendService, SystemService, DmsService, DmsObject, Utils} from '@eo-sdk/core';
import {of as observableOf} from 'rxjs';
import {catchError, flatMap} from 'rxjs/operators';

@Component({
  selector: 'eo-personal-cover',
  templateUrl: './personal-cover.component.html',
  styleUrls: ['./personal-cover.component.scss']
})
export class PersonalCoverComponent implements OnInit {

  static id = 'eo.custom.plugin.personal-cover';
  static matchType = new RegExp('object-state-details-tab.*');

  context: DmsObject;
  picture: DmsObject;
  holiday: any;

  constructor(@Inject(ObjectStateDetailsComponent) private parent: ObjectStateDetailsComponent,
              private backend: BackendService, private system: SystemService, private dms: DmsService) {
  }

  /**
   * normalize Result data - map your data based on scheme properties
   * @param data
   * @returns
   */
  private normalize(data: any = {}): any {
    return {
      pictureType: 'passfoto',
      holidayType: 'urlaub',
      holidayFrom: 'urlaub.holidayfrom',
      holidayTo: 'urlaub.holidayuntil',
      ...data
    };
  }

  selectHoliday() {
    this.parent.selectFrontPageDoc(this.holiday);
  }

  loadByQuery(context: DmsObject, filter) {
    let postData = {
      contextid: context.id,
      contexttype: context.typeName,
      mode: 'result',
      filter,
      timezone: Utils.getTimezoneOffset()
    };
    return this.backend
      .post('/contextview', postData, this.backend.getContextBase())
      .pipe(catchError(error => observableOf(error)));
  }

  ngOnInit() {
    const data = this.normalize({});
    this.context = this.parent.context;

    // load ID picture result & related DmsObject which contains the picture
    this.loadByQuery(this.parent.context, [`Types[${data.pictureType}]`]).pipe(
      flatMap(photos => photos.hitcount ? this.dms.getDmsObjectByParams(photos.dms[0]) : observableOf(null))
    ).subscribe(photo => this.picture = photo);

    // load Leave Application results & check if employee is on holidays
    this.loadByQuery(this.parent.context, [`Types[${data.holidayType}]`])
      .subscribe((holidays: any) => {
        const now = new Date().toISOString().slice(0,10);
        this.holiday = holidays.dms.find(dms => dms[data.holidayFrom] <= now && now <= dms[data.holidayTo]);
        if (this.holiday) {
          this.holiday.objectType = this.system.getObjectType(this.holiday.type);
        }
      });
  }

}
